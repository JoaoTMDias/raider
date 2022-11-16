import React, { createContext, useContext, useReducer } from "react";
import { Action, SharedState, ShareStateWithoutAction } from "./types";

const INITIAL_STATE: SharedState = {
  items: {},
  dispatch: () => {},
};

const SharedChosenResultsContext = createContext<SharedState>(INITIAL_STATE);

function reducer(state: ShareStateWithoutAction, action: Action): ShareStateWithoutAction {
  switch (action.type) {
    case "CLEAR_ALL":
      return INITIAL_STATE.items;
    case "SET_CHOSEN_RESULT":
      if (typeof action.payload === "string") {
        return state;
      }

      return action.payload;
    default:
      throw new Error();
  }
}

function SharedChosenResultsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE.items);

  const stateValue = {
    items: state,
    dispatch,
  };

  return (
    <SharedChosenResultsContext.Provider value={stateValue}>
      {children}
    </SharedChosenResultsContext.Provider>
  );
}

function useSharedChosenResults(): SharedState {
  return useContext(SharedChosenResultsContext);
}

export { useSharedChosenResults, SharedChosenResultsProvider };
