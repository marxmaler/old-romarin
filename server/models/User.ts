import { Types, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface User {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  socialOnly: boolean;
  stat: {
    En: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Es: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Fr: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    De: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Jp: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Ch: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
    Ru: {
      total: number;
      once: number;
      twice: number;
      threeTimes: number;
      fourTimes: number;
    };
  };
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  socialOnly: { type: Boolean, default: false, required: true },
  stat: {
    En: {
      total: { type: Number, default: 0 },
      once: { type: Number, default: 0 },
      twice: { type: Number, default: 0 },
      threeTimes: { type: Number, default: 0 },
      fourTimes: { type: Number, default: 0 },
    },
    Es: {
      total: { type: Number, default: 0 },
      once: { type: Number, default: 0 },
      twice: { type: Number, default: 0 },
      threeTimes: { type: Number, default: 0 },
      fourTimes: { type: Number, default: 0 },
    },
    Fr: {
      total: { type: Number, default: 0 },
      once: { type: Number, default: 0 },
      twice: { type: Number, default: 0 },
      threeTimes: { type: Number, default: 0 },
      fourTimes: { type: Number, default: 0 },
    },
    De: {
      total: { type: Number, default: 0 },
      once: { type: Number, default: 0 },
      twice: { type: Number, default: 0 },
      threeTimes: { type: Number, default: 0 },
      fourTimes: { type: Number, default: 0 },
    },
    Jp: {
      total: { type: Number, default: 0 },
      once: { type: Number, default: 0 },
      twice: { type: Number, default: 0 },
      threeTimes: { type: Number, default: 0 },
      fourTimes: { type: Number, default: 0 },
    },
    Ch: {
      total: { type: Number, default: 0 },
      once: { type: Number, default: 0 },
      twice: { type: Number, default: 0 },
      threeTimes: { type: Number, default: 0 },
      fourTimes: { type: Number, default: 0 },
    },
    Ru: {
      total: { type: Number, default: 0 },
      once: { type: Number, default: 0 },
      twice: { type: Number, default: 0 },
      threeTimes: { type: Number, default: 0 },
      fourTimes: { type: Number, default: 0 },
    },
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = model<User>("User", userSchema);
export default User;
