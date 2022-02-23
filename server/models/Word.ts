import { Types, Schema, model } from "mongoose";

interface Word {
  user: Types.ObjectId;
  spelling: string;
  meaning: string;
  regRev?: Date[]; //정규 복습 스케쥴
  wrong: boolean;
  syn?: string[];
  ant?: string[];
}

const wordSchema = new Schema<Word>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  spelling: { type: String, required: true },
  meaning: { type: String, required: true },
  regRev: [{ type: Date }],
  wrong: { type: Boolean, required: true },
  syn: [{ type: String }],
  ant: [{ type: String }],
});

const Word = model<Word>("Word", wordSchema);
export default Word;
