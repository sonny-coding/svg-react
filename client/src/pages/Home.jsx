/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import SearchField from "../components/SearchField";
import DisplaySVG from "../components/DisplaySVG";

// fix the g element

const Home = () => {
  const [searchString, setSearchString] = useState("");
  const [allSVGs, setAllSVGs] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/svg", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setAllSVGs(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchPosts();
  }, []);

  const AllSVGs = ({ data, searchString }) => {
    const filterSVGS = data.filter((svg) => {
      return svg.name.toLowerCase().includes(searchString.toLowerCase());
    });

    if (filterSVGS?.length > 0) {
      return filterSVGS.map((svg) => (
        <DisplaySVG key={svg._id} name={svg.name} svg={svg.data} />
      ));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full mt-5 bg-white">
        <SearchField
          searchString={searchString}
          setSearchString={setSearchString}
          allSVGS={allSVGs}
          setAllSVGs={setAllSVGs}
        />
      </div>
      <div className="w-full mt-5 text-lg text-slate-blue">
        {searchString ? (
          <p className="font-semibold">{searchString}</p>
        ) : (
          <p className="font-semibold">Recently Added</p>
        )}
        <div className="grid w-full grid-cols-6 gap-3 mt-2">
          <AllSVGs searchString={searchString} data={allSVGs} />
        </div>
      </div>
    </>
  );
};

export default Home;
