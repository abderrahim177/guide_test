import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const GuideCalendar = ({ guideId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 1. Fetch data from API
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getGuideBookings`)
      .then(response => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, [guideId]);

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // 2. Check if a date falls between start_date and end_date
  const isDateBooked = (dateStr, booking) => {
    return dateStr >= booking.start_date && dateStr <= booking.end_date;
  };

  // 3. Render status indicators on the Calendar tile
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = formatDate(date);

      const hasConfirmed = bookings.some(
        b => isDateBooked(dateStr, b) && b.status === 'confirmed'
      );
      const hasPending = bookings.some(
        b => isDateBooked(dateStr, b) && b.status === 'pending'
      );

      return (
        <div className="flex justify-center gap-1 mt-1">
          {hasConfirmed && <span className="w-2 h-2 bg-red-500 rounded-full" title="Booked"></span>}
          {hasPending && <span className="w-2 h-2 bg-amber-400 rounded-full" title="Pending Request"></span>}
        </div>
      );
    }
  };

  // 4. Get bookings for the selected date
  const selectedDateStr = formatDate(selectedDate);
  const dayBookings = bookings.filter(b => isDateBooked(selectedDateStr, b));

  if (loading) return <p className="p-4 text-gray-500">Loading bookings...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <Calendar 
          onChange={setSelectedDate} 
          value={selectedDate} 
          tileContent={tileContent}
        />
      </div>

      <div className="w-full md:w-80 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold border-b pb-2 text-gray-800">
          Bookings for: {selectedDateStr}
        </h3>
        <div className="mt-4 space-y-3">
          {dayBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">No bookings for this date.</p>
          ) : (
            dayBookings.map(b => (
              <div key={b.id} className="p-3 bg-white rounded border border-gray-200 text-sm">
                <p className="font-bold text-gray-800">
                  Visitor: {b.user?.name || `User #${b.user_id}`}
                </p>
                <p className="text-xs text-gray-500 mt-1">Phone: {b.phone}</p>
                <p className="text-xs text-gray-500">Price: {b.total_price} MAD</p>
                <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded font-medium capitalize ${
                  b.status === 'confirmed' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {b.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideCalendar;