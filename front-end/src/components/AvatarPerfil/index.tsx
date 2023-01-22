import { Avatar,Text } from "native-base"
import { useEffect } from "react"


export const AvatarPerfil = () => {

    useEffect(()=>{
        (async () => {
            console.log(123);
        })()
    },[])

    return(<>
     <Avatar
          bg="cyan.500"
          size="200"
          source={{
            uri: "https://wallpapercave.com/wp/wp4923991.png",
          }}
        >
          HS
      </Avatar>
      <Text bold fontSize="20">Cooperativa Terra e Vida </Text>
      <Text fontSize="15">Cooperativa Terra e Vida </Text>
    </>)
}