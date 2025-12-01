import jwt from "jsonwebtoken";

// Your JWT string
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplcm9iZWFyODUzMDAzMiIsImVtYWlsIjoiemVyb2JlYXI4NTMwMDMyQGdtYWlsLmNvbSIsInVzZXJfaWQiOiI2OTJjOTYyZWRjMWUxMmFkYmQ0YzVkNmQiLCJpYXQiOjE3NjQ1MzQ0MTUsImV4cCI6MTc2NDUzNTMxNX0.4KQaCjAkhdMTLfgjsQjz_oaK6n_VTe5O9LT-JNEIsyw";

// Decode the token without verifying the signature
const decoded = jwt.decode(token);

if (!decoded) {
  console.log("Invalid token");
} else {
  const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
  const exp = decoded.exp;
  const iat = decoded.iat;

  const remainingSeconds = exp - currentTime;

  if (remainingSeconds <= 0) {
    console.log("Token has expired");
  } else {
    console.log(`Token will expire in ${remainingSeconds} seconds (~${(remainingSeconds/60).toFixed(2)} minutes)`);
  }
}
