import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mx-auto flex items-center justify-between w-full max-w-[900px] p-2 border-b-[1px] text-blue duration-150 ">
      <Link
        className="text-2xl font-semibold rounded-md hover:text-slate-blue"
        to="/"
      >
        SVG2JSX
      </Link>
      <Link
        className="text-lg font-semibold hover:text-slate-blue"
        to="create-jsx"
      >
        Create
      </Link>
    </header>
  );
};

export default Header;
