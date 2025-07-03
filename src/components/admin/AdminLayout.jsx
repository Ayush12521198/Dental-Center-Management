import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/patients", label: "Patients" },
    { to: "/admin/incidents", label: "Appointments" },
    { to: "/admin/calendar", label: "Calendar" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="hidden md:block w-64 bg-white shadow-md fixed h-full z-10">
        <div className="p-4 font-bold text-xl text-blue-600 border-b">Dental Admin</div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? "bg-blue-200 font-semibold" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-600 px-4 py-2 mt-4 hover:bg-red-100 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded shadow"
      >
        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar Drawer on small screens */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-20 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 font-bold text-xl text-blue-600 border-b">Dental Admin</div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? "bg-blue-200 font-semibold" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            className="w-full text-left text-red-600 px-4 py-2 mt-4 hover:bg-red-100 rounded"
          >
            Logout
          </button>
        </nav>
      </div>
      <main className="flex-1 md:ml-64 p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
