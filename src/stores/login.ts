import { create } from "zustand";

interface State {
	eventCounter: number;
	emitEvent: () => void;
}

const useStoreAuth = create<State>((set) => ({
	eventCounter: 0,
	emitEvent: () => set((state) => ({ eventCounter: state.eventCounter + 1 })),
}));

export default useStoreAuth;
