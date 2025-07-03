import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { CalendarToday, People, AttachMoney, CheckCircle } from "@mui/icons-material";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem("patients")) || [];
    const incidentData = JSON.parse(localStorage.getItem("incidents")) || [];
    setPatients(patientData);
    const upcoming = incidentData
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
      .slice(0, 10);
    setAppointments(upcoming);
  }, []);

  const totalRevenue = appointments.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
  const pendingCount = appointments.filter((a) => a.status !== "Completed").length;
  const completedCount = appointments.filter((a) => a.status === "Completed").length;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded shadow flex items-center gap-4">
          <CalendarToday className="text-blue-600" />
          <div>
            <h2 className="text-sm text-gray-600">Upcoming Appointments</h2>
            <p className="text-2xl font-bold text-blue-900">{appointments.length}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded shadow flex items-center gap-4">
          <People className="text-green-600" />
          <div>
            <h2 className="text-sm text-gray-600">Total Patients</h2>
            <p className="text-2xl font-bold text-green-900">{patients.length}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 rounded shadow flex items-center gap-4">
          <AttachMoney className="text-yellow-600" />
          <div>
            <h2 className="text-sm text-gray-600">Revenue</h2>
            <p className="text-2xl font-bold text-yellow-800">₹{totalRevenue}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 rounded shadow flex items-center gap-4">
          <CheckCircle className="text-purple-600" />
          <div>
            <h2 className="text-sm text-gray-600">Completed</h2>
            <p className="text-2xl font-bold text-purple-900">{completedCount}</p>
            <p className="text-xs text-gray-500">{pendingCount} Pending</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Upcoming Appointments</h3>
        <ul className="divide-y divide-gray-100 max-h-72 overflow-auto">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <li key={appt.id} className="py-3 text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-blue-700">{appt.title}</span>
                    <p className="text-xs text-gray-500">
                      {new Date(appt.appointmentDate).toLocaleString()} —
                      <span className={`ml-1 font-medium ${
                        appt.status === "Completed" ? "text-green-600" : "text-orange-500"}`}>{appt.status}</span>
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">₹{appt.cost}</span>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-gray-500">No upcoming appointments</li>
          )}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
