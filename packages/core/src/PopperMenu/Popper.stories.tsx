import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HvAdornment,
  HvButton,
  HvIconButton,
  HvIconContainer,
  HvInput,
  HvPopperMenu,
  HvPopperMenuGroup,
  HvPopperMenuItems,
  HvPopperMenuProps,
  HvSearchInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { HvIcon } from "../icons";

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
            anchorEl={currentRef}
            showSelection
            showSearch
            onChange={(selectedIds) => setSelectedIds(selectedIds)}
            items={[
              {
                items: [
                  { id: "1", label: "Simple Item 1" },
                  {
                    id: "2",
                    label: "Simple Item 2",
                  },
                ],
              },
              {
                title: "Group 1",
                type: "checkbox",
                items: [
                  { id: "3", label: "Checkbox Item 1" },
                  { id: "4", label: "Checkbox Item 2" },
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
            ]}
            // items={[
            //   { id: "1", label: "Item 1" },
            //   { id: "2", label: "Item 2" },
            // ]}
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
      const filteredItems = (defaultItems as HvPopperMenuGroup[]).filter(
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
          <HvButton onClick={() => setSelectedIds(["5", "6"])}>
            Simple items
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
            showSearch
            showSelection
            anchorEl={inputRef.current}
            selected={selectedIds}
            onChange={(val) => setSelectedIds(val)}
            search={search}
            onSearchChange={(search) => handleSearch(search)}
            items={items}
          />
        </div>
      </div>
    );
  },
};
