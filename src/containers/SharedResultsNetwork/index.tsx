import React, { createContext, useContext, useMemo, useReducer } from "react";
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
    case "UPDATE_RELATED_ARTISTS":
      const { node, relatedNodes } = action.payload;

      if (node.id) {
        return {
          ...state,
          node,
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

  const stateValue = useMemo(() => {
    return {
      items: state,
      dispatch,
    };
  }, [state]);

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
