import { Types, Schema, model } from "mongoose";

interface IWord {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  lang: string;
  spelling: string;
  pronunciation: string;
  meaning: string;
  collocation?: string[];
  association?: string;
  ex?: string;
  syn?: string[];
  ant?: string[];
  regRev?: Date[]; //정규 복습 스케쥴
  wrong: boolean;
  ltmsPoint: number;
  addedAt: Date;
}

const wordSchema = new Schema<IWord>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  lang: { type: String, required: true },
  spelling: { type: String, required: true },
  pronunciation: { type: String },
  meaning: { type: String, required: true },
  collocation: [{ type: String }],
  association: { type: String },
  ex: { type: String },
  syn: [{ type: String }],
  ant: [{ type: String }],
  regRev: [{ type: Date }],
  wrong: { type: Boolean, default: false, required: true },
  ltmsPoint: { type: Number, default: 0, required: true },
  addedAt: { type: Date, required: true },
});

const Word = model<IWord>("Word", wordSchema);
export default Word;
