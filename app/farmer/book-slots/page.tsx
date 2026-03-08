'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { 
  Calendar, Clock, Users, CheckCircle, Sprout, 
  Weight, X, QrCode, ChevronRight, AlertCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Types ---
interface TimeSlot {
  id: string;
  time: string;
  label: string;
  totalSlots: number;
  bookedSlots: number;
}

interface DaySlot {
  date: string;
  dayName: string;
  fullDate: string;
  slots: TimeSlot[];
}

interface BookingRecord {
  id: string;
  date: string;
  timeSlot: string;
  cropType: string;
  quantity: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
}

// --- Mock Data Generator ---
const generateMockSlots = (): DaySlot[] => {
  const slots: DaySlot[] = [];
  const today = new Date();
  
  const timeSlots: Omit<TimeSlot, 'id'>[] = [
    { time: '09:00-12:00', label: 'Morning (9 AM - 12 PM)', totalSlots: 20, bookedSlots: 0 },
    { time: '13:00-16:00', label: 'Afternoon (1 PM - 4 PM)', totalSlots: 20, bookedSlots: 0 },
    { time: '16:00-19:00', label: 'Evening (4 PM - 7 PM)', totalSlots: 15, bookedSlots: 0 },
  ];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const fullDate = date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
    const dateStr = date.toISOString().split('T')[0];
    
    const daySlots: TimeSlot[] = timeSlots.map((slot, idx) => ({
      ...slot,
      id: `${dateStr}-${idx}`,
      bookedSlots: Math.floor(Math.random() * (slot.totalSlots - 5)), 
    }));
    
    slots.push({ date: dateStr, dayName, fullDate, slots: daySlots });
  }
  return slots;
};

const CROP_OPTIONS = ['Wheat', 'Rice', 'Paddy', 'Maize', 'Cotton', 'Soyabean', 'Bajra', 'Jowar'];

export default function BookSlotsPage() {
  const router = useRouter();
  const { role, loading: userLoading } = useUser();
  
  // States
  const initialDaySlots = useMemo(() => generateMockSlots(), []);
  const [daySlots, setDaySlots] = useState<DaySlot[]>(initialDaySlots);
  const [myBookings, setMyBookings] = useState<BookingRecord[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ day: DaySlot; slot: TimeSlot } | null>(null);
  
  // UI States
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  
  // Form States
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [lastBookingId, setLastBookingId] = useState('');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  // Role protection
  useEffect(() => {
    if (!userLoading && role !== 'farmer') {
      router.push('/login');
    }
  }, [role, userLoading, router]);

  const handleSlotSelect = (day: DaySlot, slot: TimeSlot) => {
    if (slot.bookedSlots >= slot.totalSlots) return;
    setSelectedSlot({ day, slot });
    setShowModal(true);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !cropType || !quantity) return;

    setBookingLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API

    const newBookingId = 'KR-' + Math.random().toString(36).substr(2, 7).toUpperCase();
    
    const newRecord: BookingRecord = {
      id: newBookingId,
      date: selectedSlot.day.fullDate,
      timeSlot: selectedSlot.slot.label,
      cropType,
      quantity,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    // Update Local Lists
    setMyBookings(prev => [newRecord, ...prev]);
    setDaySlots(prev => prev.map(day => {
      if (day.date === selectedSlot.day.date) {
        return {
          ...day,
          slots: day.slots.map(s => s.id === selectedSlot.slot.id ? { ...s, bookedSlots: s.bookedSlots + 1 } : s)
        };
      }
      return day;
    }));

    setLastBookingId(newBookingId);
    setBookingLoading(false);
    setShowModal(false);
    setShowSuccess(true);
    
    // Reset
    setCropType('');
    setQuantity('');
  };

  const handleDownloadTicket = async (bookingId: string) => {
    const ticketElement = document.getElementById(`ticket-${bookingId}`);
    if (!ticketElement) return;

    try {
      setIsDownloading(bookingId);
      const canvas = await html2canvas(ticketElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Krishi_Verify_Ticket_${bookingId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(null);
    }
  };

  if (userLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-100 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-emerald-900 tracking-tight">Mandi Scheduler</h1>
          <p className="text-emerald-700 mt-2 font-medium">Reserve your slot to guarantee procurement at MSP rates.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full border border-emerald-200 flex items-center gap-2 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Live Availability</span>
        </div>
      </div>

      {/* --- SLOT SELECTION GRID --- */}
      <section>
        <h2 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5" /> 1. Select a Date & Time
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {daySlots.map((day) => (
            <Card key={day.date} className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="bg-emerald-600 p-3 text-white text-center">
                <p className="text-lg font-bold">{day.dayName}</p>
                <p className="text-xs opacity-90">{day.fullDate}</p>
              </div>
              <CardContent className="p-4 space-y-3">
                {day.slots.map((slot) => {
                  const available = slot.totalSlots - slot.bookedSlots;
                  const isFull = available <= 0;
                  return (
                    <button
                      key={slot.id}
                      disabled={isFull}
                      onClick={() => handleSlotSelect(day, slot)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex flex-col ${
                        isFull 
                        ? 'bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed' 
                        : 'bg-white border-emerald-50 hover:border-emerald-500 hover:bg-emerald-50 group'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-emerald-800">{slot.label}</span>
                        {isFull ? <AlertCircle className="h-3 w-3 text-red-400" /> : <ChevronRight className="h-3 w-3 text-emerald-300 group-hover:translate-x-1 transition-transform" />}
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${isFull ? 'bg-red-400' : 'bg-emerald-500'}`} 
                              style={{ width: `${(slot.bookedSlots / slot.totalSlots) * 100}%` }}
                            ></div>
                         </div>
                         <span className="text-[10px] font-medium text-slate-500">{available} left</span>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- ACTIVE BOOKINGS SECTION --- */}
      <section className="pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" /> 2. Your Scheduled Appointments
          </h2>
        </div>

        {myBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-emerald-100">
            <Clock className="mx-auto h-12 w-12 text-emerald-100 mb-4" />
            <h3 className="text-lg font-semibold text-emerald-800">No active bookings</h3>
            <p className="text-sage-500 max-w-xs mx-auto">Once you select a slot above, your ticket will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myBookings.map((b) => (
              <div id={`ticket-${b.id}`} key={b.id} className="bg-white rounded-2xl border border-emerald-100 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-all border-l-4 border-l-emerald-600">
                <div className="flex-1 flex items-center gap-6">
                  <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                    <QrCode className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-900">{b.date}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-sage-600">
                      <span className="flex items-center gap-1"><Clock size={14}/> {b.timeSlot}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider">{b.status}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex flex-1 justify-around border-x border-emerald-50 px-6">
                   <div className="text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Crop Type</p>
                      <p className="font-semibold text-emerald-800">{b.cropType}</p>
                   </div>
                   <div className="text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Quantity</p>
                      <p className="font-semibold text-emerald-800">{b.quantity} kg</p>
                   </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2" data-html2canvas-ignore="true">
                  <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Token: {b.id}</p>
                  <Button 
                    variant="outline" 
                    className="text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-bold"
                    onClick={() => handleDownloadTicket(b.id)}
                    disabled={isDownloading === b.id}
                  >
                    {isDownloading === b.id ? 'Downloading...' : 'Download Ticket'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- BOOKING MODAL --- */}
      {showModal && selectedSlot && (
        <div className="fixed inset-0 bg-emerald-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-2xl border-emerald-100 scale-in-center">
            <CardHeader className="border-b border-emerald-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-emerald-800">Finalize Booking</CardTitle>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"><X size={20}/></button>
              </div>
            </CardHeader>
            <form onSubmit={handleBooking} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">Date</p>
                    <p className="text-sm font-bold text-emerald-900">{selectedSlot.day.dayName}, {selectedSlot.day.date.split('-')[2]}</p>
                 </div>
                 <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">Time</p>
                    <p className="text-sm font-bold text-emerald-900">{selectedSlot.slot.time}</p>
                 </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1"><Sprout size={12}/> Select Crop</label>
                  <select 
                    required value={cropType} 
                    onChange={(e) => setCropType(e.target.value)}
                    className="w-full h-11 bg-white border border-emerald-200 rounded-xl px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  >
                    <option value="">Choose Crop...</option>
                    {CROP_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1"><Weight size={12}/> Estimated Weight (KG)</label>
                  <Input 
                    type="number" required placeholder="Ex: 1200" 
                    value={quantity} onChange={(e) => setQuantity(e.target.value)}
                    className="h-11 border-emerald-200 rounded-xl"
                  />
                </div>
              </div>

              <Button type="submit" disabled={bookingLoading} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200">
                {bookingLoading ? 'Processing Request...' : 'Confirm My Appointment'}
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* --- SUCCESS MODAL --- */}
      {showSuccess && (
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm text-center p-8 border-none shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 scale-up-center">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">Slot Reserved!</h3>
            <p className="text-sage-600 mb-6 text-sm">Your entry token <span className="font-mono font-bold text-emerald-700">{lastBookingId}</span> is now active. Please arrive 15 mins early.</p>
            <Button onClick={() => setShowSuccess(false)} className="w-full bg-emerald-600 h-12 font-bold rounded-xl">Back to Dashboard</Button>
          </Card>
        </div>
      )}

    </div>
  );
}