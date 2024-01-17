import { useEffect } from "react";
import { useAddTask, useTaskQuery } from "~/hooks/trpcHooks";
import { useMergedStoreContext } from "~/hooks/useStoreContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const taskQuery = useTaskQuery();
  const setTaskQuery = useMergedStoreContext((store) => store.setTaskQuery);

  const addTask = useAddTask();
  const setAddTask = useMergedStoreContext((store) => store.setAddTask);

  useEffect(() => {
    setTaskQuery(taskQuery);
    setAddTask(addTask);
  }, [taskQuery, addTask]);

  return <>{children}</>;
};
