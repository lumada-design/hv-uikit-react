import {
  HvLoading,
  HvLoadingProps,
  ExtractNames,
} from "@hitachivantara/uikit-react-core";

import { useClasses } from "./LoadingContainer.styles";

type HvWizardLoadingContainerClasses = ExtractNames<typeof useClasses>;

interface LoadingContainerProps extends Omit<HvLoadingProps, "classes"> {
  classes?: HvWizardLoadingContainerClasses;
}

export const LoadingContainer = ({
  children,
  hidden,
  classes: classesProp,
  ...others
}: LoadingContainerProps) => {
  const { classes, cx } = useClasses(classesProp);

  return (
    <>
      <div
        style={{
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        className={cx(classes.overlay, { [classes.blur]: !hidden })}
      >
        <HvLoading
          classes={{
            root: classes.loading,
          }}
          hidden={hidden}
          {...others}
        />
      </div>
      <div style={{ display: "flow-root" }}>{children}</div>
    </>
  );
};
