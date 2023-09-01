import { HvGrid, HvAvatar, theme } from "@hitachivantara/uikit-react-core";

import { Kpi1 } from "../Kpi1";
import { Kpi2 } from "../Kpi2";
import { ModelDetails } from "../data";
import { LoadingContainer } from "../../LoadingContainer";

interface KpiProps {
  details?: ModelDetails;
  loading: boolean;
}

export const KPIs = ({ loading, details }: KpiProps) => {
  return (
    <div style={{ paddingTop: theme.space.lg }}>
      <LoadingContainer loading={loading}>
        <HvGrid container>
          {details?.shortName && (
            <HvGrid item xs={12} md={3} lg={2}>
              <HvGrid container justifyContent="center">
                <HvAvatar id="status5" size="xl" status="atmo4">
                  {details?.shortName}
                </HvAvatar>
              </HvGrid>
            </HvGrid>
          )}
          <HvGrid item xs={12} md={9} lg={10}>
            <HvGrid container direction="row">
              {details?.deploys?.summary.map((el) => (
                <HvGrid key={el.id} item xs={12} sm={4}>
                  <Kpi1 title={el.title} count={el.count} diff={el.diff} />
                </HvGrid>
              ))}
              {details?.deploys?.data.map((el) => (
                <HvGrid key={el.id} item xs={12} sm={4}>
                  <Kpi2 title={el.title} value={el.value} />
                </HvGrid>
              ))}
            </HvGrid>
          </HvGrid>
        </HvGrid>
      </LoadingContainer>
    </div>
  );
};
