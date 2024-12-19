import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name es requerido"],
		},
		email: {
			type: String,
			required: [true, "Email es requerido"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password es requerido"],
			minlength: [6, "Password debe tener al menos 6 caracteres"],
		},
		task:[{
    type: mongoose.Schema.ObjectId,
    ref: "Task",
	require:true,
  },],
		lastLogin: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
