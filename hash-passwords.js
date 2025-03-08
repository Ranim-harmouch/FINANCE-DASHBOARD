const bcrypt = require("bcrypt");

const plainPasswords = ["password123", "password456"];

plainPasswords.forEach(async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed password for ${password}:`, hashedPassword);
});
