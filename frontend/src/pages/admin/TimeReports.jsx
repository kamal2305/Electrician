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


const TimeReports = () => {
  // const { token } = useContext(AuthContext);
  const { token } = useAuth();

  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/timelogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(res.data);
    } catch (error) {
      console.error("Error fetching time logs", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Time Tracking Reports
      </Typography>
      <Paper elevation={3} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job</TableCell>
              <TableCell>Electrician</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log.job?.title}</TableCell>
                <TableCell>{log.electrician?.name}</TableCell>
                <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                <TableCell>{log.hoursWorked}</TableCell>
                <TableCell>{log.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default TimeReports;
