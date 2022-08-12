import React from "react";

const ListViewContext = React.createContext({});

export const ListViewContextProvider = ListViewContext.Provider;
export const ListViewContextConsumer = ListViewContext.Consumer;
export default ListViewContext;
