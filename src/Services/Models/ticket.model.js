
import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  cart: 
    {
      _id: { type: Schema.Types.ObjectId, ref: "cart" },
      quantity: { type: Schema.Types.ObjectId, ref: "cart" },
    },
  amount: Number,
  purchaser: String,
  purchase_datetime: String,
});

const ticketModel = model("ticket", ticketSchema)

export { ticketModel }