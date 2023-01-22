import { Avatar,Text } from "native-base"
import { useEffect, useState } from "react"
import { getUser } from "../../services/asyncStorage";
import { User } from "../../types/user";

export const AvatarPerfil = () => {

    const [user,setUser] = useState<User>();

      useEffect(()=>{
        (async () => {
            const data = await getUser("@user") as unknown as User;
            setUser(JSON.parse(data as unknown as string))
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
      <Text bold fontSize="20">{user?.username} </Text>
      <Text fontSize="15">{user?.email} </Text>
    </>)
}