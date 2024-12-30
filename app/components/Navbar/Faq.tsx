import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-left">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What's SongDis?",
      answer: "SongDis provides independent artists and labels with co-management & simple music distribution to over 400+ platforms, including Spotify and Apple.\n\nEarn 100% of your revenue and expand your fan base across Africa and worldwide."
    },
    {
      question: "Why is SongDis better?",
      answer: "SongDis is an africa music distribution service built for artists at any stage of their careers, from beginners to established acts. Our system is user-friendly and provides simple royalty withdrawals, co-management support for growth, and full customer service 24/7. Whether you're just starting out or taking your music to the next level, SongDis is the perfect partner for your journey."
    },
    {
      question: "How long does it take to get my music on streaming platforms?",
      answer: "Typically, it takes between 1-7 days for your music to appear on most platforms after submission. However, we recommend submitting your music at least 3 weeks in advance of your planned release date. This allows ample time for platforms like Spotify and others to review your music, as well as creating more opportunities for playlist placements and editorial features.\n\nThe extra time gives you a better chance of securing prime spots on playlists, which can significantly increase your exposure."
    },
    {
      question: "Will there be unlimited distribution?",
      answer: "SongDis is proud to partner with an extensive network of over 400+ digital streaming platforms, including industry leaders like Spotify, Apple Music, Tidal, and TikTok. Our global reach and commitment to maximizing artists' exposure and earnings ensure that your music reaches the widest possible audience, allowing you to build your fanbase and generate revenue from every corner of the world."
    },
    {
      question: "Do I need to be signed to a label to use SongDis?",
      answer: "No, you don't need to be signed to a label. SongDis is open to both independent artists and labels, offering services that cater to all types of creators."
    },
    {
      question: "What happens if I have an issue with my distribution or revenue?",
      answer: "Our customer support team is here to help! If you face any issues with distribution, royalties, or anything else, feel free to reach out. We strive to resolve any problems as quickly as possible."
    },
    {
      question: "Do I keep 100% of my royalties?",
      answer: "Yes, you keep 100% of your royalties with our Starter and Growth plans. SongDis ensures that all revenue generated from your music goes directly to you, with no hidden fees or deductions."
    },
    {
      question: "Do you deliver lyrics to DSPs?",
      answer: "Yes we delivered but If you want your lyrics uploaded & time synced to DSPs, you may do so via Musixmatch. Musixmatch allows you to connect your verified digital streaming profiles and submit lyrics to platforms such as Spotify, Apple Music, Instagram, Shazam, Amazon and more. It also allows you to time-sync your lyrics, giving your fans the opportunity to read along."
    },
    {
      question: "Can I withdraw my earnings whenever I want? If not, when are payments sent to artists?",
      answer: "Earnings cannot be withdrawn at any time. Payments are sent to the payment information you've provided in your account once the minimum threshold of $50 is reached. Payments are processed within a week after the 15th of each month."
    },
    {
      question: "Do you help us defend illegal copyrights against our songs?",
      answer: "If you identify someone fraudulently uploading your music on other platforms, we can submit DMCAs for that content on your behalf."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">SongDis FAQs</h1>
      <div className="bg-white rounded-lg shadow-lg">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;