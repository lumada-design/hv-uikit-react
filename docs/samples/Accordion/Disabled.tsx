import {
  HvAccordion,
  HvBox,
  HvListContainer,
  HvListItem,
} from "@hitachivantara/uikit-react-core";

import { css, CSSInterpolation } from "@emotion/css";

const styles: { [key: string]: CSSInterpolation } = {
  listContainer: {
    "& > li": {
      paddingLeft: 32,
    },
  },
  formContainer: {
    padding: "0 32px",
    "& > div": {
      paddingTop: 17,
    },
  },
};

export const Disabled = () => {
  return (
    <HvBox sx={{ maxWidth: 300 }}>
      <HvAccordion label="Analytics" headingLevel={3} disabled>
        <HvListContainer
          className={css(styles.listContainer)}
          interactive
          condensed
        >
          <HvListItem>Views</HvListItem>
          <HvListItem>Parameters</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion label="System" headingLevel={3}>
        <HvListContainer
          className={css(styles.listContainer)}
          interactive
          condensed
        >
          <HvListItem>Settings</HvListItem>
          <HvListItem>Network</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion label="Data" headingLevel={3} disabled>
        <HvListContainer
          className={css(styles.listContainer)}
          interactive
          condensed
        >
          <HvListItem>Storage</HvListItem>
          <HvListItem>Memory</HvListItem>
        </HvListContainer>
      </HvAccordion>
    </HvBox>
  );
};
