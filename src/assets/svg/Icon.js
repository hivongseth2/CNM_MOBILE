import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
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

export const SearchIcon = ({ width = 24, height = 24, color="black" }) => (
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
