import { create } from 'zustand';
import { INITIAL_ARTIST, INITIAL_NODES_STATE } from './constants';
import { RaiderStore } from './types';


export const useRaiderStore = create<RaiderStore>((set) => {
  return {
    currentArtist: INITIAL_ARTIST,
    nodes: INITIAL_NODES_STATE,
    setSearchResults: (artist) => set(() => ({
      currentArtist: artist,
    })),
    resetCurrentArtist: () => set(() => ({
      currentArtist: INITIAL_ARTIST,
    })),
    updateRelatedArtists: (artist, relatedNodes) => set((state) => ({
      nodes: {
        ...state.nodes,
        node: artist,
        relatedNodes,
      }
    }))
  }
})
