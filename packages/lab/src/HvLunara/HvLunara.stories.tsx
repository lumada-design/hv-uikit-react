import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvRadio,
  HvRadioGroup,
  HvSwitch,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Email, Phone } from "@hitachivantara/uikit-react-icons";

import { HvLunara, HvLunaraProps } from "./HvLunara";

// Main
const meta: Meta<typeof HvLunara> = {
  title: "Lab/HvLunara/HvLunara",
  component: HvLunara,
};
export default meta;

export const Main: StoryObj<HvLunaraProps> = {
  args: {
    label: "Shortcuts",
    options: [
      { item: "Download", callback: () => alert("Clicked Download Button") },
      { item: "Like", callback: () => alert("Clicked Like Button") },
      { item: "Share", callback: () => alert("Clicked Share Button") },
    ],
  },
  render: (args) => {
    return <HvLunara {...args} />;
  },
};

// Icons as Buttons
export const IconButton: StoryObj<HvLunaraProps> = {
  args: {
    position: "top-right",
    label: "Contact Us",
    options: [
      {
        item: (
          <>
            <Phone
              aria-label="call"
              color="black"
              style={{ width: 20, height: 21 }}
            />{" "}
            &nbsp;<span>Call</span>
          </>
        ),
        callback: () => alert("Clicked Call Button"),
      },
      {
        item: (
          <>
            <Email
              aria-label="call"
              color="black"
              style={{ width: 20, height: 21 }}
            />{" "}
            &nbsp;<span>Email</span>
          </>
        ),
        callback: () => alert("Clicked Email Button"),
      },
    ],
  },
  render: (args) => {
    return <HvLunara {...args} />;
  },
};

// Disabled
export const DisabledButton: StoryObj<HvLunaraProps> = {
  args: {
    position: "top-right",
    label: "Contact Us",
    options: [
      {
        item: (
          <>
            <Phone
              aria-label="call"
              color="black"
              style={{ width: 20, height: 21 }}
            />{" "}
            &nbsp;<span>Call</span>
          </>
        ),
        callback: () => alert("Clicked Call Button"),
        disabled: true,
      },
      {
        item: "Email",
        callback: () => alert("Clicked Email Button"),
        disabled: true,
      },
    ],
  },
  render: (args) => {
    return <HvLunara {...args} />;
  },
};

// Variants
export const Variants: StoryObj<HvLunaraProps> = {
  args: {
    label: "Resources",
    position: "top-right" as HvLunaraProps["position"],
    options: [
      {
        item: "Hitachi",
        callback: () => {
          alert("Clicked Hitachi Button");
        },
      },
      {
        item: "External",
        callback: () => {
          "Clicked External Button";
        },
      },
    ],
  },
  render: (args) => {
    const variants = {
      primary: "top-right",
      secondary: "center-right",
      light: "bottom-right",
    };
    return (
      <>
        {Object.entries(variants).map(([variant, position]) => (
          <HvLunara
            key={variant}
            variant={variant as HvLunaraProps["variant"]}
            position={position as HvLunaraProps["position"]}
            {...args}
          />
        ))}
      </>
    );
  },
};

// Controlled
export const Controlled: StoryObj<HvLunaraProps> = {
  args: {
    label: "Menu",
    position: "top-right" as HvLunaraProps["position"],
    options: [
      { item: "Home", callback: () => alert("Navigating to Home") },
      { item: "Services", callback: () => alert("Navigating to Services") },
      {
        item: "Our Offerings",
        callback: () => alert("Navigating to Our Offerings"),
      },
      {
        item: "Our Policies",
        callback: () => alert("Navigating to Policies"),
      },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState<HvLunaraProps["variant"]>("light");
    const [outline, setOutline] = useState<HvLunaraProps["outline"]>(false);
    const [btnRadius, setbtnRadius] =
      useState<HvLunaraProps["btnRadius"]>("round");
    const variants = ["light", "dark", "primary", "secondary"];
    const btnVariants = ["base", "round", "full", "none"];
    return (
      <div style={{ display: "inline-flex", gap: 100, margin: 20 }}>
        <div>
          <HvTypography variant="mTitle">Variants</HvTypography>
          <br />
          {variants.map((item) => {
            return (
              <div key={item}>
                <HvButton
                  onClick={() => setValue(item as HvLunaraProps["variant"])}
                  variant={value === item ? "positive" : "primary"}
                >
                  {item}
                </HvButton>
                <br />
                <br />
              </div>
            );
          })}
        </div>
        <div>
          <HvSwitch
            label="Outline"
            value="off"
            onChange={() => setOutline(!outline)}
          />
        </div>
        <div>
          <HvRadioGroup label="Button Radius">
            {btnVariants.map((item) => {
              return (
                <HvRadio
                  key={item}
                  label={item}
                  value={item}
                  onChange={() =>
                    setbtnRadius(item as HvLunaraProps["btnRadius"])
                  }
                  checked={btnRadius === item}
                />
              );
            })}
          </HvRadioGroup>
        </div>
        <HvLunara
          variant={value}
          btnRadius={btnRadius}
          outline={outline}
          {...args}
        />
      </div>
    );
  },
};

// Positional
export const Positions: StoryObj<HvLunaraProps> = {
  args: {
    label: "Menu",
    options: [
      {
        item: "Home",
        callback: () => {
          alert("Clicked home Button");
        },
      },
      {
        item: "Products",
        callback: () => {
          alert("Clicked Products Button");
        },
      },
    ],
  },
  render: (args) => {
    const position = [
      "top-left",
      "top-right",
      "center-left",
      "center-right",
      "bottom-left",
      "bottom-right",
    ];
    return (
      <div>
        {position.map((pos) => {
          return (
            <HvLunara
              key={pos}
              position={pos as HvLunaraProps["position"]}
              {...args}
            />
          );
        })}
      </div>
    );
  },
};
