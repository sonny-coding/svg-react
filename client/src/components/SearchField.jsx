import Search from "./svg/Search";

// eslint-disable-next-line react/prop-types
const SearchField = ({ searchString, setSearchString }) => {
  return (
    <div className="flex flex-row items-center justify-center w-full p-2 text-lg shadow-sm bg-slate-50 text-slate-blue">
      <Search />
      <input
        type="text"
        placeholder="search..."
        className="w-full p-2 border-none outline-none bg-slate-50"
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
        value={searchString}
      />
    </div>
  );
};

export default SearchField;
