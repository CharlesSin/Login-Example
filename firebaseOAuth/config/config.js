const dotenv = require("dotenv");

dotenv.config();

const {
  IP,
  PORT,
  DBNAME,
  DBUSER,
  DBPASSWORD,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_cLIENT_SECRET,
} = process.env;

module.exports = {
  IP,
  PORT,
  DBNAME,
  DBUSER,
  DBPASSWORD,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_cLIENT_SECRET,
};
