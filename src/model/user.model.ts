'use strict';

import mongoose, { Schema, Document } from 'mongoose';

export interface UserDoc extends Document {
  name: string;
  hush: string;
  session: string;
  using: boolean;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hush: {
      type: String,
      trim: true,
      required: true,
    },
    session: {
      type: String,
      required: false,
      unique: true,
    },
    using: {
      type: Number,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
