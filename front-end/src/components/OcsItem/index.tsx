import { Avatar, Box, HStack, Text } from "native-base";
import { IOsc } from "../../types/osc";

type Props = {
  data: IOsc;
};

export const OcsItem = ({ data }: Props) => {
  return (
    <>
      <Box
        borderBottomWidth="1"
        borderColor={"blueGray.300"}
        pl={["0", "4"]}
        pr={["0", "5"]}
        py="2"
      >
        <Box style={{ padding: 8 }}>
          <HStack space={1} justifyContent="flex-start">
            <Avatar style={{ margin: 8 }}
             bg="green.500"
             size="48px">
              {data.sigla}
            </Avatar>
            <Box>
              <Text bold fontSize="md">
                {data.nome}
              </Text>
              <Text color={"gray.600"}>{data.sigla}</Text>
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
};
