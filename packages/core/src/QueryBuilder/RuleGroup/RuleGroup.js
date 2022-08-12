import React, { useCallback, useContext } from "react";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Add, Delete, Info } from "@hitachivantara/uikit-react-icons";

import { HvGrid, HvMultiButton, HvButton, HvEmptyState, HvTypography, withTooltip } from "../..";
import Context from "../Context";
import Rule from "../Rule";
import styles from "./styles";

const RuleGroup = ({ level = 0, id, combinator = "and", rules = [], classes }) => {
  const context = useContext(Context);

  const { dispatchAction, askAction, maxDepth, combinators, labels, readOnly } = context;
  const normalizedMaxDepth = maxDepth - 1;

  const actionButtons = (
    <>
      <HvButton
        category="secondary"
        onClick={() => {
          dispatchAction({ type: "add-rule", id });
        }}
        disabled={readOnly}
      >
        <Add disabled={readOnly} />
        {level === 0 && labels.query?.addRule?.label != null
          ? labels.query?.addRule?.label
          : labels.group.addRule.label}
      </HvButton>
      {level <= normalizedMaxDepth && (
        <HvButton
          category="secondary"
          onClick={() => {
            dispatchAction({ type: "add-group", id });
          }}
          disabled={readOnly}
        >
          <Add disabled={readOnly} />
          {level === 0 && labels.query?.addGroup?.label != null
            ? labels.query?.addGroup?.label
            : labels.group.addGroup.label}
        </HvButton>
      )}
    </>
  );

  const DeleteIcon = withTooltip(
    () => (
      <Delete className={readOnly ? classes.topRemoveButtonDisabled : ""} disabled={readOnly} />
    ),
    level === 0 && labels.query?.delete?.tooltip
      ? labels.query?.delete?.tooltip
      : labels.group.delete.tooltip,
    "top"
  );

  const onClickCombinator = useCallback(
    (item) => {
      dispatchAction({
        type: "set-combinator",
        id,
        combinator: item.operand,
      });
    },
    [dispatchAction, id]
  );

  return (
    <div
      className={clsx(classes.root, {
        [classes.topGroup]: level === 0,
        [classes.subGroup]: level !== 0,
      })}
    >
      <HvGrid container>
        <HvGrid item>
          <HvMultiButton
            className={clsx(classes.combinator, classes.topCombinator)}
            disabled={readOnly}
          >
            {combinators.map((item) => (
              <HvButton
                key={item.operand}
                className={classes.combinatorButton}
                selected={item.operand === combinator}
                onClick={() => item.operand && onClickCombinator(item)}
                disabled={readOnly}
              >
                {item.label}
              </HvButton>
            ))}
          </HvMultiButton>
        </HvGrid>
        <HvGrid item>
          <HvButton
            icon
            className={clsx(classes.removeButton, classes.topRemoveButton)}
            onClick={() => {
              askAction({
                actions: [{ type: "remove-node", id }],
                dialog:
                  level === 0 && labels.query?.delete != null
                    ? labels.query.delete
                    : labels.group.delete,
              });
            }}
            aria-label={
              level === 0 && labels.query?.delete?.ariaLabel
                ? labels.query?.delete?.ariaLabel
                : labels.group.delete.ariaLabel
            }
            disabled={readOnly}
          >
            <DeleteIcon />
          </HvButton>
        </HvGrid>
      </HvGrid>
      {rules?.length > 0 && (
        <div
          className={clsx(classes.rulesContainer, {
            [classes.subRulesContainer]: level > 0,
            topRulesContainer: level === 0,
          })}
        >
          {rules.map((rule, index) => {
            if ("combinator" in rule) {
              return (
                <RuleGroup
                  key={rule.id ?? index}
                  level={level + 1}
                  {...rule}
                  id={rule.id}
                  classes={classes}
                />
              );
            }

            const isInvalid =
              combinator === "and" &&
              rules.some((r, i) => {
                if ("attribute" in r) {
                  if (r.attribute === rule.attribute && r.id !== rule.id && i < index) {
                    return true;
                  }
                }
                return false;
              });

            return (
              <Rule
                key={rule.id ?? index}
                {...rule}
                isInvalid={isInvalid}
                id={rule.id}
                combinator={combinator}
              />
            );
          })}
        </div>
      )}
      {rules?.length === 0 && (
        <HvEmptyState
          title={labels.empty?.title}
          message={
            <>
              <HvTypography
                variant="link"
                component="a"
                onClick={() => {
                  dispatchAction({ type: "add-rule", id });
                }}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {`${labels.empty?.createCondition}`}
              </HvTypography>
              {level <= normalizedMaxDepth && (
                <>
                  {`${labels.empty?.spacer}`}
                  <HvTypography
                    variant="link"
                    component="a"
                    onClick={() => {
                      dispatchAction({ type: "add-group", id });
                    }}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {`${labels.empty?.createGroup}`}
                  </HvTypography>
                </>
              )}
            </>
          }
          icon={<Info />}
        />
      )}
      <HvGrid container>
        <HvGrid
          item
          className={clsx(classes.actionButtonContainer, classes.topActionButtonContainer)}
        >
          {actionButtons}
        </HvGrid>
      </HvGrid>
    </div>
  );
};

RuleGroup.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See CSS API tab for more details.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the top group container.
     */
    topGroup: PropTypes.string,
    /**
     * Styles applied to the sub group containers.
     */
    subGroup: PropTypes.string,
    /**
     * Styles applied to the multi-button combinator container.
     */
    combinator: PropTypes.string,
    /**
     * Styles applied to the multi-button combinator container on the top group.
     */
    topCombinator: PropTypes.string,
    /**
     * Styles applied to each combinator button.
     */
    combinatorButton: PropTypes.string,
    /**
     * Styles applied to the remove button.
     */
    removeButton: PropTypes.string,
    /**
     * Styles applied to the remove button on the top group.
     */
    topRemoveButton: PropTypes.string,
    /**
     * Styles applied to the remove button on the top group when disabled.
     */
    topRemoveButtonDisabled: PropTypes.string,
    /**
     * Styles applied to the rules container.
     */
    rulesContainer: PropTypes.string,
    /**
     * Styles applied to the sub rules container.
     */
    subRulesContainer: PropTypes.string,
    /**
     * Styles applied to the action button container.
     */
    actionButtonContainer: PropTypes.string,
    /**
     * Styles applied to the top action button container.
     */
    topActionButtonContainer: PropTypes.string,
  }),
  id: PropTypes.number,
  level: PropTypes.number,
  combinator: PropTypes.string,
  rules: PropTypes.array,
};

export default withStyles(styles, { name: "RuleGroup" })(RuleGroup);
