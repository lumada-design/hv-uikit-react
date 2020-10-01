// Copied from https://github.com/storybookjs/storybook/blob/v5.3.18/addons/docs/src/blocks/Props.tsx
// to call our own extractProps function - will be configurable in SB 6.0

import React, { useContext } from "react";

import { PropsTable, PropsTableError, TabsState } from "@storybook/components";

import { DocsContext } from "@storybook/addon-docs/blocks";
import { CURRENT_SELECTION } from "@storybook/addon-docs/blocks";
import { getComponentName } from "@storybook/addon-docs/dist/blocks/utils";

import { extractProps } from "../props/extractProps";

const filterRows = (rows, exclude) => rows && rows.filter((row) => !exclude.includes(row.name));

export const getComponentProps = (component, { exclude }) => {
  if (!component) {
    return null;
  }
  try {
    let props = extractProps(component);
    if (exclude != null) {
      const { rows } = props;
      const { sections } = props;
      if (rows) {
        props = {
          rows: filterRows(rows, exclude),
        };
      } else if (sections) {
        Object.keys(sections).forEach((section) => {
          sections[section] = filterRows(sections[section], exclude);
        });
      }
    }

    return props;
  } catch (err) {
    return { error: err.message };
  }
};

export const getComponent = (props = {}, context) => {
  const { of } = props;
  const { parameters = {} } = context;
  const { component } = parameters;

  const target = of === CURRENT_SELECTION ? component : of;
  if (!target) {
    if (of === CURRENT_SELECTION) {
      return null;
    }
    throw new Error(PropsTableError.NO_COMPONENT);
  }
  return target;
};

const PropsContainer = (props) => {
  const context = useContext(DocsContext);
  const { slot, components } = props;
  const {
    parameters: { subcomponents },
  } = context;

  let allComponents = components;
  if (!allComponents) {
    const main = getComponent(props, context);
    const mainLabel = getComponentName(main);
    const mainProps = slot ? slot(context, main) : getComponentProps(main, props, context);

    if (!subcomponents || typeof subcomponents !== "object") {
      return mainProps && <PropsTable {...mainProps} />;
    }

    allComponents = { [mainLabel]: main, ...subcomponents };
  }

  const tabs = [];
  Object.entries(allComponents).forEach(([label, component]) => {
    tabs.push({
      label,
      table: getComponentProps(component, props, context),
    });
  });

  return (
    <TabsState>
      {tabs.map(({ label, table }) => {
        if (!table) {
          return null;
        }
        const id = `prop_table_div_${label}`;
        return (
          <div key={id} id={id} title={label}>
            {({ active }) =>
              active ? <PropsTable key={`prop_table_${label}`} {...table} /> : null
            }
          </div>
        );
      })}
    </TabsState>
  );
};

PropsContainer.defaultProps = {
  of: ".",
};

export { PropsContainer as Props };
