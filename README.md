# 🦷 Dental Center Management App

A responsive web application for managing patients, appointments, and calendars in a dental clinic. Built using **React**, **Tailwind CSS**, and **localStorage** for persistence.

---

## 🚀 Live Demo
👉 [View Deployed App](https://your-deployed-link.vercel.app)

## 📁 Repository
👉 [GitHub Repo](https://github.com/your-username/dental-center-management)

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **State Management:** React Context API
- **Icons:** Material UI
- **Routing:** React Router DOM
- **Persistence:** Browser `localStorage`

---

## ✨ Features

### 🛡️ Authentication
- Login system for **Admin** and **Patient**
- Mock users stored in localStorage

### 📋 Admin Panel
- Dashboard with statistics: Revenue, Appointments, Patients
- Patient management: Add / Edit / Delete
- Appointment management: Book treatments, upload files
- Monthly & Weekly Calendar View

### 🧑‍⚕️ Patient Panel
- See profile, contact info, health info
- View upcoming appointments
- View treatment history and download uploaded files

### 💻 Responsive Design
- Sidebar collapses on mobile
- Optimized for all screen sizes

---

## 📁 Project Structure
```bash
src/
├── components/
│ └── admin/
├── pages/
│ └── admin/
│ └── patient/
├── context/
│ └── AuthContext.js
├── mockData.js
└── App.jsx

---


## 🛠️ Installation

To get started with the Dental Center Management App, follow these steps:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/dental-center-management.git

2️⃣ Move into the project directory

cd dental-center-management

3️⃣ Install dependencies

You can use either npm or yarn:

npm install
# or
yarn install

4️⃣ Run the development server

npm run dev
# or
yarn dev

5️⃣ Open in browser

Visit:

http://localhost:5173

---

🔐 Mock Login Credentials
Role	Email	Password
Admin	admin@entnt.in	admin123
Patient	john@entnt.in	patient123
⚙️ Technical Decisions

    Used localStorage to mock backend (for demo purposes)

    Used AuthContext for auth state and role-based routing

    Created reusable layout and input components

    Avoided Redux or backend to keep it frontend-only

🧠 Known Issues / Limitations

    No real authentication or database

    No pagination for long lists

    Files not persisted between sessions (only base64 in localStorage)

📈 Future Enhancements

    Firebase Auth or Express.js backend

    Export reports as PDF

    Email reminders for appointments

    Filtering and search for patients & treatments
