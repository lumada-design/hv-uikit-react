import { useCallback, useContext } from "react";
import { Add, Delete, Info } from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvEmptyState,
  HvGrid,
  HvMultiButton,
  HvTypography,
} from "@core/components";
import { withTooltip } from "@core/hocs";
import { ClassNames } from "@emotion/react";
import { Rule } from "../Rule";
import queryBuilderClasses, {
  HvQueryBuilderClasses,
} from "../queryBuilderClasses";
import { QueryBuilderContext } from "../Context";
import { styles } from "./RuleGroup.styles";

export interface RuleGroupProps {
  /**
   * Override or extend the styles applied to the component.
   * See CSS API tab for more details.
   */
  classes?: HvQueryBuilderClasses;
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
  classes,
}: RuleGroupProps) => {
  const context = useContext(QueryBuilderContext);

  const { dispatchAction, askAction, maxDepth, combinators, labels, readOnly } =
    context;
  const normalizedMaxDepth = maxDepth - 1;

  const actionButtons = (
    <ClassNames>
      {({ css, cx }) => (
        <>
          <div
            className={cx(
              queryBuilderClasses.buttonBackground,
              css(styles.buttonBackground),
              classes?.buttonBackground
            )}
          >
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
            <div
              className={cx(
                queryBuilderClasses.buttonBackground,
                css(styles.buttonBackground),
                classes?.buttonBackground
              )}
            >
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
      )}
    </ClassNames>
  );

  const DeleteIcon = withTooltip(
    () => (
      <ClassNames>
        {({ css, cx }) => (
          <Delete
            className={
              readOnly
                ? cx(
                    queryBuilderClasses.topRemoveButtonDisabled,
                    css(styles.topRemoveButtonDisabled),
                    classes?.topRemoveButtonDisabled
                  )
                : ""
            }
          />
        )}
      </ClassNames>
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
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            queryBuilderClasses.root,
            level === 0
              ? queryBuilderClasses.topGroup
              : queryBuilderClasses.subGroup,
            css(styles.root),
            level === 0 ? css(styles.topGroup) : css(styles.subGroup),
            classes?.root,
            level === 0 ? classes?.topGroup : classes?.subGroup
          )}
        >
          <HvGrid container>
            <HvGrid item>
              <HvMultiButton
                className={cx(
                  queryBuilderClasses.combinator,
                  queryBuilderClasses.topCombinator,
                  css(styles.combinator),
                  css(styles.topCombinator),
                  classes?.combinator,
                  classes?.topCombinator
                )}
                disabled={readOnly}
              >
                {combinators &&
                  combinators.map((item) => (
                    <HvButton
                      key={item.operand}
                      className={cx(
                        queryBuilderClasses.combinatorButton,
                        css(styles.combinatorButton),
                        classes?.combinatorButton
                      )}
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
                className={cx(
                  queryBuilderClasses.buttonBackground,
                  queryBuilderClasses.topRemoveButton,
                  css(styles.buttonBackground),
                  css(styles.topRemoveButton),
                  classes?.buttonBackground,
                  classes?.topRemoveButton
                )}
              >
                <HvButton
                  icon
                  className={cx(
                    queryBuilderClasses.removeButton,
                    css(styles.removeButton),
                    classes?.removeButton
                  )}
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
              className={cx(
                queryBuilderClasses.rulesContainer,
                level > 0 && queryBuilderClasses.subRulesContainer,
                level === 0 && queryBuilderClasses.topRulesContainer,
                css(styles.rulesContainer),
                level > 0 && css(styles.subRulesContainer),
                level === 0 && css(styles.topRulesContainer),
                classes?.rulesContainer,
                level > 0 && classes?.subRulesContainer,
                level === 0 && classes?.topRulesContainer
              )}
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
                queryBuilderClasses.actionButtonContainer,
                queryBuilderClasses.topActionButtonContainer,
                css(styles.actionButtonContainer),
                css(styles.topActionButtonContainer),
                classes?.actionButtonContainer,
                classes?.topActionButtonContainer
              )}
            >
              {actionButtons}
            </HvGrid>
          </HvGrid>
        </div>
      )}
    </ClassNames>
  );
};
