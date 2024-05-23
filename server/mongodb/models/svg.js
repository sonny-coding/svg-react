import mongoose from "mongoose";

const svg = new mongoose.Schema({
  data: { type: String, required: true },
  name: { type: String, required: true },
});

const svgModel = mongoose.model("svg", svg);
export default svgModel;
