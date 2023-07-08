//index.js is the entry point of express app

const connectToMongoDB = require("./mongodb");
connectToMongoDB();

const express = require("express");
const app = express();
const port = 5000;

app.use(express.json()); //to access req.body

//To fix CORS issue
const cors = require("cors");
app.use(cors());

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook app listening at port http://localhost:${port}`);
});
