import { useState, useEffect, CSSProperties, MouseEvent } from "react";
import { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import {
  HvListItem,
  HvListContainer,
  HvListContainerProps,
  HvTypography,
  HvLink,
  HvTooltip,
  HvPanel,
} from "@core/components";
import { theme } from "@hitachivantara/uikit-styles";
import {
  Calendar,
  DropRightXS,
  LineChart,
  Machine,
  Plane,
  User,
} from "@hitachivantara/uikit-react-icons";

// #region Styled components

const StyledPanel = styled(HvPanel)({
  width: 200,
});

const StyledOverflowTypography = styled(HvTypography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  lineHeight: "32px",
});

const StyledTitlePanel = styled(HvPanel)({
  float: "left",
  minWidth: 200,
});

const StyledLink = styled(HvLink)({
  ...(theme.typography.body as CSSProperties),
  textDecoration: "none",

  "&:focus": {
    boxShadow: "unset !important",
  },
});

// #endregion

const meta: Meta<typeof HvListContainer> = {
  title: "Components/List/List",
  component: HvListContainer,
  subcomponents: { HvListItem },
};
export default meta;

export const Main: StoryObj<HvListContainerProps> = {
  args: {
    interactive: true,
    condensed: false,
    disableGutters: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: ({ interactive, condensed, disableGutters }) => {
    return (
      <div
        style={{
          backgroundColor: theme.colors.atmo1,
          padding: 20,
          overflow: "auto",
          position: "relative",
          maxWidth: 220,
        }}
      >
        <HvListContainer
          interactive={interactive}
          condensed={condensed}
          disableGutters={disableGutters}
        >
          <HvListItem>98001, Store Manager</HvListItem>
          <HvListItem>98002, Store Manager</HvListItem>
          <HvListItem>98003, Store Manager</HvListItem>
          <HvListItem>98004, Store Manager</HvListItem>
          <HvListItem>98005, Store Manager</HvListItem>
          <HvListItem>98001, Store Manager</HvListItem>
          <HvListItem>98002, Store Manager</HvListItem>
          <HvListItem>98003, Store Manager</HvListItem>
        </HvListContainer>
      </div>
    );
  },
};

export const SingleSelection: StoryObj<HvListContainerProps> = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState(-1);

    return (
      <div
        style={{
          backgroundColor: theme.colors.atmo1,
          padding: 20,
          overflow: "auto",
          position: "relative",
          maxWidth: 220,
        }}
      >
        <HvListContainer interactive condensed aria-label="Stores">
          <HvListItem
            onClick={() => setSelectedItem(0)}
            selected={selectedItem === 0}
          >
            98001, Store Manager
          </HvListItem>
          <HvListItem
            onClick={() => setSelectedItem(1)}
            selected={selectedItem === 1}
          >
            98002, Store Manager
          </HvListItem>
          <HvListItem
            onClick={() => setSelectedItem(2)}
            selected={selectedItem === 2}
          >
            98003, Store Manager
          </HvListItem>
          <HvListItem
            onClick={() => setSelectedItem(3)}
            selected={selectedItem === 3}
          >
            98004, Store Manager
          </HvListItem>
          <HvListItem disabled>98005, Store Manager</HvListItem>
          <HvListItem
            onClick={() => setSelectedItem(5)}
            selected={selectedItem === 5}
          >
            98001, Store Manager
          </HvListItem>
          <HvListItem
            onClick={() => setSelectedItem(6)}
            selected={selectedItem === 6}
          >
            98002, Store Manager
          </HvListItem>
          <HvListItem
            onClick={() => setSelectedItem(7)}
            selected={selectedItem === 7}
          >
            98003, Store Manager
          </HvListItem>
        </HvListContainer>
      </div>
    );
  },
};

export const MultiSelection: StoryObj<HvListContainerProps> = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState({
      0: false,
      1: true,
      2: false,
      3: false,
      4: false,
    });

    const handleListItemClick = (_evt: MouseEvent, index: number) => {
      setSelectedItems((previousSelection) => {
        return {
          ...previousSelection,
          [index]: !previousSelection[index],
        };
      });
    };
    return (
      <div
        style={{
          backgroundColor: theme.colors.atmo1,
          padding: 20,
          overflow: "auto",
          position: "relative",
          maxWidth: 220,
        }}
      >
        <HvListContainer interactive condensed aria-label="Stores">
          <HvListItem
            onClick={(event) => handleListItemClick(event, 0)}
            selected={selectedItems[0]}
          >
            98001, Store Manager
          </HvListItem>
          <HvListItem
            onClick={(event) => handleListItemClick(event, 1)}
            selected={selectedItems[1]}
          >
            98002, Store Manager
          </HvListItem>
          <HvListItem
            onClick={(event) => handleListItemClick(event, 2)}
            selected={selectedItems[2]}
          >
            98003, Store Manager
          </HvListItem>
          <HvListItem
            onClick={(event) => handleListItemClick(event, 3)}
            selected={selectedItems[3]}
          >
            98004, Store Manager
          </HvListItem>
          <HvListItem
            onClick={(event) => handleListItemClick(event, 4)}
            selected={selectedItems[4]}
          >
            98005, Store Manager
          </HvListItem>
        </HvListContainer>
      </div>
    );
  },
};

export const WithIcons: StoryObj<HvListContainerProps> = {
  render: () => {
    return (
      <div
        style={{
          backgroundColor: theme.colors.atmo1,
          padding: 20,
          overflow: "auto",
          position: "relative",
          maxWidth: 220,
        }}
      >
        <HvListContainer
          interactive
          aria-label="Single Selection List with Left Icons Title"
        >
          <HvListItem startAdornment={<User />}>
            Advanced server DS120
          </HvListItem>
          <HvListItem startAdornment={<Calendar />}>
            Advanced server DS122
          </HvListItem>
          <HvListItem startAdornment={<Machine />}>
            Advanced server DS250
          </HvListItem>
          <HvListItem startAdornment={<Plane />} disabled>
            Advanced server DS530
          </HvListItem>
          <HvListItem startAdornment={<LineChart />}>
            Advanced server DS555
          </HvListItem>
        </HvListContainer>
      </div>
    );
  },
};

export const WithNavigationIcons: StoryObj<HvListContainerProps> = {
  render: () => {
    return (
      <div
        style={{
          backgroundColor: theme.colors.atmo1,
          padding: 20,
          overflow: "auto",
          position: "relative",
          maxWidth: 220,
        }}
      >
        <HvListContainer
          condensed
          interactive
          aria-label="Simple List With Navigation Icons"
        >
          <HvListItem endAdornment={<DropRightXS />}>Today</HvListItem>
          <HvListItem>Yesterday</HvListItem>
          <HvListItem>Last week</HvListItem>
          <HvListItem endAdornment={<DropRightXS />} disabled>
            Last month
          </HvListItem>
          <HvListItem endAdornment={<DropRightXS />}>Last year</HvListItem>
        </HvListContainer>
      </div>
    );
  },
};

export const WithTextOverflow: StoryObj<HvListContainerProps> = {
  render: () => {
    return (
      <StyledPanel>
        <HvListContainer
          condensed
          interactive
          aria-label="Single Selection List Title"
        >
          <HvListItem>Share</HvListItem>
          <HvListItem>Edit</HvListItem>
          <HvListItem>Remove</HvListItem>
          <HvListItem>Delete</HvListItem>
          <HvListItem>
            <HvTooltip
              title={
                <HvTypography>
                  The complete really big text that should be shown in the
                  tooltip
                </HvTypography>
              }
            >
              <StyledOverflowTypography component="div">
                Really big text that should be truncated
              </StyledOverflowTypography>
            </HvTooltip>
          </HvListItem>
        </HvListContainer>
      </StyledPanel>
    );
  },
};

export const WithTitle: StoryObj<HvListContainerProps> = {
  render: () => {
    return (
      <StyledTitlePanel>
        <HvTypography variant="label" style={{ margin: "0 10px 10px" }}>
          Options
        </HvTypography>
        <HvListContainer
          condensed
          interactive
          aria-label="Simple List With Title"
        >
          <HvListItem disabled>Share</HvListItem>
          <HvListItem>Edit</HvListItem>
          <HvListItem>
            <StyledLink route="https://www.hitachivantara.com">
              Remove
            </StyledLink>
          </HvListItem>
          <HvListItem>Delete</HvListItem>
          <HvListItem>
            <StyledLink route="https://www.hitachivantara.com">
              Update
            </StyledLink>
          </HvListItem>
        </HvListContainer>
      </StyledTitlePanel>
    );
  },
};

export const WithLink: StoryObj<HvListContainerProps> = {
  parameters: {
    eyes: { include: false },
  },
  render: () => {
    // Style link to prevent double-focus ring, bold, and underline
    const StyledHvLink = styled(HvLink)({
      color: theme.colors.secondary,
      ...(theme.typography.body as CSSProperties),
      textDecoration: "none",
      "&:focus": {
        boxShadow: "unset !important",
      },
    });

    return (
      <div
        style={{
          backgroundColor: theme.colors.atmo1,
          padding: 20,
          overflow: "auto",
          position: "relative",
          maxWidth: 220,
        }}
      >
        <HvTypography variant="label" style={{ margin: "0 10px 10px" }}>
          Options
        </HvTypography>
        <HvListContainer
          condensed
          interactive
          aria-label="Simple List With Title"
        >
          <HvListItem disabled>Share</HvListItem>
          <HvListItem>Edit</HvListItem>
          <HvListItem>
            <StyledHvLink route="https://www.hitachivantara.com">
              Remove
            </StyledHvLink>
          </HvListItem>
          <HvListItem>Delete</HvListItem>
          <HvListItem>
            <StyledHvLink route="https://www.hitachivantara.com">
              Update
            </StyledHvLink>
          </HvListItem>
        </HvListContainer>
      </div>
    );
  },
};

export const MultiSelectWithShift: StoryObj<HvListContainerProps> = {
  parameters: {
    eyes: { include: false },
  },
  render: () => {
    const initialSelection = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    };

    const useKeyboardSelection = () => {
      const [selectionAnchor, setSelectionAnchor] = useState<number>();
      const [selectedItems, setSelectedItems] = useState({
        ...initialSelection,
      });

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

      const getUpdatedSelectionArray = (
        initialSet,
        selectionStart,
        selectionEnd
      ) => {
        return Object.fromEntries(
          flipSelection(
            Object.entries(initialSet).slice(selectionStart, selectionEnd + 1)
          )
        );
      };

      const getIndexOfSelectedItem = (selectionSet) => {
        const preExistingSelectedItems = Object.entries(selectionSet).filter(
          (e) => e[1] === true
        )[0];
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
            updatedArray = getUpdatedSelectionArray(
              initialSelection,
              indexSelectedItem,
              index
            );

            leftSet = updatedArray;
            rightSet = undefined;
          } else {
            setSelectionAnchor(index);
            updatedArray = getUpdatedSelectionArray(
              initialSelection,
              index,
              indexSelectedItem
            );

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

        if (selectionAnchor === null || selectionAnchor === undefined) {
          [leftSet, rightSet] = setSelectionSet(index);
        } else {
          const startOfSlice =
            selectionAnchor < index ? selectionAnchor : index;
          const endOfSlice = index > selectionAnchor ? index : selectionAnchor;

          updatedArray = getUpdatedSelectionArray(
            initialSelection,
            startOfSlice,
            endOfSlice
          );

          leftSet =
            Object.keys(updatedArray).length <=
            getSelectedItemsCount(selectedItems)
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
          setSelectedItems(handleShiftCLick(index));
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
              getSelectedItemsCount(selectedItems) ===
              Object.keys(initialSelection).length
                ? selectedItems[index]
                : !selectedItems[index],
          };

          setSelectedItems(() => {
            return selectedSet;
          });
        }
      };

      useEffect(() => {
        const existingSelections = Object.entries(selectedItems).filter(
          (item) => {
            return item[1] === true;
          }
        )[0];

        if (existingSelections === undefined) {
          setSelectionAnchor(undefined);
        }
      }, [selectedItems, selectionAnchor]);

      return { selectedItems, handleListItemClick };
    };

    const MultiSelectionWithShiftComponent = () => {
      const { selectedItems, handleListItemClick } = useKeyboardSelection();

      return (
        <div
          style={{
            backgroundColor: theme.colors.atmo1,
            padding: 20,
            overflow: "auto",
            position: "relative",
            maxWidth: 220,
          }}
        >
          <HvListContainer
            interactive
            condensed
            aria-label="Stores"
            role="listbox"
          >
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
        </div>
      );
    };

    return <MultiSelectionWithShiftComponent />;
  },
};
