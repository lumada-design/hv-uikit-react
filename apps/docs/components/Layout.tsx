import { useData } from "nextra/data";

import { Meta } from "../utils";

import { Header } from "./Header";

import { Page } from "./Page";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { meta } = useData();

  return (
    <div>
      <Header meta={meta as Meta} />
      <Page meta={meta as Meta}>{children}</Page>
    </div>
  );
};
