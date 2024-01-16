import { useState } from "react";
import { HvContainer, HvTab, HvTabs } from "@hitachivantara/uikit-react-core";

// import reactElementToJSXString from "react-element-to-jsx-string";

import { PropsTable } from "./PropsTable";
import { Meta } from "../utils";

// console.log(reactElementToJSXString(<HvContainer />));

export const Page = ({
  meta,
  children,
}: {
  meta: Meta;
  children: React.ReactNode;
}) => {
  const [section, setSection] = useState(0);

  const handleChange = (_, newValue) => {
    setSection(newValue);
  };

  const renderContent = (page: number) => {
    switch (page) {
      case 1:
        return <PropsTable props={meta.docgen.props} />;
      case 2:
        return <>styles api</>;
      default:
        return children;
    }
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <HvTabs value={section} onChange={handleChange}>
        <HvTab label="Documentation" />
        <HvTab label="Props" />
        <HvTab label="Styles API" />
      </HvTabs>
      <HvContainer style={{ paddingTop: 20 }}>
        {renderContent(section)}
      </HvContainer>
    </div>
  );
};
