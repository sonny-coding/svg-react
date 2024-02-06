import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-4 py-4 border-b sm:px-8 border-b-[#e6ebf4]">
      <Link
        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        to="/"
      >
        <p>{"svg => component"}</p>
      </Link>
      <Link
        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        to="create-component"
      >
        Create
      </Link>
    </header>
  );
};

export default Header;
