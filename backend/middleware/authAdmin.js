import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const envAgentAllowedPaths = ["/api/properties/add"];

export const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.isEnvAgentAdmin) {
      const requestedPath = req.originalUrl || "";
      const canAccess = envAgentAllowedPaths.some((path) =>
        requestedPath.startsWith(path)
      );

      if (!canAccess) {
        return res.status(403).json({ message: "Agent not allowed for this action" });
      }

      req.admin = {
        _id: "env-agent-admin",
        name: process.env.AGENT_NAME || "DealDirect Agent",
        email: process.env.AGENT_EMAIL,
        role: "agent",
        isEnvAgent: true,
      };
      return next();
    }

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }
    req.admin = { ...admin.toObject(), role: "admin", isEnvAgent: false };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
