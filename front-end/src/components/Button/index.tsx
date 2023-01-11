import {
    Button as ButtonL,
  } from "native-base";
  import { GestureResponderEvent } from "react-native";

type Props={
    onPress: any,
    text:string
}

export const Button = ({onPress,text}:Props) => {
  return (
    <>
      <ButtonL
        onPress={
            onPress as unknown as (event: GestureResponderEvent) => void
        }
        mt="2"
      >
        {text}
      </ButtonL>
    </>
  );
};