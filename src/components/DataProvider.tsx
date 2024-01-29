import { useEffect } from "react";
import { useSendXml } from "~/hooks/trpcHooks";
import { useMergedStoreContext } from "~/hooks/useStoreContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const sendXml = useSendXml();
  const setSendXml = useMergedStoreContext((store) => store.setSendXml);

  useEffect(() => {
    setSendXml(sendXml);
  }, [sendXml]);
  return <>{children}</>;
};
