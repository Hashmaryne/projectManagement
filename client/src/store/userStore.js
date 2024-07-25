// store/useStore.js
import create from 'zustand';

const useStore = create(set => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export default useStore;
