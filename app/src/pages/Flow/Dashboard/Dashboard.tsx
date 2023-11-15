import { Global } from "@emotion/react";
import { css } from "@emotion/css";
import ReactGridLayout, {
  Layout,
  ReactGridLayoutProps,
  WidthProvider,
} from "react-grid-layout";

import { gridStyles } from "./base";

const GridLayout = WidthProvider(ReactGridLayout);

export type DashboardLayout = Layout;

export interface DashboardItem {
  id: string;
  component: React.ReactNode;
}

export interface DashboardProps extends ReactGridLayoutProps {
  content?: DashboardItem[];
}

export const Dashboard = ({ content, ...others }: DashboardProps) => {
  return (
    <>
      <Global styles={gridStyles} />
      <GridLayout {...others}>
        {content?.map((item) => {
          return (
            <div className={css({ display: "flex" })} key={item.id}>
              {item.component}
            </div>
          );
        })}
      </GridLayout>
    </>
  );
};
