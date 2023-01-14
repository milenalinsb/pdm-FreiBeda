import { ScrollView } from "react-native"
import { Footer } from "../components/Footer"
import { NavigationProps } from "../types/navigation"

export const Perfil = ({ navigation }: NavigationProps) => {
    return (<>
     <ScrollView>
        
     </ScrollView>
     <Footer navigation={navigation} page={"Perfil"} />
    </>)
}