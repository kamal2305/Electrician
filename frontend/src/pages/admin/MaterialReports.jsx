import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";

const MaterialReports = () => {
  // const { token } = useContext(AuthContext);
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);

  const fetchMaterialReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/materials", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching material reports:", error);
    }
  };

  useEffect(() => {
    fetchMaterialReports();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Material Usage Reports
      </Typography>
      <Paper elevation={3} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job</TableCell>
              <TableCell>Electrician</TableCell>
              <TableCell>Date Used</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Cost</TableCell>
              <TableCell>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell>{entry.job?.title}</TableCell>
                <TableCell>{entry.electrician?.name}</TableCell>
                <TableCell>{new Date(entry.dateUsed).toLocaleDateString()}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.quantity}</TableCell>
                <TableCell>₹{entry.unitCost}</TableCell>
                <TableCell>₹{(entry.quantity * entry.unitCost).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default MaterialReports;
