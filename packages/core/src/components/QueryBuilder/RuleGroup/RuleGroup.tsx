import { useCallback, useContext } from "react";

import { Add, Delete, Info } from "@hitachivantara/uikit-react-icons";

import { HvButton } from "@core/components/Button";
import { HvEmptyState } from "@core/components/EmptyState";
import { HvGrid } from "@core/components/Grid";
import { HvMultiButton } from "@core/components/MultiButton";
import { HvTypography } from "@core/components/Typography";
import { withTooltip } from "@core/hocs/withTooltip";
import { ExtractNames } from "@core/utils/classes";

import { Rule } from "../Rule";
import { QueryBuilderContext } from "../Context";
import { useClasses } from "../QueryBuilder.styles";

export interface RuleGroupProps {
  /**
   * Override or extend the styles applied to the component.
   * See CSS API tab for more details.
   */
  classes?: ExtractNames<typeof useClasses>;
  id?: number;
  level?: number;
  combinator?: string;
  rules?: any[];
}

export const RuleGroup = ({
  level = 0,
  id,
  combinator = "and",
  rules = [],
  classes: classesProp,
}: RuleGroupProps) => {
  const { classes, cx } = useClasses(classesProp);

  const context = useContext(QueryBuilderContext);

  const { dispatchAction, askAction, maxDepth, combinators, labels, readOnly } =
    context;
  const normalizedMaxDepth = maxDepth - 1;

  const actionButtons = (
    <>
      <div className={classes.buttonBackground}>
        <HvButton
          variant="secondarySubtle"
          onClick={() => {
            dispatchAction({ type: "add-rule", id });
          }}
          disabled={readOnly}
          startIcon={<Add />}
        >
          {level === 0 && labels.query?.addRule?.label != null
            ? labels.query?.addRule?.label
            : labels.group.addRule.label}
        </HvButton>
      </div>
      {level <= normalizedMaxDepth && (
        <div className={classes.buttonBackground}>
          <HvButton
            variant="secondarySubtle"
            onClick={() => {
              dispatchAction({ type: "add-group", id });
            }}
            disabled={readOnly}
            startIcon={<Add />}
          >
            {level === 0 && labels.query?.addGroup?.label != null
              ? labels.query?.addGroup?.label
              : labels.group.addGroup.label}
          </HvButton>
        </div>
      )}
    </>
  );

  const DeleteIcon = withTooltip(
    () => (
      <Delete className={cx({ [classes.topRemoveButtonDisabled]: readOnly })} />
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
      className={cx(classes.root, {
        [classes.topGroup]: level === 0,
        [classes.subGroup]: level > 0,
      })}
    >
      <HvGrid container>
        <HvGrid item>
          <HvMultiButton
            className={cx(classes.combinator, classes.topCombinator)}
            disabled={readOnly}
          >
            {combinators &&
              combinators.map((item) => (
                <HvButton
                  key={item.operand}
                  className={classes.combinatorButton}
                  selected={item.operand === combinator}
                  onClick={() => item.operand && onClickCombinator(item)}
                  disabled={readOnly}
                  size="xs"
                >
                  {item.label}
                </HvButton>
              ))}
          </HvMultiButton>
        </HvGrid>
        <HvGrid item>
          <div
            className={cx(classes.buttonBackground, classes.topRemoveButton)}
          >
            <HvButton
              icon
              className={classes.removeButton}
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
              variant="secondaryGhost"
            >
              <DeleteIcon />
            </HvButton>
          </div>
        </HvGrid>
      </HvGrid>
      {rules?.length > 0 && (
        <div
          className={cx(classes.rulesContainer, {
            [classes.subRulesContainer]: level > 0,
            [classes.topRulesContainer]: level === 0,
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
                  if (
                    r.attribute === rule.attribute &&
                    r.id !== rule.id &&
                    i < index
                  ) {
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
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
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
          className={cx(
            classes.actionButtonContainer,
            classes.topActionButtonContainer
          )}
        >
          {actionButtons}
        </HvGrid>
      </HvGrid>
    </div>
  );
};
