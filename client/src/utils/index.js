import { parseSync } from "svgson";

const snakeToCamel = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );
// re regex means that any str that matches -[a to z] or _[a to z]

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

const objectToFn = (svg) => {
  const svgObj = svgToObject(svg);
  return `import React from "react"`;
};

export { snakeToCamel, recursiveToCamel, groupBy, svgToObject, objectToFn };
