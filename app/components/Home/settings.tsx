import { ArrowRight, Clock } from "lucide-react";
import router from "next/router";
import { useRouter, useSearchParams } from 'next/navigation';

const Settings = () => {

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="text-center p-8 rounded-2xl backdrop-blur-sm bg-white/30 shadow-xl border border-gray-100 max-w-2xl mx-4">
        <div className="mb-6 bg-red-50 p-4 rounded-full inline-block">
          <Clock className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
          Coming Soon
        </h1>
        
        <div className="space-y-4">
          <p className="text-xl text-gray-600">
            This page dashboard is currently under development
          </p>
          <p className="text-gray-500">
            We're working hard to bring you powerful insights and beautiful visualizations.
          </p>
          <div className="pt-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;