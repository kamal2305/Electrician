import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  MenuItem,
  Select,
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
const InvoiceManagement = () => {
  // const { token } = useContext(AuthContext);
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [electricians, setElectricians] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedElectrician, setSelectedElectrician] = useState("");
  const [invoices, setInvoices] = useState([]);

  const fetchJobsAndElectricians = async () => {
    const jobRes = await axios.get("http://localhost:5000/api/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userRes = await axios.get("http://localhost:5000/api/users/electricians", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(jobRes.data);
    setElectricians(userRes.data);
  };

  const fetchInvoices = async () => {
    const res = await axios.get("http://localhost:5000/api/invoices", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setInvoices(res.data);
  };

  const handleGenerateInvoice = async () => {
    await axios.post(
      "http://localhost:5000/api/invoices",
      { jobId: selectedJob, electricianId: selectedElectrician },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSelectedJob("");
    setSelectedElectrician("");
    fetchInvoices();
  };

  useEffect(() => {
    fetchJobsAndElectricians();
    fetchInvoices();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Invoice Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, my: 3 }}>
        <Select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Select Job</MenuItem>
          {jobs.map((j) => (
            <MenuItem key={j._id} value={j._id}>{j.title}</MenuItem>
          ))}
        </Select>

        <Select
          value={selectedElectrician}
          onChange={(e) => setSelectedElectrician(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Select Electrician</MenuItem>
          {electricians.map((e) => (
            <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
          ))}
        </Select>

        <Button variant="contained" onClick={handleGenerateInvoice}>
          Generate Invoice
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>All Invoices</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job</TableCell>
            <TableCell>Electrician</TableCell>
            <TableCell>Labor Cost</TableCell>
            <TableCell>Material Cost</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv._id}>
              <TableCell>{inv.job?.title}</TableCell>
              <TableCell>{inv.electrician?.name}</TableCell>
              <TableCell>₹{inv.totalLaborCost}</TableCell>
              <TableCell>₹{inv.totalMaterialCost}</TableCell>
              <TableCell><strong>₹{inv.totalAmount}</strong></TableCell>
              <TableCell>{new Date(inv.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default InvoiceManagement;
