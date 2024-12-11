'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryStatus = searchParams.get('status');
    const queryMessage = searchParams.get('message');
    setStatus(queryStatus);
    setMessage(queryMessage);

    setTimeout(() => setIsLoading(false), 500);
  }, [searchParams]);

  const statusConfig = {
    success: {
      icon: <CheckCircle className="w-16 h-16 text-green-500" />,
      title: "Payment Successful",
      defaultMessage: "Your payment has been successfully processed.",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      titleColor: "text-green-700"
    },
    error: {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: "Payment Failed",
      defaultMessage: "There was an issue processing your payment. Please try again.",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      titleColor: "text-red-700"
    },
    pending: {
      icon: <Clock className="w-16 h-16 text-gray-500" />,
      title: "Awaiting Payment Status",
      defaultMessage: "Please wait or ensure the correct link was used.",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      titleColor: "text-gray-700"
    }
  };

  const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          className={`${currentStatus.bgColor} border ${currentStatus.borderColor} rounded-2xl shadow-xl overflow-hidden`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              {currentStatus.icon}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className={`text-2xl font-bold text-center mb-4 ${currentStatus.titleColor}`}
            >
              {currentStatus.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="text-gray-600 text-center mb-8"
            >
              {message || currentStatus.defaultMessage}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="flex justify-center"
            >
              <button
                onClick={() => router.push('/dashboard')}
                className="group relative bg-red-500 text-white px-8 py-3 rounded-xl font-semibold 
                          shadow-lg hover:bg-red-600 transform hover:-translate-y-0.5 transition-all 
                          duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 
                          focus:ring-offset-2"
              >
                <span className="flex items-center">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Need help? Contact our support team
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PaymentStatus;