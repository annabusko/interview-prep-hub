import { createContext } from "react";
import type { ContentPack } from "./contentPack.types";

export const ContentPackContext = createContext<ContentPack | null>(null);

export const ContentPackProvider = ({
  pack,
  children,
}: {
  pack: ContentPack;
  children: React.ReactNode;
}) => (
  <ContentPackContext.Provider value={pack}>
    {children}
  </ContentPackContext.Provider>
);
