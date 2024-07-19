const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const EmployeeRouter = require("./routers/EmployeeRouter");
mongoose.connect("mongodb://127.0.0.1:27017/collageDB"); //this two is user to find common errors
// {useNewUrlParser:true,useUnifiedTopology:true}
const db = mongoose.connection;

db.on("err", (err) => {
	console.log(err);
});

db.once("open", () => {
	console.log("DB Connection Established");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use("/api/employee", EmployeeRouter);
