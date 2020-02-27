/* eslint-disable import/no-extraneous-dependencies */

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

if (global.document)
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document
    }
  });

configure({ adapter: new Adapter() });
