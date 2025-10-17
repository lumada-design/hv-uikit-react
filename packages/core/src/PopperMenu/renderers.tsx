import { HvCheckBox } from "../CheckBox";
import { HvCheckBoxGroup } from "../CheckBoxGroup";
import { HvOverflowTooltip } from "../OverflowTooltip";
import { HvRadio } from "../Radio";
import { HvRadioGroup } from "../RadioGroup";
import { HvSwitch } from "../Switch";
import { HvPopperMenuGroup } from "./types";

export const renderCheckBoxGroup = (
  group: HvPopperMenuGroup,
  selected: string[],
  onChange: (ids: string[]) => void,
  classes: any,
) => {
  return (
    <HvCheckBoxGroup
      value={selected.filter((id) => group.items.some((i) => i.id === id))}
      onChange={(_, checkedIds: string[]) => {
        const others = selected.filter(
          (id) => !group.items.some((i) => i.id === id),
        );
        onChange([...others, ...checkedIds]);
      }}
      className={classes.checkBoxGroup}
    >
      {group.items.map((item) => (
        <HvCheckBox
          key={item.id}
          value={item.id}
          checked={selected.includes(item.id)}
          disabled={!!item.disabled}
          label={renderLabel(item.label)}
          classes={{
            label: classes.checkBoxLabel,
          }}
        />
      ))}
    </HvCheckBoxGroup>
  );
};

export const renderRadioGroup = (
  group: HvPopperMenuGroup,
  selected: string[],
  onChange: (ids: string[]) => void,
) => {
  return (
    <HvRadioGroup
      value={group.items.find((i) => selected.includes(i.id))?.id ?? null}
      onChange={(_, checkedId: string | null) => {
        const others = selected.filter(
          (id) => !group.items.some((i) => i.id === id),
        );
        const newSelected = checkedId != null ? [...others, checkedId] : others;
        onChange(newSelected);
      }}
    >
      {group.items.map((item) => {
        return (
          <HvRadio
            key={item.id}
            label={renderLabel(item.label)}
            value={item.id}
            checked={selected.includes(item.id)}
            disabled={!!item.disabled}
          />
        );
      })}
    </HvRadioGroup>
  );
};

export const renderSwitchGroup = (
  group: HvPopperMenuGroup,
  selected: string[],
  onChange: (ids: string[]) => void,
) => {
  return (
    <>
      {group.items.map((item) => (
        <HvSwitch
          labelPosition="left"
          key={item.id}
          disabled={!!item.disabled}
          checked={selected.includes(item.id)}
          label={renderLabel(item.label)}
          onChange={(_, checked) => {
            if (checked) {
              onChange([...selected, item.id]);
            } else {
              onChange(selected.filter((id) => id !== item.id));
            }
          }}
        />
      ))}
    </>
  );
};

const renderLabel = (label: React.ReactNode) => {
  if (typeof label === "string" || typeof label === "number")
    return <HvOverflowTooltip data={label} />;

  return label;
};
