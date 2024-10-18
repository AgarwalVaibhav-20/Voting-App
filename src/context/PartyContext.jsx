import { createContext, useState } from "react";
import bjpLogo from "../assets/bjpLogo.jpg";
import incLogo from "../assets/incLogo.png";
import spaLogo from "../assets/spaLogo.jpg";
import aapLogo from "../assets/aapLogo.jpg";
import aitc from "../assets/aitc.png";
import dmk from "../assets/dmk.png";
import tdp from "../assets/tdp.png";
import jdu from "../assets/jdu.png";
import shsubt from "../assets/shsubt.png";
import ncpsp from "../assets/ncpsp.png";
import SHS from "../assets/ssh.png";

// import SHS from '../assets/'

// Create the context
export const PartyContext = createContext();

// Define the provider component
export const PartyProvider = ({ children }) => {
  // The initial state for parties
  const [parties] = useState([
    { name: "BJP", candidate: "Narendra Modi", logo: bjpLogo },
    { name: "INC", candidate: "Rahul Gandhi", logo: incLogo },
    { name: "SPA", candidate: "Akhilesh Yadav", logo: spaLogo },
    { name: "AAP", candidate: "Arvind Kejriwal", logo: aapLogo },
    { name: "AITC", candidate: "Mamata Banerjee", logo: aitc },
    { name: "DMK", candidate: "M K Stalin", logo: dmk },
    { name: "TDP", candidate: "N. Chandrababu Naidu", logo: tdp },
    { name: "JD(U)", candidate: "Nitish Kumar", logo: jdu },
    { name: "SHSUBT", candidate: "Uddhav Thackeray", logo: shsubt },
    { name: "NCPSP", candidate: "Sharadchandra Pawar", logo: ncpsp },
    { name: "SHS", candidate: "Eknath Shinde", logo: SHS },
  ]);

  return (
    <PartyContext.Provider value={{ parties }}>
      {children}
    </PartyContext.Provider>
  );
};
