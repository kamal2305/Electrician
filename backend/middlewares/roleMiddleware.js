// middlewares/roleMiddleware.js

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "Unauthorized: No user role found" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied: Insufficient role permissions" });
      }

      next();
    } catch (err) {
      console.error("Role check error:", err);
      res.status(500).json({ message: "Internal Server Error in role middleware" });
    }
  };
};