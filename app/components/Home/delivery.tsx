import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../apiConfig";

const DeliveryLog = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/music?filter=single`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch delivery data');
        }
        const data = await response.json();
        setDeliveries(data.data.data.slice(0, 4)); 
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Delivery Log</h2>
        <select className="text-xs md:text-sm border rounded p-1">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200">
            {deliveries.map((delivery: any) => (
              <tr key={delivery.id} className="text-xs md:text-sm hover:bg-gray-50">
                <td className="py-2">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={delivery.album_art_url} 
                      alt="Album Art"
                      className="w-8 h-8 rounded-sm object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                    <span className="font-medium">{delivery.track_title || 'Untitled'}</span>
                  </div>
                </td>
                <td className="py-2 text-right text-gray-500">
                  {new Date(delivery.created_at).toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="py-2 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    delivery.status === 'published' ? 'bg-green-100 text-green-800' :
                    delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {delivery.status || 'Processing'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deliveries.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No deliveries found
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryLog;