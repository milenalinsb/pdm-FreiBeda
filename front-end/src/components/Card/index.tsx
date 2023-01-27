import { FontAwesome } from "@expo/vector-icons";
import { Box, Text } from "native-base";
import { styles } from "./style";

type Props = {
  icon?: any;
  texto?: String;
};

export const Card = ({ icon, texto }: Props) => {
  return (
    <Box style={styles.card}>
      <FontAwesome name={icon} size={72} color={"#FFF"} />
      <Text style={styles.textoCard}>{texto}</Text>
    </Box>
  );
};
