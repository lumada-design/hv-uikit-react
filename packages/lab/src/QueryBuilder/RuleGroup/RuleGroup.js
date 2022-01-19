import React, { useCallback, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  HvGrid,
  HvMultiButton,
  HvButton,
  HvEmptyState,
  HvTypography,
  withTooltip,
} from "@hitachivantara/uikit-react-core";
import { Add, Delete, Info } from "@hitachivantara/uikit-react-icons";

import Context from "../Context";
import Rule from "../Rule";
import useStyles from "./styles";

const RuleGroup = ({ level = 0, id, combinator = "and", rules = [] }) => {
  const classes = useStyles({ level });
  const context = useContext(Context);

  const { dispatchAction, askAction, maxDepth, combinators, labels } = context;

  const actionButtons = (
    <>
      <HvButton
        category="secondary"
        onClick={() => {
          dispatchAction({ type: "add-rule", id });
        }}
      >
        <Add />
        {level === 0 && labels.query?.addRule?.label != null
          ? labels.query?.addRule?.label
          : labels.group.addRule.label}
      </HvButton>
      {level < maxDepth && (
        <HvButton
          category="secondary"
          onClick={() => {
            dispatchAction({ type: "add-group", id });
          }}
        >
          <Add />
          {level === 0 && labels.query?.addGroup?.label != null
            ? labels.query?.addGroup?.label
            : labels.group.addGroup.label}
        </HvButton>
      )}
    </>
  );

  const DeleteIcon = withTooltip(
    () => <Delete />,
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
          <HvMultiButton className={clsx(classes.combinator, classes.topCombinator)}>
            {combinators.map((item) => (
              <HvButton
                key={item.operand}
                className={classes.combinatorButton}
                selected={item.operand === combinator}
                onClick={() => item.operand && onClickCombinator(item)}
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
                  key={rule.id || Math.random()}
                  level={level + 1}
                  {...rule}
                  id={rule.id}
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
                key={rule.id || Math.random()}
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
              {level === 0 && (
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
  id: PropTypes.number,
  level: PropTypes.number,
  combinator: PropTypes.string,
  rules: PropTypes.array,
};

export default RuleGroup;
