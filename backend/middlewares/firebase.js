import admin from "firebase-admin";

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.project_id,
  clientEmail: process.env.client_email,
  privateKey: process.env.private_key.replace(/\\n/g, "\n"),
    }),
  });

  console.log("✅ Firebase Admin initialized");
}

// Middleware to verify Firebase token
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err);

    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};