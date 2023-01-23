import { Avatar, Text } from "native-base";
import { useEffect, useState } from "react";
import { baseURL } from "../../services/api";
import { getUser } from "../../services/asyncStorage";
import { User } from "../../types/user";

export const AvatarPerfil = () => {
  const [user, setUser] = useState<User>();
  const [avatarUrl, setAvatarUrl] = useState(`${baseURL}/static/avatar.jpg`);
  useEffect(() => {
    (async () => {
      const data = (await getUser("@user")) as unknown as User;
      setUser(JSON.parse(data as unknown as string));
      if (JSON.parse(data as unknown as string).avatar != null) {
        setAvatarUrl(
          `${baseURL}/static/${JSON.parse(data as unknown as string).avatar}`
        );
      }
    })();
  }, []);

  return (
    <>
      <Avatar
        bg="cyan.500"
        size="200"
        source={{
          uri: avatarUrl,
        }}
      >
        HS
      </Avatar>
      <Text marginTop={5} bold fontSize="20">
        {user?.username}{" "}
      </Text>
      <Text fontSize="15">{user?.email} </Text>
    </>
  );
};
