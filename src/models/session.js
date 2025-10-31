
import { model, Schema } from "mongoose";

const sessionSchma = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValedUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('Session', sessionSchma);
