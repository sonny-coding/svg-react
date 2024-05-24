import { parseSync } from "svgson";
// import jsdom from "jsdom";
const INDENT = "  ";

// const removeElement = (element, svgString) => {
//   const { JSDOM } = jsdom;
//   console.log("🚀 ~ removeElement ~ svgString:", svgString);
//   const dom = new JSDOM(svgString);
//   const gElement = dom.window.document.querySelector(element);
//   if (!gElement) {
//     return svgString;
//   } else {
//     const parentElement = gElement.parentNode;

//     while (gElement.firstChild) {
//       // pass down attributes
//       // append the grandhild element to grandparent element
//       for (const attr of gElement.attributes) {
//         const value = attr.value;
//         if (attr.namespaceURI) {
//           gElement.firstChild.setAttributeNS(
//             attr.namespaceURI,
//             attr.name,
//             value
//           );
//         } else {
//           gElement.firstChild.setAttribute(attr.name, value);
//         }
//       }
//       parentElement.appendChild(gElement.firstChild);
//       // remove the the grandchild
//       gElement.firstChild.remove();
//     }
//     gElement.remove();
//     return dom.window.document.body.innerHTML.replace(/&nbsp;/g, " ");
//   }
// };

// this function recursively change the key in an obj from snake to camel case
const recursiveToCamel = (item) => {
  if (Array.isArray(item)) {
    return item.map((el) => recursiveToCamel(el));
  } else if (typeof item === "function" || item !== Object(item)) {
    return item;
  }
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, "")),
      recursiveToCamel(value),
    ])
  );
};

const groupBy = (array, hashFn) => {
  return array.reduce((groups, item) => {
    const hashValue = hashFn(item); // Apply the hash function
    // Check if the hash exists in the object
    groups[hashValue] = groups[hashValue] || [];
    groups[hashValue].push(item.attributes);
    return groups;
  }, {});
};

const svgToObject = (svg) => {
  const categoryHash = (item) => {
    return item.name; // hash based on name property
  };
  // remove the g element
  // const modifiedSVG = removeElement("g", svg);

  const data = parseSync(svg);
  const { attributes, children } = data;
  const elements = groupBy(children, categoryHash);
  const svgObject = recursiveToCamel({ attributes, elements });
  svgObject.elementKeys = Object.keys(elements);
  delete svgObject.attributes.class;
  delete svgObject.attributes.width;
  delete svgObject.attributes.height;
  delete svgObject.attributes.version;
  delete svgObject.attributes.id;
  delete svgObject.attributes.style;
  delete svgObject.attributes.x;
  delete svgObject.attributes.y;
  delete svgObject.attributes["xmlns:xlink"];
  delete svgObject.attributes["xml:space"];

  return svgObject;
};

const svgToJSX = (svg, outputName) => {
  try {
    const name = outputName || "Icon";
    const COLOR = "{color}";
    // const modifiedSVG = removeElement("g", svg) = removeElement("g", svg);
    const svgObj = svgToObject(svg);
    console.log("🚀 ~ svgToJSX ~ svgObj:", svgObj);

    const svgProps = Object.entries(svgObj.attributes).map(([key, value]) => {
      return `${key}="${value}"\n\t\t\t`;
    });

    let elementProps = [];
    for (const key in svgObj.elements) {
      const elements = svgObj.elements[key];
      console.log("🚀 ~ svgToJSX ~ elements:", elements);

      elements.forEach((element) => {
        let result = "";
        for (const [key, value] of Object.entries(element)) {
          result += `${key}="${value}"\n${INDENT.repeat(5)}`;
        }
        result = `<${key}\n${INDENT.repeat(5)}${result}></${key}>`;
        elementProps.push(result.replace(`"currentColor"`, COLOR));
      });
    }

    const jsx = `const ${name} = ({color = "currentColor"}) => {\n${INDENT}return (\n${INDENT.repeat(
      2
    )}<svg\n${INDENT.repeat(3)}${svgProps.join("")}>\n${INDENT.repeat(
      4
    )}${elementProps.join("\n\t\t\t\t")}
  </svg>\n${INDENT.repeat(1)});\n};\nexport default ${name};`;
    return jsx;
  } catch (error) {
    return "// Invalid Input";
  }
};

export { recursiveToCamel, groupBy, svgToObject, svgToJSX };
