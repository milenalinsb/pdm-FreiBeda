import { Input, Text, Box } from "native-base";
import { styles } from "./style";

type Props = {
    textoLabel?: String
}

export const InputText = ({textoLabel}: Props) => {
    return(
        <Box style={styles.wrapper}>
            {textoLabel && <Text style={styles.label}>{textoLabel}</Text>}
            <Input />
        </Box>
    )
}