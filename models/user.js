import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		profilePicture: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const User = mongoose.model.User || mongoose.model("User", userSchema);

module.exports = User;
