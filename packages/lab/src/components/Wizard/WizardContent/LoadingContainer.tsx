import { clsx } from "clsx";
import { HvLoading } from "@hitachivantara/uikit-react-core";
import { styles } from "./LoadingContainer.styles";

export const LoadingContainer = ({ children, hidden, ...others }) => {
  return (
    <>
      <div
        style={{
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        className={clsx(styles?.overlay, !hidden && styles?.blur)}
      >
        <HvLoading
          classes={{ root: clsx(styles?.loading) }}
          hidden={hidden}
          {...others}
        />
      </div>
      <div style={{ display: "flow-root" }}>{children}</div>
    </>
  );
};
