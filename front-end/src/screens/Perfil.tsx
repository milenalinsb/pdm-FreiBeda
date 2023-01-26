import { Button } from "native-base";
import { AvatarPerfil } from "../components/AvatarPerfil";
import { Footer } from "../components/Footer";
import { PerfilContainer } from "../components/PerfilContainer";
import { logout } from "../services/logout";
import { NavigationProps } from "../types/navigation";

export const Perfil = ({ navigation }: NavigationProps) => {
  return (
    <>
      <PerfilContainer>
        <AvatarPerfil />
      </PerfilContainer>
      <Button margin={10} colorScheme={"error"} 
      onPress={() => logout({ navigation })}
      >
        Sair
      </Button>
      <Footer navigation={navigation} page={"Perfil"} />
    </>
  );
};
