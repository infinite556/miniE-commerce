const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: [3, "name must be at least 3 characters"],
      maxlength: [30, "name must be at most 30 characters"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "email must be valid. Ex: user@email.com",
      ],
    },

    age: {
      type: Number,
      min: [0, "age cannot be negative"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password must be at least 8 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-])[A-Za-z\d@$!%*?&#_\-]{8,}$/,
        "password must be strong. Example: User@123",
      ],
    },
    confirmpassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    if (this.password !== this.confirmpassword) {
      throw new Error("password and confirmpassword not same");
    }
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = undefined;
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
