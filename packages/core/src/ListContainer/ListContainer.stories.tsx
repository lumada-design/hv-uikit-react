import { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvListContainer,
  HvListContainerProps,
  HvListItem,
  HvOverflowTooltip,
  HvPanel,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Calendar,
  DropRightXS,
  LineChart,
  Machine,
  Plane,
  User,
} from "@hitachivantara/uikit-react-icons";

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
  render: (args) => {
    return (
      <HvPanel style={{ maxWidth: 220 }}>
        <HvListContainer {...args}>
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
  },
};

export const SingleSelection: StoryObj<HvListContainerProps> = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState(0);

    return (
      <HvPanel style={{ maxWidth: 220 }}>
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
      </HvPanel>
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

    const handleListItemClick = (
      event: React.MouseEvent,
      index: keyof typeof selectedItems,
    ) => {
      setSelectedItems((previousSelection) => ({
        ...previousSelection,
        [index]: !previousSelection[index],
      }));
    };

    return (
      <HvPanel style={{ maxWidth: 220 }}>
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
      </HvPanel>
    );
  },
};

export const WithIcons: StoryObj<HvListContainerProps> = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: theme.space.sm }}>
        <HvPanel style={{ maxWidth: 220 }}>
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
        </HvPanel>
        <HvPanel style={{ overflow: "auto", maxWidth: 220 }}>
          <HvListContainer
            condensed
            interactive
            aria-label="Simple List With Navigation Icons"
          >
            <HvListItem endAdornment={<DropRightXS />}>Today</HvListItem>
            <HvListItem>
              <HvTypography component="a" href="#yesterday">
                Yesterday
              </HvTypography>
            </HvListItem>
            <HvListItem>
              <HvTypography component="a" href="#last-week">
                Last week
              </HvTypography>
            </HvListItem>
            <HvListItem endAdornment={<DropRightXS />} disabled>
              Last month
            </HvListItem>
            <HvListItem endAdornment={<DropRightXS />}>Last year</HvListItem>
          </HvListContainer>
        </HvPanel>
      </div>
    );
  },
};

export const WithTitle: StoryObj<HvListContainerProps> = {
  render: () => {
    return (
      <HvPanel style={{ width: 220 }}>
        <HvTypography variant="label" style={{ marginLeft: theme.space.xs }}>
          Options
        </HvTypography>
        <HvListContainer
          condensed
          interactive
          aria-label="Simple List With Title"
        >
          <HvListItem disabled>Share</HvListItem>
          <HvListItem>Edit</HvListItem>
          <HvListItem>Remove</HvListItem>
          <HvListItem>Delete</HvListItem>
          <HvListItem>
            <HvOverflowTooltip data="The complete really big text that should be shown in the tooltip" />
          </HvListItem>
        </HvListContainer>
      </HvPanel>
    );
  },
};

export const MultiSelectWithShift: StoryObj<HvListContainerProps> = {
  render: () => {
    const initialSelection: Record<number, boolean> = {
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

      const flipSelection = (selectionToFlip: [string, boolean][]) => {
        const updatedSelection = selectionToFlip.map((item) => {
          const updatedEntries = [item[0], !item[1]];
          return updatedEntries;
        });

        return updatedSelection;
      };

      const getSelectedItemsCount = (selectionSet: typeof selectedItems) => {
        return Object.values(selectionSet).filter((e) => e === true).length;
      };

      const getUpdatedSelectionArray = (
        initialSet: typeof initialSelection,
        selectionStart: number,
        selectionEnd: number,
      ) => {
        return Object.fromEntries(
          flipSelection(
            Object.entries(initialSet).slice(selectionStart, selectionEnd + 1),
          ),
        );
      };

      const getIndexOfSelectedItem = (selectionSet: typeof selectedItems) => {
        const preExistingSelectedItems = Object.entries(selectionSet).filter(
          (e) => e[1] === true,
        )[0];
        return +preExistingSelectedItems[0];
      };

      const setSelectionSet = (index: number) => {
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
              index,
            );

            leftSet = updatedArray;
            rightSet = undefined;
          } else {
            setSelectionAnchor(index);
            updatedArray = getUpdatedSelectionArray(
              initialSelection,
              index,
              indexSelectedItem,
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

      const handleShiftClick = (index: number): any => {
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
            endOfSlice,
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

      const handleListItemClick = (evt: any, index: number) => {
        if (evt.shiftKey) {
          setSelectedItems(handleShiftClick(index));
        } else if (evt.metaKey || evt.ctrlKey) {
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
          },
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
        <HvPanel style={{ maxWidth: 220 }}>
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
        </HvPanel>
      );
    };

    return <MultiSelectionWithShiftComponent />;
  },
};
