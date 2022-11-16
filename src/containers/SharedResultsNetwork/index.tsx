import React, { createContext, useContext, useReducer } from "react";
import { getRelatedArtists } from "./helpers";
import { Action, SharedState, ShareStateWithoutAction } from "./types";

const INITIAL_STATE: SharedState = {
  items: {},
  dispatch: () => {},
};

const SharedResultsNetworkContext = createContext<SharedState>(INITIAL_STATE);

function reducer(state: ShareStateWithoutAction, action: Action): ShareStateWithoutAction {
  switch (action.type) {
    case "CLEAR":
      return INITIAL_STATE.items;
    case "FIRST_RESULT":
      const artistId = action.payload?.id;

      if (artistId) {
        const relatedNodes = getRelatedArtists(artistId);

        return {
          ...state,
          node: action.payload,
          isExpanded: true,
          relatedNodes,
        };
      }

      return state;
    case "EXPAND_NODE":
    case "COLLAPSE_NODE":
      return {
        ...state,
        node: action.payload,
      };
    default:
      throw new Error();
  }
}

function SharedResultsNetworkProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE.items);

  const stateValue = {
    items: state,
    dispatch,
  };

  return (
    <SharedResultsNetworkContext.Provider value={stateValue}>
      {children}
    </SharedResultsNetworkContext.Provider>
  );
}

function useSharedResultsNetwork(): SharedState {
  return useContext(SharedResultsNetworkContext);
}

export { useSharedResultsNetwork, SharedResultsNetworkProvider };
