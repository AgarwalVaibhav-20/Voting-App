import "./index.css";
import "./CSS/FooterCSS.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import { PartiesProvider } from "./Component/ContextApi";

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <PartiesProvider>
        <Header />
        <Outlet />
        <Footer />
      </PartiesProvider>
      
    </>
  );
};

export default App;
