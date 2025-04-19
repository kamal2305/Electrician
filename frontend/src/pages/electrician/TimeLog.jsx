import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";

const TimeLog = () => {
  // const { token } = useContext(AuthContext);
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    job: "",
    date: "",
    hoursWorked: "",
    description: "",
  });

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs/mine", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(res.data);
  };

  const fetchLogs = async () => {
    const res = await axios.get("http://localhost:5000/api/timelogs/mine", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLogs(res.data);
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/timelogs", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ job: "", date: "", hoursWorked: "", description: "" });
    fetchLogs();
  };

  useEffect(() => {
    fetchJobs();
    fetchLogs();
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Log Time</Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <TextField
          label="Job"
          select
          fullWidth
          value={form.job}
          onChange={(e) => setForm({ ...form, job: e.target.value })}
        >
          {jobs.map((j) => (
            <MenuItem key={j._id} value={j._id}>{j.title}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <TextField
          label="Hours Worked"
          type="number"
          fullWidth
          value={form.hoursWorked}
          onChange={(e) => setForm({ ...form, hoursWorked: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>

      <Typography variant="h6" gutterBottom>My Time Logs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log._id}>
              <TableCell>{log.job?.title}</TableCell>
              <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
              <TableCell>{log.hoursWorked}</TableCell>
              <TableCell>{log.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TimeLog;
