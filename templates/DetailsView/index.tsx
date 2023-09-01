import { HvGlobalActions, HvGrid } from "@hitachivantara/uikit-react-core";

import { KPIs } from "./KPIs";
import { Properties } from "./Properties";
import { Table } from "./Table";
import { useModelData } from "./data";

const MODEL_ID = "123";

const DetailsView = () => {
  const { data, loading } = useModelData({ id: MODEL_ID });

  return (
    <>
      <HvGlobalActions title="Deploy" />
      <HvGrid container>
        <HvGrid item xs={12}>
          <KPIs loading={loading} details={data} />
        </HvGrid>
        <HvGrid item xs={12}>
          <Properties loading={loading} details={data} />
        </HvGrid>
        <HvGrid item xs={12}>
          <Table modelId={MODEL_ID} />
        </HvGrid>
      </HvGrid>
    </>
  );
};

export default DetailsView;
