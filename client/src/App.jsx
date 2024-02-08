/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { parseSync } from "svgson";
// import { recursiveToCamel, groupBy } from "./utils";
// import SVGElement from "./components/SVGElement";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateComponent from "./pages/CreateComponent";

/*
Things I haved learned:
how to dynamically render html tag in React
how to group by hash
how to recursively convert an object fields from snake case to camelCase
  */

const App = () => {
  // const data = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 192L256.13 320l-47.95-48M191.95 320L144 272M305.71 192l-51.55 59"/></svg>`;

  // function svgToComponent(svg) {
  //   function categoryHash(item) {
  //     return item.name; // hash based on name property
  //   }

  //   const data = parseSync(svg);
  //   const { attributes, children } = data;
  //   const elements = groupBy(children, categoryHash);
  //   const svgObject = recursiveToCamel({ attributes, elements });
  //   svgObject.elementKeys = Object.keys(elements);
  //   svgObject.attributes.className = svgObject.attributes.class;
  //   delete svgObject.attributes.class;
  //   return svgObject;
  // }

  // const svg = svgToComponent(data);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-component" element={<CreateComponent />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

/* 
<div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center w-[40px] h-[40px]">
        <svg {...svg.attributes}>
          {svg.elementKeys.map((key) =>
            svg.elements[key].map((item) => (
              <SVGElement tag={key} key={nanoid()} elementProps={item} />
            ))
          )}
        </svg>
      </div>
    </div>
*/
