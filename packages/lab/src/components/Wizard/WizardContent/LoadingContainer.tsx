import { HvLoading, HvLoadingProps } from "@hitachivantara/uikit-react-core";
import { ClassNames } from "@emotion/react";
import { styles } from "./LoadingContainer.styles";
import wizardLoadingContainerClasses, {
  HvWizardLoadingContainerClasses,
} from "./loadingContainerClasses";

interface LoadingContainerProps extends Omit<HvLoadingProps, "classes"> {
  classes?: HvWizardLoadingContainerClasses;
}

export const LoadingContainer = ({
  children,
  hidden,
  classes,
  ...others
}: LoadingContainerProps) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <>
          <div
            style={{
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
            className={cx(
              wizardLoadingContainerClasses.overlay,
              !hidden && wizardLoadingContainerClasses.blur,
              css(styles.overlay),
              !hidden && css(styles.blur),
              classes?.overlay,
              !hidden && classes?.blur
            )}
          >
            <HvLoading
              classes={{
                root: cx(
                  wizardLoadingContainerClasses.loading,
                  css(styles.loading),
                  classes?.loading
                ),
              }}
              hidden={hidden}
              {...others}
            />
          </div>
          <div style={{ display: "flow-root" }}>{children}</div>
        </>
      )}
    </ClassNames>
  );
};
