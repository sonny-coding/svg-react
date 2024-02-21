/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useRef, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useEditable } from "use-editable";
import copy from "copy-text-to-clipboard";
// import Open from "./svg/Open";
import Copy from "./svg/Copy";
import Delete from "./svg/Delete";
import { Eye, Folder } from "lucide-react";

const Editable = ({ type, code, setCode, setPreview, name, deleteInput }) => {
  const editorRef = useRef(null);
  const onEditableChange = useCallback((code) => {
    setCode(code.slice(0, -1));
  }, []);

  useEditable(editorRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  return (
    <div className="flex flex-col overflow-hidden rounded-md">
      <div className="flex content-center justify-end w-full gap-4 p-2 bg-slate-blue group">
        <p className="mr-auto font-bold group-hover:text-white">
          {type === "output" ? `${name}` : "Input"}
        </p>
        {type === "input" && (
          <>
            <div className="flex items-center justify-center w-5 hover:cursor-pointer hover:text-white">
              {<Folder />}
            </div>
            <div
              className="flex items-center justify-center w-5 hover:cursor-pointer hover:text-white"
              onClick={deleteInput}
            >
              <Delete />
            </div>
          </>
        )}
        {type === "output" && (
          <>
            <div
              className="flex items-center justify-center w-5 hover:cursor-pointer hover:text-white"
              onClick={() => {
                setPreview(true);
              }}
            >
              {<Eye />}
            </div>
            <div
              className="flex items-center justify-center w-5 hover:cursor-pointer hover:text-white"
              onClick={() => {
                copy("🦄🌈");
              }}
            >
              <Copy />
            </div>
          </>
        )}
      </div>
      <div className="w-full p-2 bg-outer-space">
        <Highlight code={code} theme={themes.duotoneDark} language="jsx">
          {({ style, tokens, getTokenProps }) => (
            <pre
              spellCheck={false}
              // className={className}
              className="overflow-auto text-sm outline-none"
              style={style}
              ref={editorRef}
            >
              {tokens.map((line, i) => (
                <React.Fragment key={i}>
                  {line
                    .filter((token) => !token.empty)
                    .map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  {"\n"}
                </React.Fragment>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
      {/* <Button>Hello</Button> */}
    </div>
  );
};

export default Editable;
