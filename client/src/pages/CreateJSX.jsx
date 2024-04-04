import Editable from "../components/Editable";
import { useState } from "react";
import PreviewSVG from "../components/PreviewSVG";
import { svgToJSX } from "../utils";
// import pretty from "pretty";

const data = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>`;

const CreateJSX = () => {
  const [input, setInput] = useState(data);
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState(false);
  const [outputName, setOutputName] = useState("Icon");

  const deleteInput = () => {
    setInput("");
  };

  return (
    <div className="grid w-full grid-cols-2 gap-2 mt-10">
      {preview && (
        <PreviewSVG
          setPreview={setPreview}
          svg={input}
          name={`${outputName}.jsx`}
        />
      )}
      {/* <input
        type="text"
        className="col-span-2 p-2 text-base font-bold text-black rounded-md outline-none bg-slate-blue placeholder-slate-600"
        placeholder="Component name..."
        value={outputName}
        onChange={(e) => {
          setOutputName(e.target.value);
        }}
      /> */}
      {/* <div className="col-span-2 rounded-md bg-slate-blue">hello</div> */}
      <Editable
        type="input"
        code={input}
        setCode={setInput}
        deleteInput={deleteInput}
      />
      <Editable
        type="output"
        name={outputName}
        setName={setOutputName}
        code={svgToJSX(input, outputName)}
        setCode={setOutput}
        setPreview={setPreview}
      />
    </div>
  );
};

export default CreateJSX;
