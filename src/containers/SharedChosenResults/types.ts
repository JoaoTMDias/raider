import { SpotifyArtistItem } from "@/typings/spotify";

interface ActionClear {
  type: "CLEAR_ALL";
  payload: never;
}

interface ActionSetChosen {
  type: "SET_CHOSEN_RESULT";
  payload: string | SpotifyArtistItem;
}

export type Action = ActionClear | ActionSetChosen;

export type SharedState = {
  items: SpotifyArtistItem;
  dispatch: React.Dispatch<Action>;
};

export type ShareStateWithoutAction = SharedState["items"];
