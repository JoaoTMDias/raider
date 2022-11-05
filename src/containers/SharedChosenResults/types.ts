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

export interface SharedStateArtists {
  node?: SpotifyArtistItem;
  relatedNodes?: SharedStateArtists[];
}

export interface SharedStateGenre {
  node?: SpotifyArtistItem;
  relatedNodes?: SharedStateGenre[];
}

export type SharedState = {
  items: SharedStateArtists | SharedStateGenre;
  dispatch: React.Dispatch<Action>;
};

export type ShareStateWithoutAction = SharedState["items"];
