/* eslint-disable react/prop-types */
import { useState } from "react";
import SearchField from "../components/SearchField";
import { svgToObject } from "../utils";
import DisplaySVG from "../components/DisplaySVG";

const data = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M448.08 256.08c0-106-86-192-192-192s-192 86-192 192 86 192 192 192 192-85.97 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M300.81 358.29c-20.83 7.42-34.05 9.59-54.19 9.59-61.17 0-106.39-50.07-101-111.84S205 144.21 266.14 144.21c68.92 0 106.79 45.55 101.47 106.55-4 45.54-32.8 58.66-47.89 56-14.2-2.55-25.92-15.52-23.75-40.35l5.62-44.66c-7.58-9.17-28.11-18-49.93-14.54C231.77 210.3 209 228 206.56 256s14.49 50.84 39.93 50.84 47.86-18.39 50.69-50.84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="28"/></svg>`;

const Home = () => {
  const [searchString, setSearchString] = useState("");
  const svgObj = svgToObject(data);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full mt-5 bg-white">
        <SearchField
          searchString={searchString}
          setSearchString={setSearchString}
        />
      </div>
      <div className="w-full mt-5 text-lg text-slate-blue">
        {searchString ? (
          <p className="font-semibold">{searchString}</p>
        ) : (
          <p className="font-semibold">Recent</p>
        )}
        <div className="grid w-full grid-cols-6 gap-3 mt-2 text-red-300">
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
          <DisplaySVG svgObj={svgObj} />
        </div>
      </div>
    </>
  );
};

export default Home;
