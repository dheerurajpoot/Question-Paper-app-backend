const mongoose = require("mongoose");

let resultSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	marks: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Result", resultSchema);
