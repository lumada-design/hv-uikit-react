import React from "react";
import { mount } from "enzyme";

import { LogIn, User } from "@hitachivantara/uikit-react-icons";
import { HvAvatar, HvButton, HvProvider } from "../..";

import theme from "../../theme";

function returnAvatarAndRootNode(wrapper) {
  const avatar = wrapper.find(HvAvatar);

  const rootNode = avatar // WithStyles
    .childAt(0) // HvAvatar
    .childAt(0) // WithStyles
    .childAt(0) // Avatar (mui)
    .childAt(0); // root dom node

  return [avatar, rootNode];
}

function mountAndReturnAvatarAndRootNode(component) {
  const wrapper = mount(component);

  return [wrapper, ...returnAvatarAndRootNode(wrapper)];
}

describe("Avatar ", () => {
  describe("image avatar", () => {
    it("should render a div containing an img", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar src="something.jpg" alt="Hello World!" />
        </HvProvider>
      );

      const img = rootNode.childAt(0);

      expect(img.name()).toEqual("img");
      expect(img.prop("src")).toBe("something.jpg");
      expect(img.prop("alt")).toBe("Hello World!");
    });

    it("should be able to add more props to the image", () => {
      const onError = jest.fn();

      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar src="something.jpg" imgProps={{ onError, other: "my value" }} />
        </HvProvider>
      );

      const img = rootNode.childAt(0);
      img.simulate("error");

      expect(onError).toHaveBeenCalled();
      expect(onError.mock.calls.length).toBe(1);

      expect(img.prop("other")).toBe("my value");
    });

    it("should not render children", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar src="something.jpg">MB</HvAvatar>
        </HvProvider>
      );

      const childs = rootNode.children();
      expect(childs.length).toBe(1);
      expect(rootNode.text()).toBe("");
    });

    it("snapshot", async () => {
      const [, avatar] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar src="something.jpg" imgProps={{ onError: () => 1, other: "my value" }}>
            MB
          </HvAvatar>
        </HvProvider>
      );

      expect(avatar).toBeDefined();
      expect(avatar).toMatchSnapshot();
    });
  });

  describe("icon avatar", () => {
    const [, avatar, rootNode] = mountAndReturnAvatarAndRootNode(
      <HvProvider>
        <HvAvatar>
          <LogIn iconSize="XS" />
        </HvAvatar>
      </HvProvider>
    );

    it("should render a div containing an svg icon", () => {
      const icon = rootNode.childAt(0);
      expect(icon.type()).toBe(LogIn);
    });

    it("snapshot", async () => {
      expect(avatar).toBeDefined();
      expect(avatar).toMatchSnapshot();
    });
  });

  describe("letter avatar", () => {
    const [, avatar, rootNode] = mountAndReturnAvatarAndRootNode(
      <HvProvider>
        <HvAvatar>OT</HvAvatar>
      </HvProvider>
    );

    it("should render a div containing a string", () => {
      expect(rootNode.text()).toBe("OT");
    });

    it("snapshot", async () => {
      expect(avatar).toBeDefined();
      expect(avatar).toMatchSnapshot();
    });
  });

  describe("default avatar", () => {
    const [, avatar, rootNode] = mountAndReturnAvatarAndRootNode(
      <HvProvider>
        <HvAvatar />
      </HvProvider>
    );

    it("should render a div containing the user icon", () => {
      const icon = rootNode.childAt(0);
      expect(icon.type()).toBe(User);
    });

    it("snapshot", async () => {
      expect(avatar).toBeDefined();
      expect(avatar).toMatchSnapshot();
    });
  });

  describe("colors", () => {
    it("should inline default colors", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar />
        </HvProvider>
      );

      const inlineStyle = rootNode.prop("style");
      expect(inlineStyle).toHaveProperty("backgroundColor", theme.hv.palette.accent.acce1);
      expect(inlineStyle).toHaveProperty("color", theme.hv.palette.atmosphere.atmo1);
    });

    it("should inline custom colors", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar backgroundColor="sema1" color="sema2" />
        </HvProvider>
      );

      const inlineStyle = rootNode.prop("style");
      expect(inlineStyle).toHaveProperty("backgroundColor", theme.hv.palette.semantic.sema1);
      expect(inlineStyle).toHaveProperty("color", theme.hv.palette.semantic.sema2);
    });

    it("should set default user icon color", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar backgroundColor="sema1" color="sema2" />
        </HvProvider>
      );

      const icon = rootNode.childAt(0);
      expect(icon.prop("color")).toStrictEqual("sema2");
    });

    it("should not inline colors when displaying an image", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar src="something.jpg" backgroundColor="sema1" color="sema2" />
        </HvProvider>
      );

      const inlineStyle = rootNode.prop("style");
      expect(inlineStyle).not.toHaveProperty("backgroundColor");
      expect(inlineStyle).not.toHaveProperty("color");
    });
  });

  describe("sizes", () => {
    it("should set default user icon size to size bellow", () => {
      const getDefaultUserIcon = (size) => {
        const [, , rootNode] = mountAndReturnAvatarAndRootNode(
          <HvProvider>
            <HvAvatar size={size} />
          </HvProvider>
        );

        const icon = rootNode.childAt(0);
        return icon;
      };

      expect(getDefaultUserIcon("L").prop("iconSize")).toStrictEqual("M");
      expect(getDefaultUserIcon("M").prop("iconSize")).toStrictEqual("S");
      expect(getDefaultUserIcon("S").prop("iconSize")).toStrictEqual("XS");
    });
  });

  describe("container", () => {
    it("should default to div", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar />
        </HvProvider>
      );

      expect(rootNode.name()).toEqual("div");
    });

    it("should support html tag", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar component="span" />
        </HvProvider>
      );

      expect(rootNode.name()).toEqual("span");
    });

    it("should support custom tag", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar component="not-standard" />
        </HvProvider>
      );

      expect(rootNode.name()).toEqual("not-standard");
    });

    it("should support react component", () => {
      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar component={HvButton} />
        </HvProvider>
      );

      expect(rootNode.type()).toBe(HvButton);
      expect(rootNode.find(User)).toBeDefined();
    });
  });

  describe("props", () => {
    it("should merge user classes and spread custom props to the root node", () => {
      const className = "MyOwnClass";
      const customValue = "my value";

      const [, , rootNode] = mountAndReturnAvatarAndRootNode(
        <HvProvider>
          <HvAvatar className={className} custom={customValue} />
        </HvProvider>
      );

      expect(rootNode.hasClass(className)).toBe(true);
      expect(rootNode.prop("custom")).toBe(customValue);
    });
  });
});
