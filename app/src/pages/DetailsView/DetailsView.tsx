import { HvGlobalActions, HvGrid } from "@hitachivantara/uikit-react-core";

import { KPIs, Properties, Table } from "components/detailsView";

const DetailsView = () => {
  return (
    <>
      <HvGlobalActions title="Deploy" />
      <HvGrid container>
        <HvGrid item xs={12}>
          <KPIs />
        </HvGrid>
        <HvGrid item xs={12}>
          <Properties />
        </HvGrid>
        <HvGrid item xs={12}>
          <Table />
        </HvGrid>
      </HvGrid>
    </>
  );
};

export default DetailsView;
