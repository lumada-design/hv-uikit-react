import { css } from "@emotion/css";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvContainer,
  HvGlobalActions,
  HvGrid,
  HvSimpleGrid,
  HvTypography,
  ds5,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";

export const getBreakpoints = () => {
  const gutters = {
    xs: 16,
    sm: 16,
    md: 32,
    lg: 32,
    xl: 32,
  };
  const columns = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 12,
    xl: 12,
  };

  return Object.entries(ds5.breakpoints.values).reduce((acc, curr) => {
    const [key, value] = curr;
    acc[key] = {
      value,
      gutter: gutters[key],
      column: columns[key],
    };
    return acc;
  }, {});
};

export const ContainerSample = () => {
  return (
    <HvContainer maxWidth="lg">
      <HvGlobalActions title="Details" />
      <HvContainer maxWidth="md">
        <HvTypography variant="body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          quasi sed perferendis optio eos excepturi possimus atque aperiam
          impedit expedita dolores, est nulla, aut iure, deleniti recusandae
          corporis eaque provident?
        </HvTypography>
        <HvTypography variant="body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit culpa
          error vitae fugit minima. Distinctio tempore ipsa voluptatum, vel
          alias possimus aut, itaque corrupti nesciunt accusantium commodi nulla
          minima voluptates.
        </HvTypography>
      </HvContainer>
    </HvContainer>
  );
};

export const SimpleGridSample = () => {
  const { activeTheme } = useTheme();

  return (
    <HvSimpleGrid
      cols={3}
      breakpoints={[
        {
          maxWidth: activeTheme.breakpoints.values.sm,
          cols: 2,
        },
      ]}
    >
      {Array.from({ length: 9 }).map((v, i) => {
        return (
          <HvCard key={`simple-grid-card-${i}`} bgcolor="atmo1">
            <HvCardHeader title={`Card ${i}`} />
            <HvCardContent>
              <HvTypography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </HvTypography>
            </HvCardContent>
          </HvCard>
        );
      })}
    </HvSimpleGrid>
  );
};

export const GridSample = () => {
  return (
    <HvGrid columns="auto" container>
      <HvGrid item xs={4} sm={8} md={12}>
        <HvGlobalActions title="Dashboard" />
      </HvGrid>
      {Array.from({ length: 4 }).map((v, i) => {
        return (
          <HvGrid item xs={4} sm={4} md={3} lg={3} key={`grid-card-${i}`}>
            <HvCard bgcolor="atmo1">
              <HvCardHeader title={`KPI ${i}`} />
              <HvCardContent>
                <HvTypography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </HvTypography>
              </HvCardContent>
            </HvCard>
          </HvGrid>
        );
      })}
      <HvGrid item xs={4} sm={8} md={12}>
        <HvCard
          bgcolor="atmo1"
          classes={{
            semanticBar: css({
              height: 0,
            }),
          }}
        >
          <HvCardContent
            classes={{
              content: css({
                paddingTop: theme.space.sm,
              }),
            }}
          >
            <HvBarChart
              data={{
                Group: ["Group 1", "Group 2", "Group 3"],
                "Sales Target": [2300, 1000, 7800],
                "Sales Per Rep": [6000, 3900, 1000],
                "Monthly Sales": [3700, 6700, 1100],
                Target: [2100, 7700, 3000],
                Cash: [500, 7600, 7800],
              }}
              groupBy="Group"
              measures={[
                "Sales Target",
                "Sales Per Rep",
                "Monthly Sales",
                "Target",
                "Cash",
              ]}
              horizontal
              grid={{ bottom: 0 }}
            />
          </HvCardContent>
        </HvCard>
      </HvGrid>
    </HvGrid>
  );
};
