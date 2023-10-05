const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://bharat:6i7pGJwI9JI2rfzx@cluster0.kumjka8.mongodb.net/course-selling-website",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "course-selling-website",
  }
);

app.listen(3000, () => console.log("Server running on port 3000"));
