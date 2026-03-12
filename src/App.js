import React, { useState, useEffect } from "react";
import studentsData from "./data/studentsData";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import SearchBar from "./components/SearchBar";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1000);
  }, []);

  const addStudent = (student) => {
    student.id = students.length + 1;
    setStudents([...students, student]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s
      )
    );
    setEditingStudent(null);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const data = new Blob([buffer]);

    saveAs(data, "students.xlsx");
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: 40 }}>

      <h1>Students Management</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editingStudent={editingStudent}
      />

      <button onClick={exportExcel}>Download Excel</button>

      <StudentTable
        students={filteredStudents}
        editStudent={editStudent}
        deleteStudent={deleteStudent}
      />

    </div>
  );
}

export default App;