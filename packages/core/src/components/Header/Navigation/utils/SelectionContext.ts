import { createContext } from "react";

const SelectionContext = createContext<string[]>([]);

export default SelectionContext;
