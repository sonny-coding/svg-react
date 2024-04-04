/* eslint-disable react/prop-types */
import SVGElement from "./SVGElement";
import { nanoid } from "nanoid";
import copy from "copy-text-to-clipboard";

const DisplaySVG = ({ svgObj }) => {
  return (
    <div
      onClick={() => {
        copy("🦄🌈");
      }}
      className="w-full hover:cursor-pointer max-w-[200px] h-auto mt-2 bg-slate-100 text-blue hover:text-slate-blue duration-150"
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
