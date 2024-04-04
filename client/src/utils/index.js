import { parseSync } from "svgson";
const INDENT = "  ";

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

  const data = parseSync(svg);
  const { attributes, children } = data;
  const elements = groupBy(children, categoryHash);
  const svgObject = recursiveToCamel({ attributes, elements });
  svgObject.elementKeys = Object.keys(elements);
  svgObject.attributes.className = svgObject.attributes.class;
  delete svgObject.attributes.class;
  return svgObject;
};

const svgToJSX = (svg, outputName) => {
  const COLOR = "{color}";
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
        result += `${key}="${value}"\n\t\t\t\t`;
      }
      result = `<${key}\n\t\t\t\t\t${result}></${key}>`;
      elementProps.push(result.replace(`"currentColor"`, COLOR));
    });
  }

  const jsx = `const ${outputName} = ({color = "currentColor"}) => {\n${INDENT}return (\n${INDENT.repeat(
    2
  )}<svg\n${INDENT.repeat(3)}${svgProps.join("")}>\n${INDENT.repeat(
    4
  )}${elementProps.join("\n\t\t\t")}
  </svg>\n${INDENT.repeat(1)});\n};\nexport default ${outputName};`;
  return jsx;
};

export { recursiveToCamel, groupBy, svgToObject, svgToJSX };
