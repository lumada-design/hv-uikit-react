import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HvAdornment,
  HvBadge,
  HvButton,
  HvCheckBox,
  HvCheckBoxGroup,
  HvIconButton,
  HvIconContainer,
  HvInput,
  HvListContainer,
  HvListItem,
  HvPopperMenu,
  HvPopperMenuGroup,
  HvPopperMenuItems,
  HvPopperMenuProps,
  HvSearchInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { HvIcon } from "../icons";
import type { HvPopperMenuGroup as HvPopperMenuGroupType } from "../PopperMenu/types";

const meta: Meta<typeof HvPopperMenu> = {
  title: "Components/PopperMenu",
  component: HvPopperMenu,
};
export default meta;

export const Main: StoryObj<HvPopperMenuProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const iconButtonRef = useRef<HTMLButtonElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [items, setItems] = useState<HvPopperMenuItems>();

    useEffect(() => {
      setItems([
        {
          items: [
            {
              id: "1",
              label: "Actionable Item 1",
              onClick: (_, id) => alert(`Clicked item ${id}`),
            },
            {
              id: "2",
              label: (
                <div className="flex items-center gap-xxs">
                  <HvIconContainer>
                    <div className="i-ph-gear" />
                  </HvIconContainer>
                  <HvTypography>Actionable Item 2</HvTypography>
                  <HvBadge
                    label="7"
                    color="bgPageSecondary"
                    classes={{ badge: "relative color-text", root: "w-0" }}
                  />
                </div>
              ),
              onClick: (_, id) => alert(`Clicked item ${id}`),
            },
          ],
        },
        {
          title: "Group 1",
          type: "checkbox",
          items: [
            {
              id: "3",
              label: (
                <div className="flex items-center gap-xxs">
                  <HvTypography>Checkbox Item 1</HvTypography>
                  <HvBadge
                    label="3"
                    color="bgPageSecondary"
                    classes={{ badge: "relative color-text", root: "w-0" }}
                  />
                </div>
              ),
            },
            { id: "4", label: "Checkbox Item 2 with a very long name" },
          ],
        },
        {
          title: "Group 2",
          type: "radio",
          items: [
            { id: "5", label: "Radio Item 1" },
            { id: "6", label: "Radio Item 2" },
            { id: "7", label: "Radio Item 3" },
          ],
        },
        {
          title: "Group 3",
          type: "switch",
          items: [
            { id: "8", label: "Switch Item 1" },
            { id: "9", label: "Switch Item 2" },
            { id: "10", label: "Switch Item 3" },
          ],
        },
      ]);
    }, []);

    const [currentRef, setCurrentRef] = useState<
      HTMLButtonElement | HTMLInputElement | null
    >(null);

    const handleToggle = (ref: HTMLButtonElement | HTMLInputElement | null) => {
      setOpen((o) => !o);
      setCurrentRef(ref);
    };

    return (
      <div className="flex flex-col gap-md">
        <HvTypography>Selected Ids: {selectedIds.join(", ")}</HvTypography>
        <div className="flex flex gap-sm">
          <HvButton
            onClick={() => handleToggle(buttonRef.current)}
            ref={buttonRef}
          >
            Popper Menu
          </HvButton>
          <HvInput
            ref={inputRef}
            placeholder="Select some items"
            endAdornment={
              <HvAdornment
                icon={<HvIcon name="CaretDown" size="xs" rotate={open} />}
                onClick={() => handleToggle(inputRef.current)}
              />
            }
          />
          <HvIconButton
            title="More Options"
            ref={iconButtonRef}
            onClick={() => handleToggle(iconButtonRef.current)}
          >
            <HvIconContainer>
              <div className="i-ph-gear" />
            </HvIconContainer>
          </HvIconButton>

          <HvPopperMenu
            open={open}
            onClose={() => setOpen(false)}
            anchorEl={currentRef}
            showSelection
            showSearch
            onChange={(selectedIds) => setSelectedIds(selectedIds)}
            items={items}
            actions={
              <>
                <HvButton
                  variant="primarySubtle"
                  onClick={() => setOpen(false)}
                  startIcon={<div className="i-ph-check" />}
                  className="w-full"
                >
                  Apply
                </HvButton>
              </>
            }
          />
        </div>
      </div>
    );
  },
};

export const Controlled: StoryObj<HvPopperMenuProps> = {
  render: () => {
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [search, setSearch] = useState("");

    const defaultItems: HvPopperMenuItems = [
      {
        title: "Group 1",
        type: "checkbox",
        items: [
          { id: "1", label: "Checkbox Item 1" },
          { id: "2", label: "Checkbox Item 2" },
        ],
      },
      {
        title: "Group 2",
        type: "radio",
        items: [
          { id: "3", label: "Radio Item 1" },
          { id: "4", label: "Radio Item 2" },
        ],
      },
      {
        items: [
          { id: "5", label: "Simple Item 1" },
          {
            id: "6",
            label: "Simple Item 2",
          },
        ],
      },
    ];

    const [items, setItems] = useState<HvPopperMenuItems>(defaultItems);

    const handleSearch = (search: string) => {
      if (!search) {
        setItems(defaultItems);
        setSearch("");
        return;
      }

      setSearch(search);

      if (!items?.length) {
        setItems([]);
        return;
      }

      // Search only on the group.title prop
      const filteredItems = (defaultItems as HvPopperMenuGroupType[]).filter(
        (group) => group.title?.toLowerCase().includes(search.toLowerCase()),
      );

      setItems(filteredItems);
    };

    return (
      <div className="flex gap-md">
        <div className="flex flex-col gap-sm items-center w-200px">
          <HvSearchInput
            placeholder="Search..."
            onChange={(_, val) => handleSearch(val)}
          />
          <HvButton onClick={() => setSelectedIds(["1", "2"])}>
            Check boxes
          </HvButton>
          <HvButton onClick={() => setSelectedIds(["3"])}>
            Radio buttons
          </HvButton>
          <HvButton onClick={() => setSelectedIds(["1", "2", "5", "6"])}>
            Selected all
          </HvButton>
          <HvTypography>Selected Ids: {selectedIds.join(", ")}</HvTypography>
        </div>
        <div>
          <HvInput
            ref={inputRef}
            placeholder="Select some items"
            endAdornment={
              <HvAdornment
                icon={<HvIcon name="CaretDown" size="xs" rotate={open} />}
                onClick={() => setOpen(!open)}
              />
            }
          />
          <HvPopperMenu
            open={open}
            showSearch={false}
            showSelection
            anchorEl={inputRef.current}
            selected={selectedIds}
            onChange={(val) => setSelectedIds(val)}
            search={search}
            onSearchChange={(search) => handleSearch(search)}
            items={items}
            actions={<HvButton onClick={() => setOpen(false)}>Cancel</HvButton>}
          />
        </div>
      </div>
    );
  },
};

export const Composable: StoryObj<HvPopperMenuProps> = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const iconBtnRef = useRef<HTMLButtonElement | null>(null);

    const handleChange = (id: string) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        return [...prev, id];
      });
    };

    return (
      <div className="flex flex-col gap-md">
        <HvTypography>Selected Ids: {selectedIds.join(", ")}</HvTypography>
        <HvIconButton
          title="More Options"
          ref={iconBtnRef}
          onClick={() => setOpen((o) => !o)}
        >
          <HvIconContainer>
            <div className="i-ph-gear" />
          </HvIconContainer>
        </HvIconButton>
        <HvPopperMenu open={open} anchorEl={iconBtnRef.current}>
          <HvTypography variant="title3">Fully custom</HvTypography>
          <HvPopperMenuGroup title="Group 1">
            <HvListContainer selectable interactive>
              <HvListItem
                onClick={() => alert(`What do you want to import?`)}
                className="m-b-0px! flex gap-xxs"
              >
                <HvIconContainer>
                  <div className="i-ph-download-simple" />
                </HvIconContainer>
                Import
              </HvListItem>
              <HvListItem
                onClick={() => alert(`Exporting...`)}
                className="m-b-0px! flex gap-xxs"
              >
                <HvIconContainer>
                  <div className="i-ph-export" />
                </HvIconContainer>
                Export
              </HvListItem>
              <HvListItem
                onClick={() => alert("Share it!")}
                className="m-b-0px! flex gap-xxs"
              >
                <HvIconContainer>
                  <div className="i-ph-share-network" />
                </HvIconContainer>
                Share
              </HvListItem>
            </HvListContainer>
          </HvPopperMenuGroup>
          <HvPopperMenuGroup title="Group 2">
            <HvCheckBoxGroup>
              <HvCheckBox
                value="4"
                label="Option 1"
                onClick={() => handleChange("4")}
                checked={selectedIds.includes("4")}
              />
              <HvCheckBox
                value="5"
                label="Option 2"
                onClick={() => handleChange("5")}
                checked={selectedIds.includes("5")}
              />
              <HvCheckBox
                value="6"
                label="Option 3"
                onClick={() => handleChange("6")}
                checked={selectedIds.includes("6")}
              />
            </HvCheckBoxGroup>
          </HvPopperMenuGroup>
        </HvPopperMenu>
      </div>
    );
  },
};
