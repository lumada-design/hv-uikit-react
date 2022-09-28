/* eslint-disable import/no-extraneous-dependencies */
import { configure } from "enzyme";
import failOnConsole from "jest-fail-on-console";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import "@testing-library/jest-dom";

failOnConsole();

configure({ adapter: new Adapter() });

window.URL.createObjectURL = jest.fn();
