
"use client";

import { useState, useEffect } from "react";

// Note: You'll need to run: npm install date-fns
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: "Team Meeting", date: "2024-01-15", time: "10:00 AM" },
    { id: 2, title: "Client Call", date: "2024-01-16", time: "2:00 PM" },
    { id: 3, title: "Project Review", date: "2024-01-18", time: "11:30 AM" },
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={previousMonth}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Previous
            </button>
            <span className="text-xl font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <button
              onClick={nextMonth}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center font-semibold p-2 bg-gray-50"
            >
              {day}
            </div>
          ))}
          {daysInMonth.map((date: Date) => (
            <div
              key={date.toString()}
              className={`min-h-[100px] p-2 border ${
                isToday(date) ? "bg-indigo-50 border-indigo-200" : "border-gray-200"
              } ${
                isSameMonth(date, currentDate) ? "" : "bg-gray-50 text-gray-400"
              }`}
            >
              <div className="font-semibold mb-1">{format(date, "d")}</div>
              {events
                .filter((event) => event.date === format(date, "yyyy-MM-dd"))
                .map((event) => (
                  <div
                    key={event.id}
                    className="text-xs bg-indigo-100 text-indigo-700 p-1 mb-1 rounded"
                  >
                    {event.time} - {event.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

