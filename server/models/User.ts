import { Types, Schema, model } from "mongoose";

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
  socialOnly: { type: Boolean, required: true },
  words: [{ type: Schema.Types.ObjectId, ref: "Word" }],
});

const User = model<User>("User", userSchema);
export default User;
