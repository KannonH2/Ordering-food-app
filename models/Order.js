import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 20,
    },
    comments: {
      type: String,
      maxlength: 400,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    productsDetail: {
      type: Array,
      required: true,
    },
    extraOption: {
      type: String, 
      required: true 
    },
    method: {
      type: Number,
      required:true
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);