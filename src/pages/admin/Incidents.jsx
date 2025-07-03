import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AdminLayout from "../../components/admin/AdminLayout";
import { Edit, Delete } from "@mui/icons-material";

const defaultForm = {
  patientId: "",
  title: "",
  description: "",
  comments: "",
  appointmentDate: "",
  cost: "",
  status: "",
  nextDate: "",
  files: [],
};

const Incidents = () => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const existingPatients = JSON.parse(localStorage.getItem("patients")) || [];
    if (existingPatients.length === 0) {
      const mockPatients = [
        {
          id: "p1",
          name: "John Doe",
          dob: "1990-05-10",
          contact: "1234567890",
          healthInfo: "No allergies",
        },
        {
          id: "p2",
          name: "Jane Smith",
          dob: "1985-08-22",
          contact: "9876543210",
          healthInfo: "Diabetic",
        },
      ];
      localStorage.setItem("patients", JSON.stringify(mockPatients));
      setPatients(mockPatients);
    } else {
      setPatients(existingPatients);
    }

    const i = JSON.parse(localStorage.getItem("incidents")) || [];
    setIncidents(i);
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem("incidents", JSON.stringify(updated));
    setIncidents(updated);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then((result) => {
      setForm((prev) => ({ ...prev, files: result }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const updated = incidents.map((i) => (i.id === editId ? { ...i, ...form } : i));
      saveToStorage(updated);
    } else {
      const newIncident = { ...form, id: uuidv4() };
      saveToStorage([...incidents, newIncident]);
    }
    setForm(defaultForm);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const i = incidents.find((inc) => inc.id === id);
    setForm(i);
    setEditId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this appointment?")) {
      const updated = incidents.filter((i) => i.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Appointment Management</h1>

      {patients.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-4 mb-4 rounded">
          ⚠️ No patients found. Please add patients before creating incidents.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        <select
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Comments"
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          value={form.appointmentDate}
          onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Cost"
          value={form.cost}
          onChange={(e) => setForm({ ...form, cost: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Status (Pending/Completed)"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          placeholder="Next Appointment Date"
          value={form.nextDate}
          onChange={(e) => setForm({ ...form, nextDate: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="col-span-1 sm:col-span-2 file:bg-gray-200 file:text-black file:rounded file:px-3 file:py-1"
        />

        {form.files.length > 0 && (
          <div className="col-span-1 sm:col-span-2 bg-gray-50 border rounded p-2 space-y-2">
            <p className="text-sm font-semibold text-gray-600 mb-1">Uploaded Files:</p>
            {form.files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm bg-white p-2 border rounded"
              >
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {file.name}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const updatedFiles = form.files.filter((_, i) => i !== index);
                    setForm((prev) => ({ ...prev, files: updatedFiles }));
                  }}
                  className="text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
        >
          {editId ? "Update Appointment" : "Add Appointment"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
        <ul className="space-y-4">
          {incidents.map((i) => (
            <li key={i.id} className="border p-4 rounded-lg shadow-sm hover:shadow transition text-sm bg-gray-50">
              <div className="font-bold text-blue-700 text-lg mb-1">{i.title}</div>
              <div className="text-gray-700 mb-1">{i.description}</div>
              <div className="text-gray-600">
                <strong>Patient:</strong> {patients.find((p) => p.id === i.patientId)?.name || "Unknown"}
              </div>
              <div className="text-gray-600"><strong>Status:</strong> {i.status} | <strong>Cost:</strong> ₹{i.cost}</div>
              <div className="text-gray-600"><strong>Appointment:</strong> {new Date(i.appointmentDate).toLocaleString()}</div>
              <div className="text-gray-600"><strong>Next Date:</strong> {i.nextDate}</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {i.files?.map((f, idx) => (
                  <a
                    key={idx}
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-600 text-sm"
                  >
                    {f.name}
                  </a>
                ))}
              </div>
              <div className="mt-3 flex gap-4">
                <button
                  onClick={() => handleEdit(i.id)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit fontSize="small" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(i.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <Delete fontSize="small" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Incidents;











