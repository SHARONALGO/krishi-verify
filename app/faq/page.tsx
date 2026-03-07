'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const faqs = [
    {
      category: 'Getting Started',
      items: [
        {
          q: 'How do I register on KRISHI-VERIFY?',
          a: 'Visit our website, click "Register as Farmer" or "Register as Operator", and fill in your basic details. Verify your Aadhaar/phone number and you\'re ready to go. The entire process takes less than 5 minutes.',
        },
        {
          q: 'Is registration free?',
          a: 'Yes! Registration is completely free for farmers. Operators pay per transaction - just ₹50 per successful transaction. No hidden charges.',
        },
        {
          q: 'What do I need to register?',
          a: 'For farmers: Aadhaar number or phone number, bank account details. For operators: Business registration, GST number, bank account details.',
        },
      ],
    },
    {
      category: 'For Farmers',
      items: [
        {
          q: 'How do I sell my produce?',
          a: 'After registration, log in to the dashboard, click "Sell Produce", enter crop details (type, quantity, quality), and submit. Operators will see your listing and can make offers. You can accept the best offer.',
        },
        {
          q: 'When do I get paid?',
          a: 'Payment is transferred directly to your registered bank account within 24 hours of completing the transaction. You can track payment status in real-time.',
        },
        {
          q: 'How is the price calculated?',
          a: 'The system calculates MSP (Minimum Support Price) automatically based on government rates, quantity, and quality. The price displayed is the guaranteed fair price you\'ll receive.',
        },
        {
          q: 'What is a digital receipt?',
          a: 'Every transaction generates a blockchain-verified digital receipt with QR code. You can access it anytime for proof of sale and verify authenticity through the QR code.',
        },
      ],
    },
    {
      category: 'For Operators',
      items: [
        {
          q: 'What is operator commission?',
          a: '₹50 per successful transaction or 1% of transaction value (whichever is lower). This is deducted from buyer payments, not farmer payments.',
        },
        {
          q: 'How do I verify produce quality?',
          a: 'Our platform includes quality verification tools. Match samples with standard grades, check moisture content against benchmarks, and use our quality checklist to classify accurately.',
        },
        {
          q: 'Can I use the API?',
          a: 'Yes! We offer a comprehensive REST API for enterprise integration. Visit our developer documentation or contact developer@krishiverify.gov.in for API access.',
        },
      ],
    },
    {
      category: 'Security & Privacy',
      items: [
        {
          q: 'Is my data safe?',
          a: 'Absolutely. We use SHA-256 encryption, your data is stored in secure government servers, and you have complete control over your information. All transactions are blockchain-verified.',
        },
        {
          q: 'How is personal information protected?',
          a: 'Your personal data is encrypted and stored securely. Public dashboard displays only anonymized transaction data. We comply with all data protection regulations.',
        },
        {
          q: 'What about payment security?',
          a: 'Payments are processed through verified banks and payment gateways. All transactions are encrypted and verified. Zero fraud cases reported so far.',
        },
      ],
    },
    {
      category: 'Technical Support',
      items: [
        {
          q: 'The app is slow. What should I do?',
          a: 'Try: 1) Refresh the page, 2) Clear browser cache, 3) Use a different browser, 4) Check your internet speed. For persistent issues, contact support at 1800-180-1551.',
        },
        {
          q: 'How do I recover a forgotten password?',
          a: 'Click "Forgot Password" on the login page, enter your registered email or phone, and follow the verification process. You\'ll receive a password reset link.',
        },
        {
          q: 'Does KRISHI-VERIFY work on mobile phones?',
          a: 'Yes! The platform is fully responsive and works on all devices. Download our mobile app from App Store / Play Store for offline access and better performance.',
        },
      ],
    },
    {
      category: 'Payments & Schemes',
      items: [
        {
          q: 'What government schemes are available?',
          a: 'We support PM-Kisan, Crop Insurance (PMFBY), Soil Health Card, and state-specific schemes. Visit the Programs section for detailed information.',
        },
        {
          q: 'How do I claim benefits?',
          a: 'All eligible transactions automatically qualify for government benefits. Your KRISHI-VERIFY transaction ID serves as proof. Submit our digital receipt to claim schemes.',
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-emerald-100">
            Find answers to common questions about KRISHI-VERIFY
          </p>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="space-y-12">
          {faqs.map((category, categoryIdx) => (
            <div key={categoryIdx}>
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 pb-3 border-b-2 border-emerald-200">
                {category.category}
              </h2>

              <div className="space-y-3">
                {category.items.map((item, itemIdx) => {
                  const uniqueId = `${categoryIdx}-${itemIdx}`;
                  return (
                    <div
                      key={itemIdx}
                      className="rounded-lg border border-emerald-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === uniqueId ? null : uniqueId)}
                        className="w-full px-6 py-4 text-left font-semibold text-emerald-900 hover:bg-emerald-50 transition-colors flex items-center justify-between"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-emerald-600 transition-transform ${
                            openIndex === uniqueId ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {openIndex === uniqueId && (
                        <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-200 text-forest-700">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <section className="mt-16 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <p className="font-semibold">📞 Call: <span className="text-emerald-200">1800-180-1551</span></p>
            <p className="font-semibold">📧 Email: <span className="text-emerald-200">support@krishiverify.gov.in</span></p>
          </div>
        </section>
      </div>
    </main>
  );
}
