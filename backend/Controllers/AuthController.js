const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

/* ================== SIGNUP ================== */
module.exports.Signup = async (req, res) => {
  try {
    let body = req.body || {};

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ message: "Invalid JSON format" });
      }
    }

    const { username, email, password } = body || {};
    const emailNorm = (email || "").toString().trim().toLowerCase();

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: emailNorm });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Password will be hashed by model's pre-save hook
    const user = await User.create({
      username,
      email: emailNorm,
      password,
      createdAt: new Date(),
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,      // ✅ secure
      secure: false,      // change to true in production
      sameSite: "none",
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


/* ================== LOGIN ================== */
module.exports.Login = async (req, res) => {
  try {
    let body = req.body || {};

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ message: "Invalid JSON format" });
      }
    }

    const { email, password } = body || {};
    const emailNorm = (email || "").toString().trim().toLowerCase();
    console.log('Login body:', body);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email: emailNorm });
    if (!user) {
      console.log('Login failed - user not found for', emailNorm);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log('Found user:', user.email, 'passwordHashLength:', user.password ? user.password.length : 0);

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password compare result for', emailNorm, ':', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};