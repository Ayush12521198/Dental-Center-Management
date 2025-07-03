import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const CalendarView = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState("monthly");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("incidents")) || [];
    setIncidents(data);
  }, []);

  const handleMonthChange = (offset) => {
    let newMonth = month + offset;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const formatDate = (d) => new Date(d).toISOString().split("T")[0];
  const getIncidentsForDay = (dateStr) =>
    incidents.filter((i) => formatDate(i.appointmentDate) === dateStr);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const weeks = [];

  let day = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < startDay) || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day);
        day++;
      }
    }
    weeks.push(week);
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button onClick={() => handleMonthChange(-1)} className="text-xl font-bold hover:text-blue-600">←</button>
          <h1 className="text-2xl font-bold text-gray-800">📅 {monthName} {year}</h1>
          <button onClick={() => handleMonthChange(1)} className="text-xl font-bold hover:text-blue-600">→</button>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-200"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-200"
          >
            {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition shadow ${
              view === "monthly" ? "bg-blue-600 text-white" : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"}`}
            onClick={() => setView("monthly")}
          >
            Monthly View
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition shadow ${
              view === "weekly" ? "bg-blue-600 text-white" : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"}`}
            onClick={() => setView("weekly")}
          >
            Weekly View
          </button>
        </div>
      </div>

      {view === "weekly" && (
        <div className="overflow-auto bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Weekly Appointments</h2>
          <table className="w-full table-fixed border text-sm text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-32 border">Type</th>
                {days.map((day) => (
                  <th key={day} className="border px-2 py-1 w-1/7">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Status", "Patient Name", "Fees", "Time"].map((label) => (
                <tr key={label} className="hover:bg-gray-50">
                  <td className="border font-semibold bg-gray-50 px-2 py-2 text-left text-xs text-gray-600">{label}</td>
                  {days.map((day) => {
                    const daily = incidents.find((i) => {
                      const date = new Date(i.appointmentDate);
                      return date.toLocaleString("en-US", { weekday: "long" }) === day;
                    });
                    return (
                      <td key={day + label} className="border px-2 py-2 text-xs">
                        {daily ? (
                          label === "Status" ? (
                            <span className={`inline-block px-2 py-1 rounded-full text-white text-xs font-medium ${daily.status?.toLowerCase() === "completed" ? "bg-green-500" : "bg-yellow-500"}`}>{daily.status || "Pending"}</span>
                          ) : label === "Patient Name" ? (
                            <span className="font-medium text-gray-700">{daily.title}</span>
                          ) : label === "Fees" ? (
                            <span className="text-blue-600 font-semibold">₹{daily.cost}</span>
                          ) : label === "Time" ? (
                            <span className="text-gray-600">{new Date(daily.appointmentDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          ) : null
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Monthly view unchanged */}
      {view === "monthly" && (
        <div className="bg-white rounded-xl shadow overflow-hidden mb-10">
          <div className="grid grid-cols-7 bg-gray-100 text-center font-semibold text-xs uppercase text-gray-600">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 border-b border-r last:border-r-0">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 text-sm">
            {weeks.flat().map((day, idx) => {
              const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : null;
              const daily = dateStr ? getIncidentsForDay(dateStr) : [];
              return (
                <div
                  key={idx}
                  onClick={() => day && setSelectedDate(dateStr)}
                  className={`h-32 p-2 border border-gray-200 cursor-pointer hover:bg-blue-50 transition-all duration-150 ${
                    day ? "bg-white" : "bg-gray-50"}`}
                >
                  <div className="text-[11px] font-semibold text-gray-600 mb-1">{day || ""}</div>
                  {daily.slice(0, 2).map((a) => (
                    <div key={a.id} className="bg-blue-100 rounded-md p-1 mb-1 text-[10px] text-blue-900 shadow-sm">
                      {a.title}
                    </div>
                  ))}
                  {daily.length > 2 && (
                    <div className="text-[10px] text-gray-400">+{daily.length - 2} more</div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedDate && (
            <div className="bg-white rounded shadow p-4 mt-4">
              <h3 className="text-lg font-bold mb-2">Appointments on {selectedDate}</h3>
              <ul className="space-y-2 text-sm">
                {getIncidentsForDay(selectedDate).map((appt) => (
                  <li key={appt.id} className="border p-3 rounded bg-gray-50 shadow-sm">
                    <div><strong>Patient:</strong> {appt.title}</div>
                    <div><strong>Time:</strong> {new Date(appt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div><strong>Status:</strong> {appt.status}</div>
                    <div><strong>Fees:</strong> ₹{appt.cost}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default CalendarView;




