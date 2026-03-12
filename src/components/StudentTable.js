import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper
} from "@mui/material";

function StudentTable({ students, editStudent, deleteStudent }) {

  return (
    <Paper>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {students.map((student) => (
            <TableRow key={student.id}>

              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.age}</TableCell>

              <TableCell>

                <Button
                  variant="contained"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (window.confirm("Delete this student?"))
                      deleteStudent(student.id);
                  }}
                >
                  Delete
                </Button>

              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>
    </Paper>
  );
}

export default StudentTable;