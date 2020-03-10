import { createTheming as jssCreateTheming } from "react-jss";

import ThemeContext from "../ThemeContext";

// Creating a namespaced theming object.
export default jssCreateTheming(ThemeContext);
