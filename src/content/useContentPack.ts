import { useContext } from "react";
import { ContentPackContext } from "./ContentPackContext";
import type { ContentPack } from "./contentPack.types";

export const useContentPack = (): ContentPack => {
  const pack = useContext(ContentPackContext);
  if (!pack) {
    throw new Error("useContentPack must be used inside <ContentPackProvider>");
  }
  return pack;
};
