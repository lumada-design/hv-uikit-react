import React, { useState, useEffect } from "react";

import { withStyles } from "@material-ui/core";

import {
  DropRightXS,
  Calendar,
  LineChart,
  Machine,
  Plane,
  User,
} from "@hitachivantara/uikit-react-icons";

import { HvListContainer, HvListItem, HvPanel, HvTypography, HvLink, HvTooltip } from "../..";

export default {
  title: "Components/List",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvListContainer } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvListContainer,
  subcomponents: { HvListItem },
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
      <HvListContainer interactive condensed aria-label="Stores">
        <HvListItem
          onClick={(event) => handleListItemClick(event, 0)}
          selected={selectedItem === 0}
        >
          98001, Store Manager
        </HvListItem>
        <HvListItem
          onClick={(event) => handleListItemClick(event, 1)}
          selected={selectedItem === 1}
        >
          98002, Store Manager
        </HvListItem>
        <HvListItem
          onClick={(event) => handleListItemClick(event, 2)}
          selected={selectedItem === 2}
        >
          98003, Store Manager
        </HvListItem>
        <HvListItem
          onClick={(event) => handleListItemClick(event, 3)}
          selected={selectedItem === 3}
        >
          98004, Store Manager
        </HvListItem>
        <HvListItem disabled>98005, Store Manager</HvListItem>
        <HvListItem
          onClick={(event) => handleListItemClick(event, 5)}
          selected={selectedItem === 5}
        >
          98001, Store Manager
        </HvListItem>
        <HvListItem
          onClick={(event) => handleListItemClick(event, 6)}
          selected={selectedItem === 6}
        >
          98002, Store Manager
        </HvListItem>
        <HvListItem
          onClick={(event) => handleListItemClick(event, 7)}
          selected={selectedItem === 7}
        >
          98003, Store Manager
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
    4: false,
  });

  const handleListItemClick = (_evt, index) => {
    setSelectedItems((previousSelection) => {
      return {
        ...previousSelection,
        [index]: !previousSelection[index],
      };
    });
  };
  return (
    <HvPanel m="10px" style={{ float: "left" }}>
      <HvListContainer interactive condensed aria-label="Stores">
        <HvListItem onClick={(event) => handleListItemClick(event, 0)} selected={selectedItems[0]}>
          98001, Store Manager
        </HvListItem>
        <HvListItem onClick={(event) => handleListItemClick(event, 1)} selected={selectedItems[1]}>
          98002, Store Manager
        </HvListItem>
        <HvListItem onClick={(event) => handleListItemClick(event, 2)} selected={selectedItems[2]}>
          98003, Store Manager
        </HvListItem>
        <HvListItem onClick={(event) => handleListItemClick(event, 3)} selected={selectedItems[3]}>
          98004, Store Manager
        </HvListItem>
        <HvListItem onClick={(event) => handleListItemClick(event, 4)} selected={selectedItems[4]}>
          98005, Store Manager
        </HvListItem>
      </HvListContainer>
    </HvPanel>
  );
};

export const WithIcons = () => (
  <HvPanel m="10px" style={{ float: "left" }}>
    <HvListContainer interactive aria-label="Single Selection List with Left Icons Title">
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
  const style = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: "32px",
  };

  return (
    <HvPanel width="200px">
      <HvListContainer condensed interactive aria-label="Single Selection List Title">
        <HvListItem>Share</HvListItem>
        <HvListItem>Edit</HvListItem>
        <HvListItem>Remove</HvListItem>
        <HvListItem>Delete</HvListItem>
        <HvListItem>
          <HvTooltip
            title={
              <HvTypography>
                The complete really big text that should be shown in the tooltip
              </HvTypography>
            }
          >
            <HvTypography style={style} component="div">
              Really big text that should be truncated
            </HvTypography>
          </HvTooltip>
        </HvListItem>
      </HvListContainer>
    </HvPanel>
  );
};

export const WithTitle = () => {
  // Style link to prevent double-focus ring, bold, and underline
  const StyledHvLink = withStyles((theme) => ({
    a: {
      ...theme.hv.typography.normalText,
      textDecoration: "none",

      "&:focus": {
        boxShadow: "unset !important",
      },
    },
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

export const MultiSelectionWithShift = () => {
  const initialSelection = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };

  const useKeyboardSelection = () => {
    const [selectionAnchor, setSelectionAnchor] = useState();
    const [selectedItems, setSelectedItems] = useState({ ...initialSelection });

    const flipSelection = (selectionToFlip) => {
      const updatedSelection = selectionToFlip.map((item) => {
        const updatedEntries = [item[0], !item[1]];
        return updatedEntries;
      });

      return updatedSelection;
    };

    const getSelectedItemsCount = (selectionSet) => {
      return Object.values(selectionSet).filter((e) => e === true).length;
    };

    const getUpdatedSelectionArray = (initialSet, selectionStart, selectionEnd) => {
      return Object.fromEntries(
        flipSelection(Object.entries(initialSet).slice(selectionStart, selectionEnd + 1))
      );
    };

    const getIndexOfSelectedItem = (selectionSet) => {
      const preExistingSelectedItems = Object.entries(selectionSet).filter((e) => e[1] === true)[0];
      return +preExistingSelectedItems[0];
    };

    const setSelectionSet = (index) => {
      let leftSet;
      let rightSet;
      let updatedArray;

      if (getSelectedItemsCount(selectedItems) > 0) {
        const indexSelectedItem = getIndexOfSelectedItem(selectedItems);

        if (indexSelectedItem < index) {
          setSelectionAnchor(indexSelectedItem);
          updatedArray = getUpdatedSelectionArray(initialSelection, indexSelectedItem, index);

          leftSet = updatedArray;
          rightSet = undefined;
        } else {
          setSelectionAnchor(index);
          updatedArray = getUpdatedSelectionArray(initialSelection, index, indexSelectedItem);

          leftSet = initialSelection;
          rightSet = updatedArray;
        }
      } else {
        leftSet = initialSelection;
        rightSet = {
          [index]: !selectedItems[index],
        };
      }

      return [leftSet, rightSet];
    };

    const handleShiftCLick = (index) => {
      let leftSet;
      let rightSet;

      let updatedArray;

      if (selectionAnchor === null) {
        [leftSet, rightSet] = setSelectionSet(index);
      } else {
        const startOfSlice = selectionAnchor < index ? selectionAnchor : index;
        const endOfSlice = index > selectionAnchor ? index : selectionAnchor;

        updatedArray = getUpdatedSelectionArray(initialSelection, startOfSlice, endOfSlice);

        leftSet =
          Object.keys(updatedArray).length <= getSelectedItemsCount(selectedItems)
            ? initialSelection
            : selectedItems;

        rightSet = updatedArray;
      }

      return {
        ...leftSet,
        ...rightSet,
      };
    };

    const handleListItemClick = (_evt, index) => {
      if (_evt.shiftKey) {
        setSelectedItems(handleShiftCLick(index, _evt));
      } else if (_evt.metaKey || _evt.ctrlKey) {
        setSelectionAnchor(index);

        selectedItems[index] = !selectedItems[index];

        setSelectedItems(() => {
          return {
            ...selectedItems,
          };
        });
      } else {
        setSelectionAnchor(index);

        const selectedSet = {
          ...initialSelection,
          [index]:
            getSelectedItemsCount(selectedItems) === Object.keys(initialSelection).length
              ? selectedItems[index]
              : !selectedItems[index],
        };

        setSelectedItems(() => {
          return selectedSet;
        });
      }
    };

    useEffect(() => {
      const existingSelections = Object.entries(selectedItems).filter((item) => {
        return item[1] === true;
      })[0];

      if (existingSelections === undefined) {
        setSelectionAnchor(null);
      }
    }, [selectedItems, selectionAnchor]);

    return [selectedItems, handleListItemClick];
  };

  const MultiSelectionWithShiftComponent = () => {
    const [selectedItems, handleListItemClick] = useKeyboardSelection();

    return (
      <HvPanel m="10px" style={{ float: "left" }}>
        <HvListContainer interactive condensed aria-label="Stores" role="listbox">
          <HvListItem
            onClick={(event) => handleListItemClick(event, 0)}
            selected={selectedItems[0]}
            role="option"
            style={{ userSelect: "none" }}
          >
            98001, Store Manager
          </HvListItem>
          <HvListItem
            onClick={(event) => handleListItemClick(event, 1)}
            selected={selectedItems[1]}
            role="option"
            style={{ userSelect: "none" }}
          >
            98002, Store Manager
          </HvListItem>
          <HvListItem
            onClick={(event) => handleListItemClick(event, 2)}
            selected={selectedItems[2]}
            role="option"
            style={{ userSelect: "none" }}
          >
            98003, Store Manager
          </HvListItem>
          <HvListItem
            onClick={(event) => handleListItemClick(event, 3)}
            selected={selectedItems[3]}
            role="option"
            style={{ userSelect: "none" }}
          >
            98004, Store Manager
          </HvListItem>
          <HvListItem
            onClick={(event) => handleListItemClick(event, 4)}
            selected={selectedItems[4]}
            role="option"
            style={{ userSelect: "none" }}
          >
            98005, Store Manager
          </HvListItem>
        </HvListContainer>
      </HvPanel>
    );
  };

  return <MultiSelectionWithShiftComponent />;
};
