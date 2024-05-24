/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useRef, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";
import toast from "react-hot-toast";

import { useEditable } from "use-editable";
import copy from "copy-text-to-clipboard";
import Copy from "./svg/Copy";
import Delete from "./svg/Delete";
import Eye from "./svg/Eye";

const Editable = ({
  type,
  code,
  setCode,
  setPreview,
  deleteInput,
  isDisabled,
}) => {
  const editorRef = useRef(null);
  const onEditableChange = useCallback((code) => {
    setCode(code.slice(0, -1));
  }, []);

  const handleClick = () => {
    editorRef.current.focus();
  };

  useEditable(editorRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  return (
    <div className="flex flex-col w-full overflow-hidden rounded-md">
      <div className="flex content-center justify-end w-full gap-4 p-2 bg-slate-blue group">
        {type === "input" && (
          <>
            <div
              className="flex items-center justify-center w-7 hover:cursor-pointer hover:text-white"
              onClick={() => {
                deleteInput();
                toast.success("Input cleared");
              }}
            >
              <Delete />
            </div>
          </>
        )}
        {type === "output" && (
          <>
            <button
              className={`flex items-center justify-center w-7 hover:cursor-pointer hover:text-white disabled:text-sky-500`}
              onClick={() => {
                setPreview(true);
              }}
              disabled={isDisabled}
            >
              {<Eye />}
            </button>
            <div
              className="flex items-center justify-center w-7 hover:cursor-pointer hover:text-white"
              onClick={() => {
                copy(code);
                toast.success("Successfully copied.");
              }}
            >
              <Copy />
            </div>
          </>
        )}
      </div>
      <div
        className="w-full p-2 bg-outer-space min-h-[400px] hover:cursor-text"
        onClick={handleClick}
      >
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
    </div>
  );
};

export default Editable;
