/* eslint-disable react/prop-types */
import { parseSync } from "svgson";
// import pretty from "pretty";
import { recursiveToCamel } from "./helpers";
// import { nanoid } from "nanoid";

const App = () => {
  const data = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M32 32v432a16 16 0 0016 16h432" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="96" y="224" width="80" height="192" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="240" y="176" width="80" height="240" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="383.64" y="112" width="80" height="304" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`;

  function svgToComponent(svg) {
    function groupBy(array, hashFn) {
      return array.reduce((groups, item) => {
        const hashValue = hashFn(item); // Apply the hash function
        // Check if the hash exists in the object
        groups[hashValue] = groups[hashValue] || [];
        groups[hashValue].push(item.attributes);
        return groups;
      }, {});
    }
    function categoryHash(item) {
      return item.name; // Simple hash based on category property
    }

    const data = parseSync(svg);
    const { attributes, children } = data;
    const elements = groupBy(children, categoryHash);

    const svgObject = recursiveToCamel({ attributes, elements });
    svgObject.attributes.className = svgObject.attributes.class;
    delete svgObject.attributes.class;

    console.log(svgObject);
    return svgObject;
  }

  const svg = svgToComponent(data);
  console.log(svg.elements.rect);

  return (
    <div className="text-2xl underline">
      <div className="flex items-center justify-center w-[300px] h-[300px] text-red-800">
        <svg {...svg.attributes}>
          {svg?.elements?.path?.map((props, index) => {
            return (
              <path key={index} {...props}>
                hello
              </path>
            );
          })}
          {svg?.elements?.rect?.map((props, index) => {
            return (
              <rect key={index} {...props}>
                hello
              </rect>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default App;
