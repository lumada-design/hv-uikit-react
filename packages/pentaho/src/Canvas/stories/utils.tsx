import { HvOverflowTooltip } from "@hitachivantara/uikit-react-core";
import { DataSource, Schema } from "@hitachivantara/uikit-react-icons";

import { ListView } from "./ListView/ListView";
import { classes } from "./styles";
import { TreeView } from "./TreeView";

export const panelTabs = [
  {
    id: 0,
    content: (
      <>
        <DataSource />
        Add Data
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        <Schema />
        Model Structure
      </>
    ),
  },
];
export const panelContent = {
  [panelTabs[0].id]: <TreeView />,
  [panelTabs[1].id]: <ListView />,
};

const TitleContainer = ({ children }: { children: React.ReactNode }) => (
  <div className={classes.titleContainer}>
    <HvOverflowTooltip data={children} />
  </div>
);

export const floatingPanelTabs = [
  {
    id: 0,
    title: <TitleContainer>This is an extremely long tab 1</TitleContainer>,
  },
  {
    id: 1,
    title: <TitleContainer>Tab 2</TitleContainer>,
  },
];
export const floatingPanelContent = {
  [floatingPanelTabs[0].id]: (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quam
      accusantium id architecto culpa libero, sit rem soluta autem veritatis
      animi quaerat exercitationem reiciendis. Obcaecati ab quas nostrum sit
      quisquam.
    </div>
  ),
  [floatingPanelTabs[1].id]: (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet quasi
      animi earum illo ullam quaerat assumenda cum. Eligendi laudantium illum,
      earum corrupti porro incidunt illo ullam odit reiciendis id natus.
    </div>
  ),
};

export const Separator = () => <div className={classes.separator} />;
