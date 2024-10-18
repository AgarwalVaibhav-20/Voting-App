import "./index.css";
import "./CSS/FooterCSS.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
// import { PartiesProvider } from "./Component/ContextApi";
import { AuthState } from "./context/AuthState";
import { PartiesProvider } from "./context/ContextApi";

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
    <AuthState>
      <PartiesProvider>
        <Header />
        <Outlet />
        <Footer />
      </PartiesProvider>
    </AuthState>
      
    </>
  );
};

export default App;
