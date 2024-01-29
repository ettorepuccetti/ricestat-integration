import { type StateCreator } from "zustand";
import {
  type useAddTask,
  type useSendXml,
  type useTaskQuery,
} from "./trpcHooks";

export interface Store {
  taskNextIndex: number;
  setTaskNextIndex: (taskNextIndex: number) => void;

  //trpc mutations and queries
  taskQuery: ReturnType<typeof useTaskQuery> | undefined;
  setTaskQuery: (taskQuery: ReturnType<typeof useTaskQuery>) => void;
  addTask: ReturnType<typeof useAddTask> | undefined;
  setAddTask: (addTask: ReturnType<typeof useAddTask>) => void;

  sendXml: ReturnType<typeof useSendXml> | undefined;
  setSendXml: (sendXml: ReturnType<typeof useSendXml>) => void;
}

export const storeCreator: StateCreator<Store, [], [], Store> = (set) => ({
  taskNextIndex: 1,
  setTaskNextIndex: (taskNextIndex) => set({ taskNextIndex }),

  //trpc mutations and queries
  taskQuery: undefined,
  setTaskQuery: (taskQuery) => set({ taskQuery }),
  addTask: undefined,
  setAddTask: (addTask) => set({ addTask }),

  sendXml: undefined,
  setSendXml: (sendXml) => set({ sendXml }),
});
