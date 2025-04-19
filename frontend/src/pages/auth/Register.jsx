import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "electrician" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      console.log("Success:", res.data);
      alert("Registration successful!");
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" name="name" label="Name" onChange={handleChange} />
        <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} />
        <TextField fullWidth margin="normal" name="password" label="Password" type="password" onChange={handleChange} />
        <Button variant="contained" color="primary" type="submit">Register</Button>
      </form>
    </Container>
  );
};

export default Register;
