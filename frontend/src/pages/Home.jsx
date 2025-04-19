import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";
import { Button, Typography, Container } from "@mui/material";

const Home = () => {
  // const { user, logout } = useContext(AuthContext);
  const { user, logout } = useAuth();
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
      <Typography variant="body1">Role: {user?.role}</Typography>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Container>
  );
};

export default Home;