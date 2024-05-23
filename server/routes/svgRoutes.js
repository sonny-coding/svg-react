import express from "express";
import * as dotenv from "dotenv";
import svgModel from "../mongodb/models/svg.js";

dotenv.config();
const router = express.Router();

// get all svgs
router.route("/").get(async (_, res) => {
  try {
    const svgs = await svgModel.find({});
    res.status(200).json({ success: true, data: svgs });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error });
  }
});

// create an svg
router.route("/").post(async (req, res) => {
  try {
    const { data, name } = req.body;
    console.log("🚀 ~ router.route ~ name:", name);
    console.log("🚀 ~ router.route ~ data:", data);

    const newSvg = await svgModel.create({
      data,
      name,
    });
    console.log(newSvg);

    res.status(200).json({ success: true, data: newSvg });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to save the svg, please try again",
    });
  }
});

export default router;
