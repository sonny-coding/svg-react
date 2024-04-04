// eslint-disable-next-line react/prop-types
const Icon = ({ color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="ionicon"
    >
      <path
        d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      ></path>
      <circle
        cx="256"
        cy="256"
        r="80"
        fill="none"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="32"
      ></circle>
    </svg>
  );
};
export default Icon;