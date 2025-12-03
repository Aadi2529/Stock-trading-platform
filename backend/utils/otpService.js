// In-memory OTP storage (mobile → {otp, expiresAt})
let otpStore = {};
let lastOtp = null; // Store last OTP for testing

// Generate random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP with 5-minute expiry
function storeOTP(mobile) {
  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore[mobile] = { otp, expiresAt };
  lastOtp = { mobile, otp, timestamp: new Date().toLocaleString() };
  
  // Log to console for testing (mock SMS)
  console.log(`\n📱 OTP Generated for ${mobile}: ${otp}`);
  console.log(`⏱️  Valid for 5 minutes (until ${new Date(expiresAt).toLocaleTimeString()})\n`);
  
  // TODO: In production, send via Twilio or other SMS service
  // Example Twilio code:
  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // await client.messages.create({
  //   body: `Your Zerodha OTP is: ${otp}. Valid for 5 minutes.`,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: `+91${mobile}`
  // });
  
  return otp;
}

// Verify OTP
function verifyOTP(mobile, otp) {
  const stored = otpStore[mobile];
  if (!stored) {
    console.log(`❌ OTP not found for ${mobile}`);
    return false;
  }
  if (Date.now() > stored.expiresAt) {
    delete otpStore[mobile];
    console.log(`❌ OTP expired for ${mobile}`);
    return false;
  }
  if (stored.otp === otp) {
    delete otpStore[mobile]; // Clear after verification
    console.log(`✅ OTP verified for ${mobile}`);
    return true;
  }
  console.log(`❌ Invalid OTP for ${mobile}`);
  return false;
}

// Get last OTP (for testing only)
function getLastOTP() {
  return lastOtp;
}

module.exports = { storeOTP, verifyOTP, generateOTP, getLastOTP };
