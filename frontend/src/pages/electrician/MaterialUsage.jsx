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

const MaterialUsage = () => {
  // const { token } = useContext(AuthContext);
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    job: "",
    name: "",
    quantity: "",
    unitCost: "",
    dateUsed: "",
  });

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs/mine", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(res.data);
  };

  const fetchMaterials = async () => {
    const res = await axios.get("http://localhost:5000/api/materials/mine", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMaterials(res.data);
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/materials", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ job: "", name: "", quantity: "", unitCost: "", dateUsed: "" });
    fetchMaterials();
  };

  useEffect(() => {
    fetchJobs();
    fetchMaterials();
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Log Material Usage</Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <TextField
          select
          label="Job"
          fullWidth
          value={form.job}
          onChange={(e) => setForm({ ...form, job: e.target.value })}
        >
          {jobs.map((j) => (
            <MenuItem key={j._id} value={j._id}>{j.title}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Material Name"
          fullWidth
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <TextField
          label="Unit Cost"
          type="number"
          fullWidth
          value={form.unitCost}
          onChange={(e) => setForm({ ...form, unitCost: e.target.value })}
        />
        <TextField
          label="Date Used"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={form.dateUsed}
          onChange={(e) => setForm({ ...form, dateUsed: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>

      <Typography variant="h6" gutterBottom>My Material Usages</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit Cost</TableCell>
            <TableCell>Total Cost</TableCell>
            <TableCell>Date Used</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materials.map((mat) => (
            <TableRow key={mat._id}>
              <TableCell>{mat.job?.title}</TableCell>
              <TableCell>{mat.name}</TableCell>
              <TableCell>{mat.quantity}</TableCell>
              <TableCell>₹{mat.unitCost}</TableCell>
              <TableCell>₹{mat.quantity * mat.unitCost}</TableCell>
              <TableCell>{new Date(mat.dateUsed).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default MaterialUsage;
