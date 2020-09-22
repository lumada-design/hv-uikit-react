import React, { useState } from "react";

import { withStyles, makeStyles } from "@material-ui/core";
import { DropRightXS, Calendar, LineChart, Machine, Plane, User } from "@hv/uikit-react-icons";

import {
  HvListContainer,
  HvListItem,
  HvPanel,
  HvTypography,
  HvLink,
  HvRadio,
  HvCheckBox,
  HvBulkActions,
  withTooltip
} from "../../..";

export default {
  title: "Components/List",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvListContainer } from '@hv/uikit-react-core/dist'"
  },
  component: HvListContainer,
  subcomponents: { HvListItem }
};

export const Main = () => (
  <HvPanel m="10px" style={{ float: "left" }}>
    <HvListContainer condensed>
      <HvListItem>98001, Store Manager</HvListItem>
      <HvListItem>98002, Store Manager</HvListItem>
      <HvListItem>98003, Store Manager</HvListItem>
      <HvListItem>98004, Store Manager</HvListItem>
      <HvListItem>98005, Store Manager</HvListItem>
      <HvListItem>98001, Store Manager</HvListItem>
      <HvListItem>98002, Store Manager</HvListItem>
      <HvListItem>98003, Store Manager</HvListItem>
    </HvListContainer>
  </HvPanel>
);

export const SingleSelection = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleListItemClick = (_evt, index) => {
    setSelectedItem(index);
  };

  return (
    <HvPanel m="10px" style={{ float: "left" }}>
      <HvListContainer selectable condensed>
        <HvListItem onClick={event => handleListItemClick(event, 0)} selected={selectedItem === 0}>
          98001, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 1)} selected={selectedItem === 1}>
          98002, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 2)} selected={selectedItem === 2}>
          98003, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 3)} selected={selectedItem === 3}>
          98004, Store Manager
        </HvListItem>
        <HvListItem disabled>98005, Store Manager</HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 5)} selected={selectedItem === 5}>
          98001, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 6)} selected={selectedItem === 6}>
          98002, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 7)} selected={selectedItem === 7}>
          98003, Store Manager
        </HvListItem>
      </HvListContainer>
    </HvPanel>
  );
};

export const SingleSelectionWithSelectors = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleListItemClick = (_evt, index) => {
    setSelectedItem(index);
  };

  return (
    <HvPanel m="10px" style={{ float: "left" }}>
      <HvListContainer condensed disableGutters aria-label="Single Selection List with radio">
        <HvListItem>
          <HvRadio
            label="98001, Store Manager"
            onClick={event => handleListItemClick(event, 0)}
            checked={selectedItem === 0}
          />
        </HvListItem>
        <HvListItem>
          <HvRadio
            label="98002, Store Manager"
            onClick={event => handleListItemClick(event, 1)}
            checked={selectedItem === 1}
          />
        </HvListItem>
        <HvListItem>
          <HvRadio
            label="98003, Store Manager"
            onClick={event => handleListItemClick(event, 2)}
            checked={selectedItem === 2}
          />
        </HvListItem>
        <HvListItem>
          <HvRadio
            label="98004, Store Manager"
            onClick={event => handleListItemClick(event, 3)}
            checked={selectedItem === 3}
            disabled
          />
        </HvListItem>
        <HvListItem>
          <HvRadio
            label="98005, Store Manager"
            onClick={event => handleListItemClick(event, 4)}
            checked={selectedItem === 4}
          />
        </HvListItem>
      </HvListContainer>
    </HvPanel>
  );
};

export const MultiSelection = () => {
  const [selectedItems, setSelectedItems] = useState({
    0: false,
    1: true,
    2: false,
    3: false,
    4: false
  });

  const handleListItemClick = (_evt, index) => {
    setSelectedItems(previousSelection => {
      return {
        ...previousSelection,
        [index]: !previousSelection[index]
      };
    });
  };
  return (
    <HvPanel m="10px" style={{ float: "left" }}>
      <HvListContainer selectable multiSelect condensed>
        <HvListItem onClick={event => handleListItemClick(event, 0)} selected={selectedItems[0]}>
          98001, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 1)} selected={selectedItems[1]}>
          98002, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 2)} selected={selectedItems[2]}>
          98003, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 3)} selected={selectedItems[3]}>
          98004, Store Manager
        </HvListItem>
        <HvListItem onClick={event => handleListItemClick(event, 4)} selected={selectedItems[4]}>
          98005, Store Manager
        </HvListItem>
      </HvListContainer>
    </HvPanel>
  );
};

export const MultiSelectionWithSelectors = () => {
  const [selectedItems, setSelectedItems] = useState({
    0: false,
    1: true,
    2: false,
    3: false,
    4: false
  });

  const handleListItemClick = (_evt, index) => {
    setSelectedItems(previousSelection => {
      return {
        ...previousSelection,
        [index]: !previousSelection[index]
      };
    });
  };

  return (
    <HvPanel m="10px" style={{ float: "left" }}>
      <HvListContainer
        condensed
        selectable
        disableGutters
        multiSelect
        aria-label="Single Selection List with radio"
      >
        <HvListItem>
          <HvCheckBox
            label="Arhauss is somewhere"
            onClick={event => handleListItemClick(event, 0)}
            checked={selectedItems[0]}
          />
        </HvListItem>
        <HvListItem>
          <HvCheckBox
            label="Allentown is not are 51"
            onClick={event => handleListItemClick(event, 1)}
            checked={selectedItems[1]}
          />
        </HvListItem>
        <HvListItem>
          <HvCheckBox
            label="Bergamo where you can eat"
            onClick={event => handleListItemClick(event, 2)}
            checked={selectedItems[2]}
          />
        </HvListItem>
        <HvListItem>
          <HvCheckBox
            label="Bergen city"
            disabled
            onClick={event => handleListItemClick(event, 3)}
            checked={selectedItems[3]}
          />
        </HvListItem>
        <HvListItem>
          <HvCheckBox
            label="Boston of the Seven Seas"
            onClick={event => handleListItemClick(event, 4)}
            checked={selectedItems[4]}
          />
        </HvListItem>
      </HvListContainer>
    </HvPanel>
  );
};

export const MultiSelectionWithSelectAll = () => {
  const useStyles = makeStyles(() => ({
    root: {
      margin: 0
    },
    selectAllContainer: {
      width: "100%"
    },
    selectAll: {
      width: "100%"
    }
  }));
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = useState({
    0: false,
    1: true,
    2: false,
    3: false,
    4: false
  });

  const handleListItemClick = (_evt, index) => {
    setSelectedItems(previousSelection => {
      return {
        ...previousSelection,
        [index]: !previousSelection[index]
      };
    });
  };

  const handleSelectAll = (e, checked = false) => {
    setSelectedItems({
      0: checked,
      1: checked,
      2: checked,
      3: checked,
      4: checked
    });
  };

  return (
    <HvPanel m="10px" style={{ float: "left" }}>
      <HvBulkActions
        semantic={false}
        classes={classes}
        onSelectAll={handleSelectAll}
        numTotal={Object.keys(selectedItems).length}
        numSelected={Object.values(selectedItems).filter(el => el).length}
      />
      <HvListContainer
        condensed
        selectable
        multiSelect
        aria-label="Single Selection List with radio"
      >
        <HvListItem
          startAdornment={<HvCheckBox label="Arhauss is somewhere" />}
          onClick={event => handleListItemClick(event, 0)}
          selected={selectedItems[0]}
        />
        <HvListItem
          startAdornment={<HvCheckBox label="Allentown is not are 51" />}
          onClick={event => handleListItemClick(event, 1)}
          selected={selectedItems[1]}
        />
        <HvListItem
          startAdornment={<HvCheckBox label="Bergamo where you can eat" />}
          onClick={event => handleListItemClick(event, 2)}
          selected={selectedItems[2]}
        />
        <HvListItem
          startAdornment={<HvCheckBox label="Bergen city" />}
          onClick={event => handleListItemClick(event, 3)}
          selected={selectedItems[3]}
        />
        <HvListItem
          startAdornment={<HvCheckBox label="Boston of the Seven Seas" />}
          onClick={event => handleListItemClick(event, 4)}
          selected={selectedItems[4]}
        />
      </HvListContainer>
    </HvPanel>
  );
};

export const WithIcons = () => (
  <HvPanel m="10px" style={{ float: "left" }}>
    <HvListContainer selectable aria-label="Single Selection List with Left Icons Title">
      <HvListItem startAdornment={<User />}>Advanced server DS120</HvListItem>
      <HvListItem startAdornment={<Calendar />}>Advanced server DS122</HvListItem>
      <HvListItem startAdornment={<Machine />}>Advanced server DS250</HvListItem>
      <HvListItem startAdornment={<Plane />} disabled>
        Advanced server DS530
      </HvListItem>
      <HvListItem startAdornment={<LineChart />}>Advanced server DS555</HvListItem>
    </HvListContainer>
  </HvPanel>
);

export const WithNavigationIcons = () => (
  <HvPanel m="10px" style={{ float: "left" }}>
    <HvListContainer condensed interactive aria-label="Simple List With Navigation Icons">
      <HvListItem endAdornment={<DropRightXS />}>Today</HvListItem>
      <HvListItem>Yesterday</HvListItem>
      <HvListItem>Last week</HvListItem>
      <HvListItem endAdornment={<DropRightXS />} disabled>
        Last month
      </HvListItem>
      <HvListItem endAdornment={<DropRightXS />}>Last year</HvListItem>
    </HvListContainer>
  </HvPanel>
);

export const WithTextOverflow = () => {
  return (
    <HvPanel width="200px">
      <HvListContainer condensed selectable aria-label="Single Selection List Title">
        <HvListItem>Share</HvListItem>
        <HvListItem>Edit</HvListItem>
        <HvListItem>Remove</HvListItem>
        <HvListItem>Delete</HvListItem>
        <HvListItem>
          {withTooltip(
            () => <>Really big text that should be truncated</>,
            "The complete really big text that should be shown in the tooltip"
          )()}
        </HvListItem>
      </HvListContainer>
    </HvPanel>
  );
};

export const WithTitle = () => {
  // Style link to prevent double-focus ring, bold, and underline
  const StyledHvLink = withStyles(theme => ({
    a: {
      ...theme.hv.typography.normalText,
      textDecoration: "none",

      "&:focus": {
        boxShadow: "unset !important"
      }
    }
  }))(HvLink);

  return (
    <HvPanel m="10px" minWidth="200px" style={{ float: "left" }}>
      <HvTypography variant="highlightText" style={{ margin: "0 10px 10px" }}>
        Options
      </HvTypography>
      <HvListContainer condensed interactive aria-label="Simple List With Title">
        <HvListItem disabled>Share</HvListItem>
        <HvListItem>Edit</HvListItem>
        <HvListItem>
          <StyledHvLink route="https://www.hitachivantara.com">Remove</StyledHvLink>
        </HvListItem>
        <HvListItem>Delete</HvListItem>
        <HvListItem>
          <StyledHvLink route="https://www.hitachivantara.com">Update</StyledHvLink>
        </HvListItem>
      </HvListContainer>
    </HvPanel>
  );
};
