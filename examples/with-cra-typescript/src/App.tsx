import React from "react";
import "./App.css";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import HvInput from "@hv/uikit-react-core/dist/Input";
import Header from "@hv/uikit-react-core/dist/Header";
import Login from "@hv/uikit-react-core/dist/Login";
import Footer from "@hv/uikit-react-lab/dist/Footer";

const handleLogin = () => alert("Welcome!");
const inputValue = "Hello";

const App: React.FC = () => {
  return (
    <HvProvider>
      <Header />
      <HvInput initialValue={inputValue} />
      <Login login={handleLogin} />
      <Footer />
    </HvProvider>
  );
};

export default App;
