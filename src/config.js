module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL: process.env.DB_URL || "postgresql://dannyshi@localhost/jobseek",
  CLIENT_ORIGIN:
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000`
      : process.env.CLIENT_ORIGIN,
};
