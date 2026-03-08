'use client';

import { useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  language?: string;
}

interface ChatResponse {
  answer: string;
  language: 'hi' | 'pa' | 'en';
  commodity: string | null;
  data: {
    commodity: string;
    state: string;
    district: string;
    market: string;
    modalPrice: number;
    minPrice: number;
    maxPrice: number;
  } | null;
}

export function VoiceAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  const initSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported');
      return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    return recognition;
  }, []);

  // Get language code for speech synthesis
  const getSpeechLang = (lang: string): string => {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'pa': return 'pa-IN';
      case 'en':
      default: return 'en-IN';
    }
  };

  // Speak response
  const speak = useCallback((text: string, language: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !speechEnabled) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLang(language);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [speechEnabled]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Send message to API
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text.trim() }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data: ChatResponse = await response.json();
      
      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        language: data.language,
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Speak the response
      if (speechEnabled) {
        speak(data.answer, data.language);
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle voice input
  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    
    const recognition = initSpeechRecognition();
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    
    recognitionRef.current = recognition;
    
    // Auto-detect language or default to Hindi for Indian farmers
    recognition.lang = 'auto';
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      sendMessage(transcript);
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, initSpeechRecognition, sendMessage]);

  // Handle text input submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  // Quick suggestion buttons
  const suggestions = [
    { text: 'What is wheat price?', label: 'English' },
    { text: 'गेहूं का रेट क्या है?', label: 'Hindi' },
    { text: 'ਗੇਹੂੰ ਦਾ ਰੇਟ ਕੀ ਹੈ?', label: 'Punjabi' },
  ];

  return (
    <Card className="border-emerald-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-emerald-800">
            <MessageCircle className="mr-2 h-5 w-5" />
            KRISHI Assistant
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
              🎤 Voice Enabled
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                }
                setSpeechEnabled(!speechEnabled);
              }}
              className="h-8 w-8 p-0"
            >
              {speechEnabled ? (
                <Volume2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <VolumeX className="h-4 w-4 text-slate-400" />
              )}
            </Button>
          </div>
        </div>
        <p className="text-sm text-emerald-600">
          Ask about crop prices in English, Hindi, or Punjabi
        </p>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Messages */}
        <div className="h-64 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
                <Mic className="h-8 w-8 text-emerald-600" />
              </div>
              <p className="text-slate-600 mb-2">Tap the microphone and ask:</p>
              <div className="space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(suggestion.text)}
                    className="block w-full text-left px-3 py-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <span className="font-medium">{suggestion.label}:</span> {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.isUser
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {!message.isUser && message.language && (
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.language === 'hi' ? 'हिंदी' : 
                       message.language === 'pa' ? 'ਪੰਜਾਬੀ' : 'English'}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl px-4 py-2">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or speak your question..."
              className="w-full h-11 pl-4 pr-12 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {inputText && (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <Button
            type="button"
            onClick={toggleListening}
            disabled={isLoading}
            className={`h-11 w-11 p-0 rounded-lg transition-all ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isListening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
        </form>

        {/* Language indicators */}
        <div className="flex justify-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            English
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            हिंदी
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            ਪੰਜਾਬੀ
          </span>
        </div>
      </CardContent>
    </Card>
  );
}


