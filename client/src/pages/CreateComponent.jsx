// import Editor from "@monaco-editor/react";
import { useState } from "react";
const data = `<a href="https://css.tricks.com/"></a>`;

const CreateComponent = () => {
  const [code, setCode] = useState(data);
  const handleChange = (event) => {
    let newCode = event.target.value;
    if (newCode[newCode.length - 1] == "\n") {
      // If the last character is a newline character
      newCode += " "; // Add a placeholder space character to the final line
    }
    newCode
      .replace(new RegExp("&", "g"), "&")
      .replace(new RegExp("<", "g"), "<");
    setCode(newCode);
  };
  const handleTab = () => {};
  return (
    <div className="relative flex flex-row">
      <textarea
        className=" p-2 m-2 outline-none border-0 w-[calc(100%-2rem)] text-[15px] leading-[20px] font-mono overflow-auto resize-none z-20 bg-transparent text-black caret-slate-500"
        name=""
        id=""
        // cols="30"
        // rows="10"
        value={code}
        onChange={handleChange}
        spellCheck={false}
        onKeyDown={handleTab}
      ></textarea>
      <pre
        className=" p-2 m-2 border-0 w-[calc(100%-2rem)] text-[15px] leading-[20px] font-mono overflow-auto z-10"
        aria-hidden={true}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CreateComponent;
