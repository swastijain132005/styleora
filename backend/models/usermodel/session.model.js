import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  refreshTokenhash: { type: String, required: true },
  deviceId: { type: String, required: true },
  sessionId: { type: String, required: true },
  userAgent: { type: String, required: true },
  ipAddress: { type: String, required: true },
  expires: { type: Date, required: true },
  revoked: { type: Boolean, default: false },
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;