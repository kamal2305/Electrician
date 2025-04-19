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
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";


const Electricians = () => {
  // const { token, user } = useContext(AuthContext);
  const { token, user } = useAuth();
  const [electricians, setElectricians] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const fetchElectricians = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/electricians", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setElectricians(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addElectrician = async () => {
    try {
      await axios.post("http://localhost:5000/api/electricians", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewUser({ name: "", email: "", password: "" });
      fetchElectricians();
    } catch (err) {
      alert("Error adding electrician: " + err.response?.data?.message);
    }
  };

  const deleteElectrician = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/electricians/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchElectricians();
    } catch (err) {
      alert("Error deleting: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") fetchElectricians();
  }, [user]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Manage Electricians
      </Typography>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextField
          label="Email"
          name="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <Button variant="contained" onClick={addElectrician}>
          Add
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {electricians.map((elec) => (
            <TableRow key={elec._id}>
              <TableCell>{elec.name}</TableCell>
              <TableCell>{elec.email}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteElectrician(elec._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Electricians;
