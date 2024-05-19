const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
	res.send("Server is running!");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("Database Connected Successfully");
	})
	.catch((error) => {
		console.log(error);
	});

app.listen(process.env.PORT, () => {
	console.log(`Quizz app listening on port ${process.env.PORT}`);
});
app.use("/api/v1/user", userRoute);
