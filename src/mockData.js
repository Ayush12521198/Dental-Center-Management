export const seedData = () => {
  if (!localStorage.getItem("users")) {
   localStorage.setItem("users", JSON.stringify([
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
]));
    localStorage.setItem("patients", JSON.stringify([
      { id: "p1", name: "John Doe", dob: "1990-05-10", contact: "1234567890", healthInfo: "No allergies" }
    ]));

    localStorage.setItem("incidents", JSON.stringify([]));
  }
};



