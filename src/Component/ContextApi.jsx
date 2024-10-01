import { createContext } from "react";

export const PartiesName = createContext();

export const PartiesProvider = ({ children }) => {
  const parties = {1:"BJP",2: "INC",3: " SP", 4:"AITC", 5:"DMK", 6:"TDP"};
  return (
    <PartiesName.Provider value={parties}>{children}</PartiesName.Provider>
  );
};
