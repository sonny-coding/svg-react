/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";
import copy from "copy-text-to-clipboard";
import { toast } from "react-hot-toast";

import SVGElement from "./SVGElement";
import { svgToObject, svgToJSX } from "../utils";

const DisplaySVG = ({ svg, name }) => {
  const svgObj = svgToObject(svg);
  const notify = () => {
    toast.success("Copied successfully.");
  };
  return (
    <div
      onClick={() => {
        copy(svgToJSX(svg, name));
        notify();
      }}
      className="w-full hover:cursor-pointer max-w-[200px] h-auto mt-2 bg-slate-100 text-blue hover:text-slate-blue duration-150 hover:scale-105 transition-all"
    >
      <svg {...svgObj.attributes}>
        {svgObj.elementKeys.map((key) =>
          svgObj.elements[key].map((item) => (
            <SVGElement tag={key} key={nanoid()} elementProps={item} />
          ))
        )}
      </svg>
    </div>
  );
};

export default DisplaySVG;
