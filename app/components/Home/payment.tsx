import { useEffect, useState } from "react";
import axios from 'axios';
import { BASE_URL } from '../apiConfig';


interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

interface PaymentPlanProps {
  accountType: string;
  onPaymentComplete: () => void;
}

interface PaystackResponse {
  reference: string;
  status: string;
}

const PaymentPlan = ({ accountType, onPaymentComplete }: PaymentPlanProps) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitializingPayment, setIsInitializingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const loadPaystackScript = () => {
      return new Promise<void>((resolve, reject) => {
        console.log("Loading Paystack script...");
        if ((window as any).PaystackPop) {
          resolve();
          return;
        }
    
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Paystack script'));
        document.head.appendChild(script);
      });
    };
    
    const fetchPlans = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(`${BASE_URL}/api/plans`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPlans(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch plans");
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    };

    const initializeComponent = async () => {
      try {
        await loadPaystackScript();
        await fetchPlans();
      } catch (error) {
        setError(error instanceof Error ? error.message : "Initialization failed");
        setLoading(false);
      }
    };

    initializeComponent();
  }, []);

  const handleSubscription = async (response: any, plan: Plan) => {
    console.log("Handling subscription with response:", response);
    
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Auth token not found");
      }

      const payload = {
        plan_id: plan.id,
        reference: response.reference,
        transaction_id: response.transaction,
        status: response.status,
      };
      
      console.log("Making request to subscribe endpoint with payload:", payload);

      // Make the API call
      const result = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/subscribe`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        }
      });

      console.log("Subscription API response:", result);
      return result;
    } catch (error) {
      console.error("Subscription API error:", error);
      throw error;
    }
  };

  const handlePayment = async (plan: Plan) => {
    console.log("=== Starting Payment Process ===");
    setIsInitializingPayment(true);
    setSelectedPlan(plan);

    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error('User email not found');
      }

      const PaystackPop = (window as any).PaystackPop;
      if (!PaystackPop) {
        throw new Error("Paystack script not loaded");
      }

      const paymentRef = 'TR_' + Math.floor((Math.random() * 1000000000) + 1);
      console.log("Generated payment reference:", paymentRef);

      const config = {
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: userEmail,
        amount: Math.round(plan.price * 100),
        currency: "NGN",
        ref: paymentRef,
        metadata: {
          plan_id: plan.id,
          user_email: userEmail
        },
        onSuccess: function(response: any) {
          console.log("Payment successful:", response);
          
          // Handle subscription in a non-async callback
          handleSubscription(response, plan)
            .then((result) => {
              console.log("Subscription successful:", result);
              alert("Payment successful! Your subscription has been activated.");
              onPaymentComplete();
            })
            .catch((error) => {
              console.error("Subscription failed:", error);
              alert(`Payment successful but subscription failed. Reference: ${response.reference}`);
            })
            .finally(() => {
              setIsInitializingPayment(false);
              setSelectedPlan(null);
            });
        },
        onClose: function() {
          console.log("Payment modal closed");
          setIsInitializingPayment(false);
          setSelectedPlan(null);
        }
      };

      console.log("Initializing Paystack with config:", config);
      
      const handler = PaystackPop.setup(config);
      setIsInitializingPayment(false);
      handler.openIframe();
    } catch (error) {
      console.error("Payment initialization error:", error);
      setError(error instanceof Error ? error.message : "Payment processing failed");
      setIsInitializingPayment(false);
      setSelectedPlan(null);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 text-primary">Loading...</div>
      </div>
    );
  }

  // if (isPaymentLoading) {
  //   return <div>Processing your payment, please wait...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-24 relative">
      <div className="absolute h-[26.5rem] w-full top-0 bg-white-to-r from-red-600 to-white -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-manrope text-5xl font-bold text-black mb-4">
            Select a Payment Plan
          </h2>
          <p className="text-gray-500 text-xl leading-6">
            You've selected the <span className="text-black">{accountType}</span> plan.
          </p>
        </div>

        <section className="py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-1">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="group relative flex flex-col items-center bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 p-6 border border-red-500 hover:border-red-700"
                >
                  <div className="w-16 h-16 rounded-full bg-red-100 flex justify-center items-center mb-4">
                    {/* Plan Icon - Customize as needed */}
                    <svg
                      className="w-6 h-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m2 0a2 2 0 100-4h-6a2 2 0 100 4m0 0h6a2 2 0 110 4h-6a2 2 0 100-4m0 0h-6a2 2 0 100 4h6"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-red-600">{plan.name}</h3>
                  <p className="font-bold mt-2 text-gray-700">
                    ₦{plan.price.toLocaleString()} {plan.duration}
                  </p>
                  <ul className="mt-4 text-gray-700 list-disc list-inside">
                    {plan.features.map((feature: string, index: number) => (
                      <li key={index} className="mb-2">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePayment(plan)}
                    className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Select {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentPlan;
