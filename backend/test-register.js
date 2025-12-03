require("dotenv").config();
const mongoose = require("mongoose");
const { UserModel } = require("./model/UserModel");

const URL = process.env.MONGO_URL;

async function testRegister() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(URL);
    console.log("Connected!");

    console.log("Creating user...");
    const newUser = new UserModel({
      email: "testuser@test.com",
      mobile: "1234567890",
      password: "TestPass@123",
      firstName: "Test",
      lastName: "User",
    });

    console.log("Saving user...");
    await newUser.save();
    console.log("✅ User saved successfully!");
    console.log(newUser);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

testRegister();
