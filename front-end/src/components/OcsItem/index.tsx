import { Avatar, Box, HStack, Text } from "native-base";
import { useEffect, useState } from "react";
import { IOsc } from "../../types/osc";

type Props = {
  data: IOsc;
  index: number;
  colorAvatar: string;
};

export const OcsItem = ({ data, index, colorAvatar }: Props) => {
  const [color, setColor] = useState("green.500");

  useEffect(() => {
    setColor(colorAvatar);
  }, []);

  return (
    <>
      <Box
        pl={["0", "4"]}
        pr={["0", "5"]}
        py="2"
        bg={index % 2 == 0 ? "#ffffff" : "#F8F8F8"}
      >
        <Box style={{ padding: 8 }}>
          <HStack space={1} justifyContent="flex-start">
            <Avatar style={{ margin: 8 }} bg={color} size="48px">
              {data.sigla}
            </Avatar>
            <Box>
              <Text color={"primary.900"} bold fontSize="md">
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
