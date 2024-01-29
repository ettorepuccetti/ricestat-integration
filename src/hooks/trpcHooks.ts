import { api } from "~/utils/api";

//------------------------------
//------- QUERIES HOOKS --------
//------------------------------

//-------------------------------
//------- MUTATION HOOKS --------
//-------------------------------

export const useSendXml = () => {
  return api.sender.sendXml.useMutation();
};
