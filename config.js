module.exports = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_DATABASE || "wesellhouse",
    connection_limit: 100,
    staticPath: './static',
    atlasURI: `mongodb://localhost:27017/test_db`
  }
  