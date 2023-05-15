const jwt = require("jsonwebtoken");
const jwtSecret = "Thisisarandomstringforjwttoken12345";

const fetchUser = (req, res, next) => {
  // get the user from authToken and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, jwtSecret);
    console.log(data);
    req.user = data.user; //data.user is and object having id(same id provided by mongoDB) as one of the key

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
