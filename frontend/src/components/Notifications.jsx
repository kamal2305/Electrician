import React, { useEffect, useState, useContext } from "react";
import {
  Badge, IconButton, Menu, MenuItem, ListItemText, Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";


const Notifications = () => {
  // const { token } = useContext(AuthContext);
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchNotifications = async () => {
    const res = await axios.get("http://localhost:5000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id) => {
    await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotifications();
  };

  return (
    <>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {notifications.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (
          notifications.map((n) => (
            <MenuItem
              key={n._id}
              onClick={() => handleMarkAsRead(n._id)}
              selected={!n.read}
            >
              <ListItemText
                primary={n.message}
                secondary={new Date(n.createdAt).toLocaleString()}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default Notifications;
