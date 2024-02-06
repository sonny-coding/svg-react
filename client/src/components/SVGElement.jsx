/* eslint-disable react/prop-types */
const SVGElement = ({ tag, elementProps }) => {
  const Tag = tag;
  return <Tag {...elementProps}></Tag>;
};

export default SVGElement;
