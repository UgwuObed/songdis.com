import { useEffect, useState } from "react";
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import PaymentStatus from './status';

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

const PaymentPlan = ({ accountType, onPaymentComplete }: PaymentPlanProps) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(`${BASE_URL}/api/plans`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setPlans(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch plans");
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePromoCodeSubmit = async () => {
    setPromoError(null);
    setPromoLoading(true);

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.post(
        `${BASE_URL}/api/redeem-promo`,
        { code: promoCode },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 'success') {
        onPaymentComplete();
      } else {
        setPromoError("Failed to apply promo code");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error
        ? err.message
        : (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Invalid promo code";
      setPromoError(errorMessage);
    } finally {
      setPromoLoading(false);
    }
  };

  const handlePayment = async (planId: string) => {
    setProcessingPlan(planId);
    setError(null);
  
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Authentication token not found. Please log in again.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/subscribe`,
        { plan_id: planId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      if (response.data.status === 'success' && response.data.redirect_url) {
        window.location.href = response.data.redirect_url;
      } else {
        setError("Invalid response from payment server");
        console.error('Invalid payment response:', response.data);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error
        ? err.message
        : (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Unexpected error occurred";
      setError(errorMessage);
    } finally {
      setProcessingPlan(null);
    }
  };  

  if (loading) {
    return <div>Loading plans...</div>;
  }

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
          
          {/* Promo Code Section */}
          <div className="mt-4">
            {!showPromoInput ? (
              <button
                onClick={() => setShowPromoInput(true)}
                className="text-red-600 hover:text-red-700 underline"
              >
                Have a promo code for one month free?
              </button>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="flex justify-center items-center space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={handlePromoCodeSubmit}
                    disabled={promoLoading}
                    className={`px-4 py-2 rounded-md ${
                      promoLoading 
                        ? "bg-gray-400" 
                        : "bg-red-600 hover:bg-red-700"
                    } text-white`}
                  >
                    {promoLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                        </svg>
                        Applying...
                      </span>
                    ) : (
                      "Apply Code"
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowPromoInput(false);
                      setPromoError(null);
                      setPromoCode("");
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-600 text-sm">{promoError}</p>
                )}
              </div>
            )}
          </div>
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
                    {plan.features.map((feature, index) => (
                      <li key={index} className="mb-2">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePayment(plan.id)}
                    className={`mt-4 py-2 px-4 rounded-md transition-colors ${
                      processingPlan === plan.id ? "bg-gray-500 text-white" : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                    disabled={processingPlan === plan.id}
                  >
                    {processingPlan === plan.id ? (
                      <span>
                        <svg className="animate-spin h-5 w-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6l4 2"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Select ${plan.name}`
                    )}
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