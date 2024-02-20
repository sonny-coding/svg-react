/* eslint-disable react/prop-types */
import { Close } from "./svg/Close";
import { nanoid } from "nanoid";
import { svgToComponent } from "../utils";
import SVGElement from "./SVGElement";

// eslint-disable-next-line react/prop-types
const Preview = ({ svg, setPreview }) => {
  const svgObj = svgToComponent(svg);
  console.log(svgObj);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/30 backdrop-blur-md">
      <div className="mt-[100px] mx-auto w-full max-w-[300px] h-auto bg-white rounded-md flex flex-col items-center p-2">
        <div className="flex flex-row items-center justify-between w-full">
          <p>Icon</p>
          <div
            className="w-10 hover:cursor-pointer"
            onClick={() => {
              setPreview(false);
            }}
          >
            <Close />
          </div>
        </div>
        <div className="w-full h-auto mt-2 bg-slate-200">
          <svg {...svgObj.attributes}>
            {svgObj.elementKeys.map((key) =>
              svgObj.elements[key].map((item) => (
                <SVGElement tag={key} key={nanoid()} elementProps={item} />
              ))
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Preview;
