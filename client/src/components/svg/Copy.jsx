/* eslint-disable react/prop-types */
function Copy({ color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
    >
      <rect
        width="336"
        height="336"
        x="128"
        y="128"
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="32"
        rx="57"
        ry="57"
      ></rect>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
      ></path>
    </svg>
  );
}

export default Copy;
