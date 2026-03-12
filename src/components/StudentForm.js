import React, { useState, useEffect } from "react";
import { TextField, Button, Paper } from "@mui/material";

function StudentForm({ addStudent, updateStudent, editingStudent }) {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.email || !student.age) {
      alert("All fields are required");
      return;
    }

    if (!validateEmail(student.email)) {
      alert("Invalid email");
      return;
    }

    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setStudent({ name: "", email: "", age: "" });
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <form onSubmit={handleSubmit}>

        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={student.name}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={student.email}
          onChange={handleChange}
        />

        <TextField
          label="Age"
          name="age"
          fullWidth
          margin="normal"
          value={student.age}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          {editingStudent ? "Update Student" : "Add Student"}
        </Button>

      </form>
    </Paper>
  );
}

export default StudentForm;