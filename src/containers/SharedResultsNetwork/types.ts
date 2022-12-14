import { SpotifyArtistItem } from "@/typings/spotify";

interface ActionClear {
  type: "CLEAR";
  payload: never;
}

interface ActionFirstResult {
  type: "UPDATE_RELATED_ARTISTS";
  payload: {
    node: SpotifyArtistItem;
    relatedNodes?: SharedStateArtists[];
  };
}

interface ActionExpandNode {
  type: "EXPAND_NODE";
  payload: {
    id: string;
  };
}

interface ActionCollapseNode {
  type: "COLLAPSE_NODE";
  payload: {
    id: string;
  };
}

export type Action = ActionClear | ActionFirstResult | ActionExpandNode | ActionCollapseNode;

export interface SharedStateArtists {
  node?: SpotifyArtistItem;
  isExpanded?: boolean;
  relatedNodes?: SharedStateArtists[];
}

export type SharedState = {
  items: SharedStateArtists;
  highlightedItem?: string;
  dispatch: React.Dispatch<Action>;
};

export type ShareStateWithoutAction = SharedState["items"];
