import { Box, ScrollView } from "native-base"
import { ReactNode } from "react";
import { styles } from "./styles";

type Pros = {
    children: ReactNode;
  };
  
export const PerfilContainer= ({children}:Pros) => {
    return(<>
   <ScrollView>
    <Box style={styles.container}>
    {children}
    </Box>
   </ScrollView>
    </>)
}