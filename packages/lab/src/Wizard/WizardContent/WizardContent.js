import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import useResizeAware from "react-resize-aware";
import clsx from "clsx";
import { HvDialogContent } from "@hitachivantara/uikit-react-core";
import HvWizardContext from "../WizardContext";
import LoadingContainer from "./LoadingContainer";

import styles from "./styles";

const DRAWER_PERCENTAGE = 0.3;
const MODAL_MARGIN = 20;
const DRAWER_MIN_WIDTH = 280;

const HvWizardContent = ({
  classes,
  fixedHeight = false,
  loading = false,
  children,
  tab,
  summaryContent,
}) => {
  const arrayChildren = React.Children.toArray(children);
  const initialContext = arrayChildren.reduce((acc, child, index) => {
    const invalid = child.props.mustValidate === true ? false : null;
    const valid = invalid ?? (index === 0 || null);
    return {
      ...acc,
      [index]: { ...child.props, form: {}, valid, touched: index === 0 },
    };
  }, {});

  const { context, setContext, summary } = React.useContext(HvWizardContext);

  const resizedRef = React.useRef({ width: 0, height: 0 });
  const [resizeListener, sizes] = useResizeAware();

  const [summaryHeight, setSummaryHeight] = React.useState(0);
  const [summaryWidth, setSummaryWidth] = React.useState(0);
  const [summaryLeft, setSummaryLeft] = React.useState(0);
  const updateSummaryMeasures = React.useCallback((newSizes) => {
    const modalWidth = newSizes.width;
    const drawerWidth = modalWidth * DRAWER_PERCENTAGE;
    setSummaryHeight(newSizes.height);
    setSummaryWidth(Math.max(drawerWidth, DRAWER_MIN_WIDTH));
    setSummaryLeft(modalWidth - Math.max(drawerWidth, DRAWER_MIN_WIDTH) - MODAL_MARGIN);
  }, []);

  React.useEffect(() => {
    if (
      (summary && sizes.height !== resizedRef.current.height) ||
      sizes.width !== resizedRef.current.width
    ) {
      updateSummaryMeasures(sizes);
      resizedRef.current = {
        height: sizes.height,
        width: sizes.width,
      };
    }
  }, [sizes, summary, updateSummaryMeasures]);

  React.useEffect(() => {
    setContext(initialContext);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (tab && !context[tab]?.touched) {
      const updatedContext = Object.entries(context).reduce(
        (acc, [key, childState]) => ({
          ...acc,
          ...(+key <= tab
            ? { [key]: { ...childState, touched: true, valid: childState.valid ?? true } }
            : { [key]: childState }),
        }),
        {}
      );

      setContext(updatedContext);
    }
    updateSummaryMeasures(sizes);
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const translateX = summaryWidth ? summaryWidth + 10 : 450;

  return (
    <HvDialogContent
      className={clsx(classes.contentContainer, {
        [classes.fixedHeight]: fixedHeight,
      })}
      indentContent
    >
      {resizeListener}
      <div className={classes.summarySticky}>
        <div
          className={classes.summaryContainer}
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
      <LoadingContainer hidden={!loading}>
        {React.Children.map(arrayChildren, (child, index) => {
          if (index === tab) {
            return React.cloneElement(child, { tab });
          }
          return null;
        })}
      </LoadingContainer>
    </HvDialogContent>
  );
};

HvWizardContent.propTypes = {
  /**
   * Current tab to show.
   */
  tab: PropTypes.number.isRequired,
  /**
   * Tabs to show on the Wizard.
   */
  children: PropTypes.node.isRequired,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the Wizard content container.
     */
    contentContainer: PropTypes.string,
    /**
     * Style applied to the Wizard to fix its height.
     */
    fixedHeight: PropTypes.string,
    /**
     * Style applied to the Summary container to stick it to the top.
     */
    summarySticky: PropTypes.string,
    /**
     * Style applied to the Summary container to position it on the right.
     */
    summaryContainer: PropTypes.string,
  }).isRequired,
  /**
   * Forces minimum height to the component.
   */
  fixedHeight: PropTypes.bool,
  /**
   * Whether the loading animation is shown.
   */
  loading: PropTypes.bool,
  /**
   * The content of the summary.
   */
  summaryContent: PropTypes.node,
};

export default withStyles(styles, { name: "HvWizardContent" })(HvWizardContent);
