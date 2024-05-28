import toast from "react-hot-toast";

import Editable from "../components/Editable";
import { useState } from "react";
import PreviewSVG from "../components/PreviewSVG";
import { svgToJSX } from "../utils";

// import pretty from "pretty";

const data = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>`;

const CreateJSX = () => {
  const notify = () => toast.success("Saved successfully.");

  const [input, setInput] = useState(data);
  const [preview, setPreview] = useState(false);
  const [outputName, setOutputName] = useState("Icon");
  const [saving, isSaving] = useState(false);

  const deleteInput = () => {
    setInput("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      isSaving(true);
      const response = await fetch("http://localhost:3000/api/v1/svg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: input,
          name: outputName,
        }),
      });

      await response.json();
      notify();
    } catch (error) {
      console.log(error);
    } finally {
      isSaving(false);
    }
  };

  const output = svgToJSX(input, outputName);
  const isDiabled = output === "// Invalid Input";

  return (
    <>
      <div className="w-full">
        <form
          action=""
          className="text-lg font-semibold text-slate-blue"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full p-2 border-none shadow-sm outline-none bg-slate-50"
            placeholder="Icon Name..."
            // ref={inputRef}
            // onClick={() => {
            //   if (inputRef.current) {
            //     inputRef.current.focus();
            //   }
            // }}
            value={outputName}
            onChange={(e) => {
              setOutputName(e.target.value);
            }}
            autoFocus
          />
          <button
            type="submit"
            className="px-2 py-1 mt-4 text-white rounded-md bg-slate-blue hover:text-white disabled:opacity-50 hover:cursor-pointer"
            disabled={isDiabled}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
        <div className="grid w-full grid-cols-1 gap-2 mt-10 md:grid-cols-2">
          {preview && !isDiabled && (
            <PreviewSVG
              setPreview={setPreview}
              svg={input}
              name={`${outputName}.jsx`}
            />
          )}

          <Editable
            type="input"
            code={input}
            setCode={setInput}
            deleteInput={deleteInput}
          />
          <Editable
            type="output"
            name={outputName}
            isDiabled={isDiabled}
            code={output}
            setPreview={setPreview}
          />
        </div>
      </div>
    </>
  );
};

export default CreateJSX;
