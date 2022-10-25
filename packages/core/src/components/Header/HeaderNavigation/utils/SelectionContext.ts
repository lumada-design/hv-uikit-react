import { createContext } from "react";

// type SelectionContextType = {};

const SelectionContext = createContext<string[]>([]);

export default SelectionContext;
