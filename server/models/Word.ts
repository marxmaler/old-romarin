import { Schema, model } from "mongoose";
import { IWord } from "../interfaces/interfaces";

const wordSchema = new Schema<IWord>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  language: { type: String, required: true },
  spelling: { type: String, required: true },
  pronunciation: { type: String, required: true, default: "" },
  meaning: { type: String, required: true },
  collocation: [{ type: String, required: true, default: [] }],
  association: { type: String, required: true, default: "" },
  ex: { type: String, required: true, default: "" },
  syn: [{ type: String, required: true, default: [] }],
  ant: [{ type: String, required: true, default: [] }],
  regRev: [{ type: Date, required: true }],
  wrong: { type: Boolean, default: false, required: true },
  ltmsPoint: { type: Number, default: 0, required: true },
  addedAt: { type: Date, required: true },
});

const Word = model<IWord>("Word", wordSchema);
export default Word;
