/* eslint-disable import/no-extraneous-dependencies */

import { configure } from "enzyme";
import failOnConsole from "jest-fail-on-console";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import "@testing-library/jest-dom";

// Had to add this due a problem when running unit tests on component that have Popper.Js being used.
if (global.document)
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
  });
failOnConsole();
configure({ adapter: new Adapter() });
