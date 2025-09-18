import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/AdminModel.js"; 

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new Admin({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
}

seedAdmin();
