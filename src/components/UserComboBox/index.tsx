import { SpotifyResponse } from "@/typings/spotify";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import User from "./User";

function UserComboBox() {
  const { data: response } = useSession();

  const getArtistDemo = async () => {
    const artist = "black sabbath";
    const res = await fetch(encodeURI(`/api/artist-by-name/${artist}`));
    const response = await res.json();

    console.log(response);
  };

  if (response) {
    const { session, token } = response as unknown as SpotifyResponse;

    return (
      <div className="user">
        <button onClick={() => getArtistDemo()}>Get artists</button>
        <User img={session.user.image} name={session.user.name} username={token.sub} />
      </div>
    );
  }

  return (
    <div className="user">
      <LoginButton />
    </div>
  );
}

export default UserComboBox;
