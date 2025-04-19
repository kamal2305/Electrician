import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const Reports = () => {
  // const { token } = useContext(AuthContext);
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [timeLogs, setTimeLogs] = useState([]);
  const [performance, setPerformance] = useState([]);

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const [s, t, e] = await Promise.all([
      axios.get("http://localhost:5000/api/reports/dashboard", { headers }),
      axios.get("http://localhost:5000/api/reports/time-monthly", { headers }),
      axios.get("http://localhost:5000/api/reports/electrician-performance", { headers }),
    ]);

    setStats(s.data);
    setTimeLogs(t.data);
    setPerformance(e.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!stats) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Reports & Analytics</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent><Typography>Total Jobs: {stats.totalJobs}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent><Typography>Completed Jobs: {stats.completedJobs}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent><Typography>Invoices: {stats.totalInvoices}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent><Typography>Total Revenue: ₹{stats.totalRevenue}</Typography></CardContent></Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Monthly Hours Worked</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeLogs.map((d, i) => ({ month: `M${d._id}`, hours: d.totalHours }))}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Electrician Hours</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="totalHours" data={performance} nameKey="name" label>
                {performance.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
