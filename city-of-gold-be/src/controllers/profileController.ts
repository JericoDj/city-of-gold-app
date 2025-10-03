import { Request, Response } from "express";
import { db } from "../db";


export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const [rows]: any = await db.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [userId]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { email, username } = req.body;

  try {
    // Update user profile
    await db.query(
      "UPDATE users SET username=?, email=?, updated_at=NOW() WHERE id=?",
      [username, email, userId]
    );

    // Insert audit log
    await db.query(
      "INSERT INTO audit_logs (user_id, action, timestamp) VALUES (?, ?, NOW())",
      [userId, "PROFILE_UPDATED"]
    );

    res.json({
      id: userId,
      email: email,
      username: username,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error("❌ Profile update error:", err);
    res.status(500).json({
      id: userId,
      error: "Failed to update profile",
      details: err instanceof Error ? err.message : err,
    });
  }
};
