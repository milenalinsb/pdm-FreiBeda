import { AntDesign } from "@expo/vector-icons";
import { Box, HStack, Text } from "native-base";

type Props={
    text: string
}

export const Back = ({text}:Props) => {
  return (
    <>
      <Box style={{ padding: 10 }}>
        <HStack space={3} justifyContent="flex-start">
          <AntDesign
            style={{ marginTop: 5 }}
            name={"left"}
            size={20}
            color={"#333333"}
          />
          <Text color={"#919191"} bold fontSize="20">
            {text}
          </Text>
        </HStack>
      </Box>
    </>
  );
};
