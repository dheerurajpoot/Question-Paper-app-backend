const Result = require("../models/resultModel");

const userResult = async (req, res) => {
	const { userId, marks } = req.body;
	try {
		const result = await Result.create({ userId, marks });
		res.status(201).json(result);
	} catch (error) {
		console.log(error);
	}
};
const getResult = async (req, res) => {
	const { id } = req.params;
	try {
		const userResult = await Result.findOne({ userId: id });
		res.status(201).json(userResult);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { userResult, getResult };
