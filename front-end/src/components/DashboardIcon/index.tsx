import Svg, { Path } from "react-native-svg";

type Pros = {
  width: number;
  height: number;
  color: string;
};

export const DashboardIcon = ({ color, height, width }: Pros) => {
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 194 158" fill="none">
        <Path
          d="M193.267 132.582V86.766C193.267 71.7795 193.267 64.2867 189.499 57.6635C185.729 51.0403 178.632 46.0621 164.437 36.1057L153.7 28.5745C126.542 9.52481 112.963 0 96.6336 0C80.3047 0 66.7255 9.52481 39.5671 28.5745L28.83 36.1057C14.6355 46.0621 7.53828 51.0403 3.76914 57.6635C0 64.2867 0 71.7795 0 86.766V132.582C0 140.478 0 144.425 1.63461 147.54C3.81413 151.691 7.99461 154.991 13.2563 156.71C17.2027 158 22.2056 158 32.2112 158H35.7902C42.447 158 45.7755 158 48.5062 157.423C55.9167 155.856 61.7051 151.288 63.6907 145.44C64.4224 143.286 64.4224 140.659 64.4224 135.406V115.637C64.4224 101.598 78.8434 90.2186 96.6336 90.2186C114.424 90.2186 128.845 101.598 128.845 115.637V135.406C128.845 140.659 128.845 143.286 129.576 145.44C131.562 151.288 137.351 155.856 144.761 157.423C147.492 158 150.82 158 157.477 158H161.056C171.062 158 176.064 158 180.011 156.71C185.272 154.991 189.453 151.691 191.633 147.54C193.267 144.425 193.267 140.478 193.267 132.582Z"
          fill={color}
        />
      </Svg>
    </>
  );
};