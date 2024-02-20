/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useRef, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useEditable } from "use-editable";
// import Open from "./svg/Open";
import Copy from "./svg/Copy";
import Delete from "./svg/Delete";
import { Eye, Folder } from "lucide-react";

const Editable = ({ type, code, setCode, setPreview }) => {
  const editorRef = useRef(null);
  // const [code, setCode] = useState(
  //   `<svg xmlns="http://www.w3.org/2000/sv
  //   g" class="ionicon" viewBox="0 0 512 512"><path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>`
  // );

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
        <p className="mr-auto font-bold capitalize group-hover:text-white">
          {type}
        </p>
        {type === "input" && (
          <div className="flex items-center justify-center w-5 hover:cursor-pointer hover:text-white">
            {<Folder />}
          </div>
        )}
        {type === "output" && (
          <div
            className="flex items-center justify-center w-5 hover:cursor-pointer hover:text-white"
            onClick={() => {
              setPreview(true);
            }}
          >
            {<Eye />}
          </div>
        )}

        <div className="flex items-center justify-center w-5 hover:cursor-pointer hover:text-white">
          <Copy />
        </div>
        <div className="flex items-center justify-center w-5 hover:cursor-pointer hover:text-white">
          <Delete />
        </div>
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
