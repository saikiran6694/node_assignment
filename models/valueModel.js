import mongoose from "mongoose";

const valueSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    key: {
      type: String,
      required: [true, "Please Enter Key"],
    },
    value: {
      type: String,
      required: [true, "Please Enter the Values"],
    },
  },
  {
    timestamps: true,
  }
);

const Value = mongoose.model("Value", valueSchema);

export default Value;
