import { vi } from "vitest";
import { HvAppShellAppSwitcherConfig } from "@hitachivantara/app-shell-shared";
import { HvButton } from "@hitachivantara/uikit-react-core";

import HeaderActions from "..";
import renderTestProvider from "../../../../../tests/testUtils";
import AppSwitcherToggle from "../InternalActions/AppSwitcherToggle";
import ColorModeSwitcher from "../InternalActions/ColorModeSwitcher";
import HelpButton from "../InternalActions/HelpButton";

const lazy = vi.fn();

vi.mock("react", async () => {
  const mod = await vi.importActual("react");
  return {
    ...(mod as object),
    lazy: () => lazy,
  };
});

const appSwitcherToggleConfig: HvAppShellAppSwitcherConfig = {
  title: "Dummy App Switcher",
  apps: [
    {
      label: "dummyApp1",
      description: "dummyAppDescription1",
      url: "dummyAppUrl1",
      target: "SELF",
    },
  ],
};

const buttonHelpConfig = {
  url: "http://dummy.com",
  description: "Help Button Description",
};

describe("`HeaderActions`", () => {
  beforeEach(() => {
    lazy.mockReset();
  });

  it("should render all the configured dynamic actions and with correct order", async () => {
    const DummyActionComponent1 = () => (
      <div aria-label="dummyActionComponent1">Dummy Action 1</div>
    );
    const DummyActionComponent2 = () => (
      <div aria-label="dummyActionComponent2">Dummy Action 2</div>
    );
    const DummyActionComponent3 = () => (
      <div aria-label="dummyActionComponent3">Dummy Action 3</div>
    );

    lazy
      .mockImplementationOnce(() => <DummyActionComponent1 />)
      .mockImplementationOnce(() => <DummyActionComponent2 />)
      .mockImplementationOnce(() => <DummyActionComponent3 />);

    const { getByLabelText } = await renderTestProvider(<HeaderActions />, {
      header: {
        actions: [
          { bundle: "@hv/testing/dummy-action1" },
          { bundle: "@hv/testing/dummy-action2" },
          { bundle: "@hv/testing/dummy-action3" },
        ],
      },
    });

    const dummyAction1Element = getByLabelText("dummyActionComponent1");
    const dummyAction2Element = getByLabelText("dummyActionComponent2");
    const dummyAction3Element = getByLabelText("dummyActionComponent3");

    expect(lazy).toHaveBeenCalledTimes(3);
    expect(dummyAction1Element).toBeInTheDocument();
    expect(dummyAction2Element).toBeInTheDocument();
    expect(dummyAction3Element).toBeInTheDocument();
    expect(
      dummyAction1Element!.compareDocumentPosition(dummyAction2Element!),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      dummyAction2Element!.compareDocumentPosition(dummyAction3Element!),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("should render the HelpButton internal action when configured", async () => {
    lazy.mockImplementation(() => <HelpButton {...buttonHelpConfig} />);

    const { queryByRole } = await renderTestProvider(<HeaderActions />, {
      header: {
        actions: [
          {
            bundle: "@hv/help-client/button.js",
            config: { ...buttonHelpConfig },
          },
        ],
      },
    });

    expect(lazy).toHaveBeenCalled();
    expect(
      queryByRole("link", { name: "Help Button Description" }),
    ).toBeInTheDocument();
  });

  it("should render the AppSwitcherToggle internal action when configured", async () => {
    lazy.mockImplementation(() => (
      <AppSwitcherToggle {...appSwitcherToggleConfig} />
    ));

    const { queryByRole } = await renderTestProvider(<HeaderActions />, {
      header: {
        actions: [
          {
            bundle: "@hv/app-switcher-client/toggle.js",
            config: { ...appSwitcherToggleConfig },
          },
        ],
      },
    });

    expect(lazy).toHaveBeenCalled();
    expect(
      queryByRole("button", { name: "Dummy App Switcher" }),
    ).toBeInTheDocument();
  });

  it("should render the ColorModeSwitcher internal action when configured", async () => {
    lazy.mockImplementation(() => <ColorModeSwitcher />);

    const { queryByRole } = await renderTestProvider(<HeaderActions />, {
      header: {
        actions: [
          {
            bundle: "@hv/app-switcher-client/toggle.js",
            config: { ...appSwitcherToggleConfig },
          },
        ],
      },
    });

    expect(lazy).toHaveBeenCalled();
    expect(
      queryByRole("button", { name: "Switch color mode" }),
    ).toBeInTheDocument();
  });

  it("should render all the internal actions and dynamic action in the right order", async () => {
    const DummyActionComponent1 = () => (
      <HvButton aria-label="dummyActionComponent1">Dummy Action 1</HvButton>
    );
    const DummyActionComponent2 = () => (
      <HvButton aria-label="dummyActionComponent2">Dummy Action 2</HvButton>
    );
    const DummyActionComponent3 = () => (
      <HvButton aria-label="dummyActionComponent3">Dummy Action 3</HvButton>
    );

    lazy
      .mockImplementationOnce(() => <DummyActionComponent3 />)
      .mockImplementationOnce(() => <HelpButton {...buttonHelpConfig} />)
      .mockImplementationOnce(() => <DummyActionComponent1 />)
      .mockImplementationOnce(() => (
        <AppSwitcherToggle {...appSwitcherToggleConfig} />
      ))
      .mockImplementationOnce(() => <ColorModeSwitcher />)
      .mockImplementationOnce(() => <DummyActionComponent2 />);

    const { queryByRole } = await renderTestProvider(<HeaderActions />, {
      header: {
        actions: [
          { bundle: "@hv/testing/dummy-action3" },
          {
            bundle: "@hv/help-client/button.js",
            config: { ...buttonHelpConfig },
          },
          { bundle: "@hv/testing/dummy-action1" },
          {
            bundle: "@hv/app-switcher-client/toggle.js",
            config: { ...appSwitcherToggleConfig },
          },
          {
            bundle: "@hv/theming-client/colorModeSwitcher.js",
          },
          { bundle: "@hv/testing/dummy-action2" },
        ],
      },
    });

    const dummyAction1Element = queryByRole("button", {
      name: "dummyActionComponent1",
    });
    const dummyAction2Element = queryByRole("button", {
      name: "dummyActionComponent2",
    });
    const dummyAction3Element = queryByRole("button", {
      name: "dummyActionComponent3",
    });
    const helpButtonElement = queryByRole("link", {
      name: "Help Button Description",
    });
    const appSwitcherToggleElement = queryByRole("button", {
      name: "Dummy App Switcher",
    });
    const colorModeSwitcherElement = queryByRole("button", {
      name: "Switch color mode",
    });

    expect(lazy).toHaveBeenCalledTimes(6);
    expect(
      dummyAction3Element!.compareDocumentPosition(helpButtonElement!),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      helpButtonElement!.compareDocumentPosition(dummyAction1Element!),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      dummyAction1Element!.compareDocumentPosition(appSwitcherToggleElement!),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      appSwitcherToggleElement!.compareDocumentPosition(
        colorModeSwitcherElement!,
      ),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      colorModeSwitcherElement!.compareDocumentPosition(dummyAction2Element!),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
