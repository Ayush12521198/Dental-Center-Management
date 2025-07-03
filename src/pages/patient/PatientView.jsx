import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";

const PatientView = () => {
  const { user, logout } = useAuth();
  const [patient, setPatient] = useState(null);
  const [editablePatient, setEditablePatient] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const patientData = allPatients.find((p) => p.id === user.patientId);
    setPatient(patientData);
    setEditablePatient(patientData);

    const allIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const patientIncidents = allIncidents.filter(
      (i) => i.patientId === user.patientId
    );
    setIncidents(patientIncidents);
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditablePatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    const updatedPatients = JSON.parse(localStorage.getItem("patients"))?.map((p) =>
      p.id === editablePatient.id ? editablePatient : p
    ) || [];
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setPatient(editablePatient);
    setIsEditing(false);
  };

  const upcoming = incidents.filter(
    (i) => new Date(i.appointmentDate) >= new Date()
  );
  const past = incidents.filter(
    (i) => new Date(i.appointmentDate) < new Date()
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Welcome, {patient?.name}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">🩺 Profile Information</h2>
          {isEditing ? (
            <button
              onClick={handleProfileSave}
              className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 flex items-center gap-1"
            >
              <SaveIcon fontSize="small" /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 flex items-center gap-1"
            >
              <EditIcon fontSize="small" /> Edit
            </button>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <strong>Full Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editablePatient?.name || ""}
                onChange={handleProfileChange}
                className="border rounded px-2 py-1 text-sm w-full max-w-xs"
              />
            ) : (
              <span>{editablePatient?.name}</span>
            )}
          </div>
          <div>
            <strong>DOB:</strong>{" "}
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={editablePatient?.dob || ""}
                onChange={handleProfileChange}
                className="border rounded px-2 py-1 text-sm"
              />
            ) : (
              <span>{editablePatient?.dob}</span>
            )}
          </div>
          <div>
            <strong>Contact:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="contact"
                value={editablePatient?.contact || ""}
                onChange={handleProfileChange}
                className="border rounded px-2 py-1 text-sm"
              />
            ) : (
              <span>{editablePatient?.contact}</span>
            )}
          </div>
          <div>
            <strong>Health Info:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="healthInfo"
                value={editablePatient?.healthInfo || ""}
                onChange={handleProfileChange}
                className="border rounded px-2 py-1 text-sm w-full max-w-sm"
              />
            ) : (
              <span>{editablePatient?.healthInfo}</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">📅 Upcoming Appointments</h3>
          {upcoming.length === 0 ? (
            <p className="text-gray-500 text-sm">No upcoming appointments.</p>
          ) : (
            <ul className="space-y-4">
              {upcoming.map((i) => (
                <li key={i.id} className="p-4 border rounded-lg shadow-sm bg-blue-50">
                  <div className="text-md font-semibold text-blue-900">{i.title}</div>
                  <div className="text-sm text-gray-600">{new Date(i.appointmentDate).toLocaleString()}</div>
                  <div className="text-sm text-yellow-700 font-medium">Status: {i.status}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-green-700">📝 Treatment History</h3>
          {past.length === 0 ? (
            <p className="text-gray-500 text-sm">No past treatments found.</p>
          ) : (
            <ul className="space-y-4">
              {past.map((i) => (
                <li key={i.id} className="p-4 border rounded-lg shadow-sm bg-green-50">
                  <div className="text-md font-semibold text-green-900">{i.title}</div>
                  <div className="text-sm text-gray-600">{new Date(i.appointmentDate).toLocaleString()}</div>
                  <div className="text-sm text-gray-700">Treatment: {i.description}</div>
                  <div className="text-sm text-gray-700">Cost: ₹{i.cost}</div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {i.files?.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 underline hover:text-blue-800"
                      >
                        {file.name}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientView;