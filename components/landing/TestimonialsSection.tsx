'use client';

import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Wheat Farmer, Haryana',
      quote: 'KRISHI-VERIFY helped me get 15% more for my wheat. No hidden charges, no delays. Direct payment to my account!',
      image: '👨‍🌾',
      rating: 5,
    },
    {
      name: 'Priya Singh',
      role: 'Paddy Cultivator, Punjab',
      quote: 'The digital receipt system is brilliant. I have complete transparency and proof of every transaction.',
      image: '👩‍🌾',
      rating: 5,
    },
    {
      name: 'Harmail Singh',
      role: 'Vegetable Grower, MP',
      quote: 'As an operator, the platform makes it so easy to connect with farmers and verify quality instantly.',
      image: '👨‍💼',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-emerald-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Success Stories</h2>
          <p className="text-forest-700 max-w-2xl mx-auto">
            Real farmers and operators sharing their KRISHI-VERIFY experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-lg border border-emerald-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <Quote className="h-5 w-5 text-emerald-400 mr-2" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              
              <p className="text-forest-700 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="mr-4 text-3xl">{testimonial.image}</div>
                <div>
                  <p className="font-semibold text-emerald-900">{testimonial.name}</p>
                  <p className="text-sm text-forest-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
