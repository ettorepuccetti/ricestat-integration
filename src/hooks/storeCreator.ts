import { type StateCreator } from "zustand";
import { type useSendXml } from "./trpcHooks";

export interface Store {
  //trpc mutations and queries
  sendXml: ReturnType<typeof useSendXml> | undefined;
  setSendXml: (sendXml: ReturnType<typeof useSendXml>) => void;
}

export const storeCreator: StateCreator<Store, [], [], Store> = (set) => ({
  sendXml: undefined,
  setSendXml: (sendXml) => set({ sendXml }),
});
