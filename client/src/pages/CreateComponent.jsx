import Editable from "../components/Editable";

// const data = `<a href="https://css.tricks.com/"></a>`;

const CreateComponent = () => {
  // const [code, setCode] = useState(data);

  return (
    <div className="grid w-full grid-cols-2 gap-2 mt-10">
      {/* <pre
        className="p-2 m-2 border-0 w-[calc(100%-2rem)] font-mono overflow-auto z-10"
        
      >
        <code>{code}</code>
      </pre> */}

      {/* <input type="text" placeholder="Icon" className="w-full p-2 rounded-md" /> */}
      <div className="rounded-md bg-slate-blue"></div>
      <input
        type="text"
        className="col-span-1 col-start-2 p-2 text-base font-bold text-black rounded-md outline-none bg-slate-blue placeholder-slate-600"
        placeholder="Component name..."
      />
      <Editable type="input" />
      <Editable type="output" />
    </div>
  );
};

export default CreateComponent;
