import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";

const MyJobs = () => {
  // const { token } = useContext(AuthContext);
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs/mine", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/jobs/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>My Jobs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{new Date(job.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Select
                  value={job.status}
                  onChange={(e) => updateStatus(job._id, e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default MyJobs;
