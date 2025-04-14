import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token; // Access custom header

    if (!token) {
      return res.json({ success: false, message: "Unauthorized - Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check admin credentials from decoded payload
    if (
      decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Unauthorized - Invalid credentials" });
    }


    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    res.json({ success: false, message: "Unauthorized - Invalid or expired token" });
  }
};

export default adminAuth;
