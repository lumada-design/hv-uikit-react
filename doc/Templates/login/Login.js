import React, { useState } from "react";
import { HvLoginContainer, HvHeader, HvHeaderBrand } from "@hitachivantara/uikit-react-core";
import LoginForm from "./LoginForm";
import RecoverForm from "./RecoverForm";
import { authenticate, recoverPassword } from "./utils";
import HitachiLogo from "../resources/HitachiLogo";

const Login = ({ classes }) => {
  const [authStatus, setAuthStatus] = useState("idle");
  const [recoverStatus, setRecoverStatus] = useState("idle");
  const [activeForm, setActiveForm] = useState("login");

  const login = async (credentials) => {
    try {
      setAuthStatus("pending");
      await authenticate(credentials);
      setAuthStatus("success");
      setTimeout(() => setAuthStatus("idle"), 2000);
    } catch (error) {
      setAuthStatus("error");
      setTimeout(() => setAuthStatus("idle"), 2000);
    }
  };

  const recover = async (email) => {
    try {
      setRecoverStatus("pending");
      await recoverPassword(email);
      setRecoverStatus("success");
      setTimeout(() => {
        setRecoverStatus("idle");
        setActiveForm("login");
      }, 2000);
    } catch (error) {
      setRecoverStatus("error");
      setTimeout(() => {
        setRecoverStatus("idle");
        setActiveForm("login");
      }, 2000);
    }
  };

  return (
    <>
      <HvHeader id="header">
        <HvHeaderBrand logo={<HitachiLogo />} name="Maintenance Insights" />
      </HvHeader>
      <HvLoginContainer className={classes.root}>
        {activeForm === "login" ? (
          <LoginForm
            status={authStatus}
            onSubmit={(credentials) => login(credentials)}
            onRecover={() => setActiveForm("recover")}
            onRemenber={() => {}}
          />
        ) : (
          <RecoverForm
            status={recoverStatus}
            onSubmit={(email) => recover(email)}
            onCancel={() => setActiveForm("login")}
          />
        )}
      </HvLoginContainer>
    </>
  );
};

export default Login;
