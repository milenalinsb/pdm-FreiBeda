import { Avatar, Box, Flex } from "native-base";
import { Entypo } from "@expo/vector-icons";

export const AddBtn = () => {
  return (
    <>
      <Box bg={"#ffffff"} padding={6}>
        <Flex direction="row-reverse" mb="2.5" mt="1.5">
            <Avatar bg={"primary.900"} size="60">
              <Entypo name={"plus"} size={40} color={"#FFF"} />
            </Avatar>
        </Flex>
      </Box>
    </>
  );
};
