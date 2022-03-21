import { Types, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface User {
  email: string;
  name: string;
  password: string;
  socialOnly: boolean;
  words?: Types.ObjectId[];
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  socialOnly: { type: Boolean, default: false, required: true },
  words: [{ type: Schema.Types.ObjectId, ref: "Word" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = model<User>("User", userSchema);
export default User;
