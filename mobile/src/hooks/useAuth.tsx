import { useContext } from "react";
import {
  AuthContexDataProps,
  AuthContext,
  AuthContextProvider,
} from "../contexts/AuthContext";

export function useAuth(): AuthContexDataProps {
  const context = useContext(AuthContext);

  return context;
}
