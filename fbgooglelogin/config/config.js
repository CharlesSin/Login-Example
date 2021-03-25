const dotenv = require("dotenv");

dotenv.config();

const { IP, PORT, DBNAME, DBUSER, DBPASSWORD, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FB_CLIENT_ID, FB_CLIENT_SECRET } = process.env;

module.exports = {
  IP,
  PORT,
  DBNAME,
  DBUSER,
  DBPASSWORD,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET
};
