"use client";

import { motion } from "framer-motion";
import { HelpCircle, Mail, MessageSquare, PhoneCall, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does it take to process a certificate?",
    answer: "Most certificates, like Income or Caste certificates, take about 10-15 business days depending on standard government processing times. You can always track the estimated delivery on your dashboard.",
  },
  {
    question: "How is the service charge calculated?",
    answer: "The service charge includes the standard government fee plus our platform brokerage fee for handling your paperwork and paying verified agents to run the manual errands on your behalf.",
  },
  {
    question: "What if my application gets rejected by the government?",
    answer: "If your application is rejected due to invalid documents, our agents will immediately notify you via the platform and allow you to re-upload the correct files without paying the service charge again.",
  },
  {
    question: "How do I get the final physical certificate?",
    answer: "The final official PDF is uploaded directly to your dashboard where you can download and print it. It holds the same legal validity as physical copies.",
  }
];

export default function CitizenSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto relative z-10 pb-16">
      {/* Decorative Blob */}
      <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

      <div className="mb-12">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-900 tracking-tight leading-tight mb-2">Help & Support</h2>
        <p className="text-slate-500 font-medium text-lg">We're here to help you navigate government forms with ease.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <HelpCircle className="text-indigo-500" />
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-2xl transition-all cursor-pointer ${openFaq === idx ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="p-5 flex items-center justify-between font-bold text-slate-800">
                    {faq.question}
                    <ChevronDown className={`text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-indigo-500' : ''}`} />
                  </div>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-slate-600 leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact System */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-indigo-500 opacity-30 rounded-full blur-3xl mix-blend-screen group-hover:scale-150 transition-transform duration-700"></div>
            
            <h3 className="text-xl font-bold mb-2 relative z-10">Premium Support</h3>
            <p className="text-indigo-200 text-sm mb-6 relative z-10 w-5/6">Need urgent help with an ongoing application? Contact our specific platform agents.</p>
            
            <div className="space-y-4 relative z-10">
              <a href="tel:+919315861151" className="w-full flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-2xl transition-all backdrop-blur-sm group hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/40 transition-colors">
                  <PhoneCall size={18} className="text-indigo-300 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-left block text-lg">Call Helpline</span>
                  <span className="text-xs text-indigo-200 font-medium tracking-wider">+91 9315861151 (9 AM - 6 PM)</span>
                </div>
              </a>
              <a href="https://wa.me/919315861151" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-4 bg-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/30 border border-white/10 p-4 rounded-2xl transition-all backdrop-blur-sm group hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/60 transition-colors">
                  <MessageSquare size={18} className="text-emerald-300 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-left block text-lg">WhatsApp Support</span>
                  <span className="text-xs text-emerald-200/80 font-medium tracking-wider">Fastest Reply • Live Chat</span>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Mail className="text-slate-400" size={20} />
              Drop us an email
            </h3>
            {submitted ? (
               <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm font-semibold flex items-center gap-2 border border-emerald-100">
                  <CheckCircle2 size={18} /> Message Successfully Sent
               </div>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <input type="text" placeholder="Subject" required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors" />
                  <textarea placeholder="How can we help?" required rows={4} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors resize-none"></textarea>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20">Send Message</button>
                </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
