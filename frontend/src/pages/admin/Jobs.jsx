import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";

const Jobs = () => {
  // const { token } = useContext(AuthContext);
  const {token } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [electricians, setElectricians] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

  const fetchElectricians = async () => {
    const res = await axios.get("http://localhost:5000/api/electricians", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setElectricians(res.data);
  };

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(res.data);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/jobs", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: "", description: "", assignedTo: "", dueDate: "" });
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchElectricians();
    fetchJobs();
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Assign Job</Typography>

      <Box sx={{ display: "flex", gap: 2, my: 2, flexWrap: "wrap" }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <TextField
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <TextField
          label="Due Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <TextField
          label="Assign To"
          select
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          {electricians.map((e) => (
            <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleSubmit}>Assign</Button>
      </Box>

      <Typography variant="h6" mt={4}>Job List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.assignedTo?.name}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{new Date(job.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(job._id)} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Jobs;
