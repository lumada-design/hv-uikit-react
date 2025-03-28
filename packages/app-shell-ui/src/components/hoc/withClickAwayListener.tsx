import { createPortal } from "react-dom";
import { ClickAwayListener } from "@mui/material";

import createAppContainerElement from "../../utils/documentUtil";

interface WithClickAwayListenerProps {
  onClickAway?: () => void;
}

type WrappedComponentProps<T extends React.ElementType> = React.ComponentType<
  WithClickAwayListenerProps & React.ComponentProps<T>
>;

const withClickAwayListener = <T extends React.ElementType>(
  WrappedComponent: WrappedComponentProps<T>,
) => {
  const displayName = WrappedComponent.displayName ?? WrappedComponent.name;

  const panelContainerElement = createAppContainerElement();

  const ComponentWithClickAwayListener = ({
    onClickAway,
    ...wrappedProps
  }: WithClickAwayListenerProps & React.ComponentProps<T>) => {
    if (onClickAway) {
      return createPortal(
        <ClickAwayListener onClickAway={onClickAway}>
          <div>
            <WrappedComponent {...(wrappedProps as React.ComponentProps<T>)} />
          </div>
        </ClickAwayListener>,
        panelContainerElement,
      );
    }

    return <WrappedComponent {...(wrappedProps as React.ComponentProps<T>)} />;
  };

  ComponentWithClickAwayListener.displayName = `withClickAwayListener(${displayName})`;

  return ComponentWithClickAwayListener;
};

export default withClickAwayListener;
