import Svg, { Path } from "react-native-svg";

type Pros = {
  width: number;
  height: number;
  color: string;
};

export const PerfilIcon = ({ color, height, width }: Pros) => {
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 190 158" fill="none">
        <Path
          d="M95.0141 80.3215C121.048 80.3215 142.152 62.341 142.152 40.1608C142.152 17.9806 121.048 0 95.0141 0C68.9803 0 47.8757 17.9806 47.8757 40.1608C47.8757 62.341 68.9803 80.3215 95.0141 80.3215Z"
          fill={color}
        />
        <Path
          d="M189.291 140.563C189.291 164.961 141.297 156.627 95.014 156.627C48.7317 156.627 0.737305 164.961 0.737305 140.563C0.737305 116.164 48.7317 96.3857 95.014 96.3857C141.297 96.3857 189.291 116.164 189.291 140.563Z"
          fill={color}
        />
      </Svg>
    </>
  );
};
