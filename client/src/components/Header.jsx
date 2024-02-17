import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mx-auto flex items-center justify-between w-full max-w-[900px] text-white py-2">
      <Link className="text-2xl font-bold uppercase rounded-md" to="/">
        Icon
        <span className="underline text-peach decoration-4 underline-offset-4">
          Smith
        </span>
      </Link>
      <Link
        className="text-lg font-medium hover:text-peach"
        to="create-component"
      >
        Create
      </Link>
    </header>
  );
};

export default Header;
