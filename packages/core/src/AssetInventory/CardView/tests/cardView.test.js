import React from "react";
import { mount, shallow } from "enzyme";
import Menu from "@hv/uikit-react-icons/dist/Menu";
import HvProvider from "../../../Provider";
import CardView from "../index";
import Card from "../../../Card";

describe("CardView", () => {
  let wrapper;

  const data = [
    {
      headerTitle: "Asset Avatar 1",
      subheader: "Compressor",
      id: "id_1",
      semantic: "sema2",
      isSelectable: true,
      checkboxValue: "id_1"
    },
    {
      headerTitle: "Asset Avatar 2",
      subheader: "Compressor",
      id: "id_2",
      semantic: "sema2",
      isSelectable: true,
      checkboxValue: "id_2"
    }
  ];

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <CardView values={data} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly with default render", () => {
    wrapper = mount(
      <HvProvider>
        <CardView icon={<Menu />} values={data} />
      </HvProvider>
    );
    const cards = wrapper.find(Card);

    expect(cards.length).toEqual(2);
  });

  it("should render correctly with custom render", () => {
    const renderer = value => (
      <div style={{ width: "500px" }}>
        <Card id={value.id} headerTitle={value.headerTitle} />
      </div>
    );

    wrapper = mount(
      <HvProvider>
        <CardView id="id1" icon={<Menu />} values={data} renderer={renderer} />
      </HvProvider>
    );
    const cards = wrapper.find(Card);

    expect(cards.length).toEqual(2);
  });
});
