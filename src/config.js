module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://dannyshi@localhost/jobseek",
  CLIENT_ORIGIN:
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000`
      : process.env.CLIENT_ORIGIN,
};
