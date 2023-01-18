import { useEffect } from "react";
import { LogoWhite } from "../components/LogoWhite";
import { SplashContainer } from "../components/SplashContainer";
import { getToken } from "../services/asyncStorage";
import { NavigationProps } from "../types/navigation";

export const Splash = ({ navigation }: NavigationProps) => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = await getToken("@token");
      if (token !== null) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("PerfilOSC");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashContainer>
        <LogoWhite height={200} width={200} />
      </SplashContainer>
    </>
  );
};
