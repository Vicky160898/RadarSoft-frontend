import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Allroutes from "../../router/Allroutes";

function Layout() {
  return (
    <>
      <Header />
      <Allroutes />
      <Footer />
    </>
  );
}

export default Layout;
