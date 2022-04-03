/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { FC } from "react";
import { v4 } from "uuid";

type Props = {
  width?: string;
  height?: string;
  onClick?: () => void;
};

const Adi: FC<Props> = ({
  width = "100%",
  height = undefined,
  onClick = () => {},
  ...rest
}) => {
  const uuid = v4();

  const linearGradientId = `linearGradient5164-${uuid}`;
  const radialGradientId = `radialGradient6155-${uuid}`;

  return (
    <svg
      {...rest}
      style={{
        display: "block",
      }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      version="1.1"
      viewBox="0 0 245.61 239.03"
      onClick={onClick}
    >
      <defs>
        <linearGradient id={linearGradientId}>
          <stop offset="0" stopColor="#a0346c"></stop>
          <stop offset="1" stopColor="#f9f9f9" stopOpacity="0"></stop>
        </linearGradient>
        <radialGradient
          id={radialGradientId}
          cx="286.13"
          cy="226.38"
          r="37.307"
          gradientTransform="matrix(-.86493 4.60794 -1.69903 -.31892 918.23 -1006.59)"
          gradientUnits="userSpaceOnUse"
          xlinkHref={`#${linearGradientId}`}
        ></radialGradient>
      </defs>
      <g transform="translate(-209.08 -258.558)">
        <g transform="translate(0 118)">
          <path
            fill="#000"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1"
            d="M389.23 165.1s13.571-5.714 22.857 0 32.857 32.143 36.429 48.571c3.571 16.429 8.571 31.429 3.571 39.286-5 7.857-10 10-10 10l-2.143-25-9.285-27.857-20.714-27.857L389.23 165.1z"
          ></path>
          <path
            fill="#f9f9f9"
            stroke="#000"
            strokeDasharray="none"
            strokeMiterlimit="4"
            strokeOpacity="0.962"
            strokeWidth="4"
            d="M443.208 261.92c0 63.88-51.784 115.66-115.66 115.66-63.88 0-115.66-51.783-115.66-115.66 0-63.878 51.784-115.66 115.66-115.66 63.879 0 115.66 51.785 115.66 115.66z"
          ></path>
          <path
            fill="#000"
            d="M309.11 306.77H362.14300000000003V326.46799999999996H309.11z"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
            strokeWidth="1.742"
            d="M294.83 331.32c46.571-6.228 80.537 0 80.537 0"
          ></path>
          <g>
            <path
              fill={`url(#${radialGradientId})`}
              d="M323.04 239.9c1.488-1.33.514 47.233-37.045 47.802-37.639.57-37.674-47.695-37.045-47.802 47.894-.443 32.365-.147 74.091 0z"
            ></path>
            <path
              fill="#f9f9f9"
              stroke="#000"
              strokeDasharray="none"
              strokeMiterlimit="4"
              strokeWidth="2"
              d="M319.21 240.7c1.36-.941.47 33.437-33.84 33.84-34.382.404-34.415-33.764-33.84-33.84 43.75-.314 29.564-.104 67.68 0z"
            ></path>
            <path
              fill="#000"
              d="M289.91 249.29c0 3.905-3.392 7.071-7.576 7.071-4.184 0-7.576-3.166-7.576-7.071s3.392-7.071 7.576-7.071 7.576 3.166 7.576 7.071z"
              transform="translate(5.05 -2.02)"
            ></path>
          </g>
          <g transform="translate(95.712 -.253)">
            <path
              fill={`url(#${radialGradientId})`}
              d="M323.04 239.9c1.488-1.33.514 47.233-37.045 47.802-37.639.57-37.674-47.695-37.045-47.802 47.894-.443 32.365-.147 74.091 0z"
            ></path>
            <path
              fill="#f9f9f9"
              stroke="#000"
              strokeDasharray="none"
              strokeMiterlimit="4"
              strokeWidth="2"
              d="M319.21 240.7c1.36-.941.47 33.437-33.84 33.84-34.382.404-34.415-33.764-33.84-33.84 43.75-.314 29.564-.104 67.68 0z"
            ></path>
            <path
              fill="#000"
              d="M289.91 249.29c0 3.905-3.392 7.071-7.576 7.071-4.184 0-7.576-3.166-7.576-7.071s3.392-7.071 7.576-7.071 7.576 3.166 7.576 7.071z"
              transform="translate(5.05 -2.02)"
            ></path>
          </g>
          <path
            fill="#000"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1.03"
            d="M392.93 159.89s-46.945 62.161-176.47 134.83c-.9.505-.986.063-.986.063-1.862-1.633-6.376-11.307-5.838-39.011.381-10.855.84-58.97 37.775-88.145 34.326-27.114 130.45-39.428 145.52-7.741z"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
            strokeWidth="8"
            d="M346.72 241.39l74.632-5.05"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
            strokeWidth="6.5"
            d="M251.88 239.8l68.571 2.525"
          ></path>
          <path
            fill="#000"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1"
            d="M390.93 165.95c-6.437 18.841-40.112 48.376-72.926 73.693-34.47 26.595-67.99 48.535-67.99 48.535 48.992-36.871 113.14-108.59 113.14-108.59s32.956-28.789 27.779-13.637z"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
            strokeWidth="2"
            d="M321.77 335.48c15.787-3.384 27.301 0 27.301 0"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default Adi;
