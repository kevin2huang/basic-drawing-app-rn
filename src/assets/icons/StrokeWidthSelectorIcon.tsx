import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width: number;
  height: number;
};

const StrokeWidthSelectorIcon = ({ width, height }: Props) => {
  const path =
    "M48 46H0V36H48V46ZM48 22H0V30H48V22ZM48 10H0V16H48V10ZM48 0H0V4H48V0Z";

  return (
    <Svg width={width} height={height} viewBox="0 0 48 46" fill="none">
      <Path d={path} fill="#313131" />
    </Svg>
  );
};

export default StrokeWidthSelectorIcon;
