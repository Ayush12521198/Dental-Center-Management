import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AdminLayout from "../../components/admin/AdminLayout";
import { Edit, Delete } from "@mui/icons-material";

const defaultForm = {
  name: "",
  dob: "",
  contact: "",
  healthInfo: "",
};

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(saved);
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem("patients", JSON.stringify(updated));
    setPatients(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const updated = patients.map((p) =>
        p.id === editId ? { ...p, ...form } : p
      );
      saveToStorage(updated);
    } else {
      const newPatient = { ...form, id: uuidv4() };
      saveToStorage([...patients, newPatient]);
    }
    setForm(defaultForm);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const p = patients.find((pat) => pat.id === id);
    setForm(p);
    setEditId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const updated = patients.filter((p) => p.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Patient Management</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="healthInfo"
          placeholder="Health Info"
          value={form.healthInfo}
          onChange={(e) => setForm({ ...form, healthInfo: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold"
        >
          {editId ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Patients</h2>
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">DOB</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Health Info</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-2 border font-medium text-gray-800">{p.name}</td>
                <td className="p-2 border">{p.dob}</td>
                <td className="p-2 border">{p.contact}</td>
                <td className="p-2 border text-gray-700">{p.healthInfo}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="text-blue-600 hover:text-blue-800 mr-2 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Delete fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Patients;
