const mongoose = require("mongoose");

var resultSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	marks: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Result", resultSchema);
