/* eslint-disable react-hooks/exhaustive-deps */
import { ClassNames } from "@emotion/react";
import { HvBaseProps, HvDialogContent } from "@hitachivantara/uikit-react-core";
import { useElementSize } from "usehooks-ts";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  HvWizardContext,
  HvWizardTabs,
  wizardContentClasses,
  HvWizardContentClasses,
} from "..";
import { styles } from "./WizardContent.styles";
import { LoadingContainer } from "./LoadingContainer";

export interface HvWizardContentProps extends HvBaseProps {
  /** Forces minimum height to the component. */
  fixedHeight?: boolean;
  /** Whether the loading animation is shown. */
  loading?: boolean;
  /** The content of the summary. */
  summaryContent?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the empty state Wizard. */
  classes?: HvWizardContentClasses;
}

type ChildElement = React.ReactElement<HvWizardTabs>;

const DRAWER_PERCENTAGE = 0.3;
const DRAWER_MIN_WIDTH = 280;

export const HvWizardContent = ({
  classes,
  fixedHeight = false,
  loading = false,
  children,
  summaryContent,
}: HvWizardContentProps) => {
  const { context, setContext, summary, tab } = useContext(HvWizardContext);

  const arrayChildren = React.Children.toArray(children) as ChildElement[];

  const initialContext = arrayChildren.reduce(
    (acc, child: ChildElement, index) => {
      const invalid =
        "mustValidate" in child.props && child.props.mustValidate === true
          ? false
          : null;
      const valid = invalid ?? (index === 0 || null);
      return {
        ...acc,
        [index]: { ...child.props, form: {}, valid, touched: index === 0 },
      };
    },
    {}
  );

  const summaryRef = useRef<HTMLElement>();
  const resizedRef = useRef({ height: 0, width: 0 });
  const [containerRef, sizes] = useElementSize();

  const [summaryHeight, setSummaryHeight] = useState(0);
  const [summaryWidth, setSummaryWidth] = useState(0);
  const [summaryLeft, setSummaryLeft] = useState(0);

  const updateSummaryMeasures = useCallback((newSizes) => {
    const modalWidth = newSizes.width;
    const drawerWidth = modalWidth * DRAWER_PERCENTAGE;
    setSummaryHeight(newSizes.height);
    setSummaryWidth(Math.max(drawerWidth, DRAWER_MIN_WIDTH));
    setSummaryLeft(modalWidth - Math.max(drawerWidth, DRAWER_MIN_WIDTH));

    resizedRef.current = {
      height: newSizes.height,
      width: newSizes.width,
    };
  }, []);

  useEffect(() => {
    const pageHeight = summaryRef.current?.getBoundingClientRect?.()?.height;
    if (
      (summary && sizes.height !== resizedRef.current.height) ||
      sizes.width !== resizedRef.current.width
    ) {
      updateSummaryMeasures(sizes);
    }

    if (pageHeight && sizes.height !== pageHeight) {
      updateSummaryMeasures({
        width: sizes.width,
        height: pageHeight,
      });
    }
  }, [tab, sizes, summary, updateSummaryMeasures]);

  useEffect(() => {
    setContext(initialContext);
  }, []);

  useEffect(() => {
    if (tab && !context[tab]?.touched) {
      const updatedContext = Object.entries(context).reduce(
        (acc, [key, childState]) => ({
          ...acc,
          ...(+key <= tab
            ? {
                [key]: {
                  ...childState,
                  touched: true,
                  valid: childState?.valid ?? true,
                },
              }
            : { [key]: childState }),
        }),
        {}
      );

      setContext(updatedContext);
    }
  }, [tab, context, setContext]);

  const translateX = summaryWidth ? summaryWidth + 10 : 450;

  return (
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            wizardContentClasses.summaryRef,
            css(styles.summaryRef),
            classes?.summaryRef
          )}
          ref={(el) => {
            containerRef(el);
            if (el) {
              summaryRef.current = el;
            }
          }}
        >
          {summary !== null && (
            <div
              className={cx(
                wizardContentClasses.summarySticky,
                css(styles.summarySticky),
                classes?.summarySticky
              )}
            >
              <div
                className={cx(
                  wizardContentClasses.summaryContainer,
                  css(styles.summaryContainer),
                  classes?.summaryContainer
                )}
                style={{
                  left: summaryLeft,
                  width: summaryWidth,
                  height: summaryHeight,
                  transform: `translate(${summary ? 0 : translateX}px, 0)`,
                }}
              >
                {summaryContent}
              </div>
            </div>
          )}
          <HvDialogContent
            className={cx(
              wizardContentClasses.contentContainer,
              fixedHeight && wizardContentClasses.fixedHeight,
              css(styles.contentContainer),
              fixedHeight && css(styles.fixedHeight),
              classes?.contentContainer,
              fixedHeight && classes?.fixedHeight
            )}
            indentContent
          >
            <LoadingContainer hidden={!loading}>
              {React.Children.map(arrayChildren, (child, index) => {
                if (index === tab) {
                  return React.cloneElement(child as React.ReactElement, {
                    tab,
                  });
                }
                return null;
              })}
            </LoadingContainer>
          </HvDialogContent>
        </div>
      )}
    </ClassNames>
  );
};
