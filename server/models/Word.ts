import { Schema, model } from "mongoose";
import { IWord } from "../interfaces/interfaces";

const wordSchema = new Schema<IWord>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  language: { type: String, required: true },
  spelling: { type: String, required: true },
  pronunciation: { type: String, default: "" },
  meaning: { type: String, required: true },
  collocation: [{ type: String, default: [] }],
  association: { type: String, default: "" },
  ex: { type: String, default: "" },
  syn: [{ type: String, default: [] }],
  ant: [{ type: String, default: [] }],
  regRev: [{ type: Date, required: true }],
  wrong: { type: Boolean, default: false, required: true },
  ltmsPoint: { type: Number, default: 0, required: true },
  addedAt: { type: Date, required: true },
});

const Word = model<IWord>("Word", wordSchema);
export default Word;
