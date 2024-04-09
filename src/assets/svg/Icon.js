import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
export const AddfrIcon = ({ width = 24, height = 24, color }) => (
  <Svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
    viewBox="0 0 24 24"
  >
    <Path
      fillRule="evenodd"
      d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </Svg>
);

export const SearchIcon = ({ width = 24, height = 24, color = 'black' }) => (
  <Svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill={color}
    viewBox="0 0 24 24"
  >
    <Path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
    <Path
      fillRule="evenodd"
      d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);

export const MoreIcon = ({ width = 24, height = 24, color = 'black' }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    id="Editable-line"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <Circle
      cx={16}
      cy={16}
      fill={color}
      id="XMLID_878_"
      r={2}
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <Circle
      cx={6}
      cy={16}
      fill={color}
      id="XMLID_879_"
      r={2}
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <Circle
      cx={26}
      cy={16}
      fill={color}
      id="XMLID_880_"
      r={2}
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
    />
  </Svg>
);
export const HeartIcon = ({ width, height, color }) => (
  <Svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
    viewBox="0 0 24 24"
  >
    <Path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
  </Svg>
);
