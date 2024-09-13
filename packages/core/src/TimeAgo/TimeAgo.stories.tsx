import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import {
  HvRadio,
  HvRadioGroup,
  HvTimeAgo,
  HvTimeAgoProps,
  theme,
} from "@hitachivantara/uikit-react-core";

import "dayjs/locale/fr";
import "dayjs/locale/de";
import "dayjs/locale/pt";

import { css } from "@emotion/css";

const styles = {
  root: css({
    display: "flex",
    alignItems: "center",
  }),
  container: css({
    minHeight: 300,
    "& > div": {
      padding: theme.spacing("xs"),
    },
  }),
  table: css({
    border: `1px solid ${theme.colors.secondary}`,
    borderCollapse: "collapse",
    "& th, td": {
      border: `1px solid ${theme.colors.secondary}`,
      padding: theme.spacing("5px", "sm"),
    },
  }),
};

const meta: Meta<typeof HvTimeAgo> = {
  title: "Components/Time Ago",
  component: HvTimeAgo,
};
export default meta;

export const Main: StoryObj<HvTimeAgoProps> = {
  args: {
    timestamp: dayjs().valueOf(),
    locale: "en",
    disableRefresh: false,
    showSeconds: false,
    justText: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    component: { control: { disable: true } },
    ref: { control: { disable: true } },
  },
  render: (args) => {
    return <HvTimeAgo {...args} />;
  },
};

const dates = [
  new Date(),
  new Date().setSeconds(new Date().getSeconds() - 30),
  new Date().setMinutes(new Date().getMinutes() - 1),
  new Date().setMinutes(new Date().getMinutes() - 10),
  new Date().setMinutes(new Date().getMinutes() - 59),
  new Date().setMinutes(new Date().getMinutes() - 80),
  new Date().setHours(0),
  new Date().setDate(new Date().getDate() - 1),
  new Date().setDate(new Date().getDate() - new Date().getDay()),
  new Date().setDate(0),
  new Date().setMonth(new Date().getMonth() - 1),
  new Date().setMonth(new Date().getMonth() - 2),
  new Date().setMonth(new Date().getMonth() - 4),
  new Date().setFullYear(new Date().getFullYear() - 1),
].map((date) => date.valueOf());

export const Samples: StoryObj<HvTimeAgoProps> = {
  render: () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ISO Date</th>
            <th>{"<TimeAgo />"}</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((dateTs) => (
            <tr key={dateTs}>
              <td>{new Date(dateTs).toISOString()}</td>
              <td aria-label="Time ago">
                <HvTimeAgo timestamp={dateTs} showSeconds />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};

export const LocaleOverride: StoryObj<HvTimeAgoProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Sample dates and locale controlled externally.<br /> \
        `HvTimeAgo` leverages `dayjs` for locales and custom dates. To use a locale, import it with `dayjs/locale/{locale}`<br />\
        Locale strings can be overridden using [dayjs.updateLocale](https://day.js.org/docs/en/plugin/update-locale)",
      },
    },
  },
  render: () => {
    const [locale, setLocale] = useState("en");

    return (
      <div className={css(styles.container)}>
        <div>
          <HvRadioGroup
            orientation="horizontal"
            value={locale}
            onChange={async (event, newLocale) => {
              // dynamically import locales. if the supported locales are known beforehand,
              // its preferable to import them statically, to avoid bundling unnecessary locales
              setLocale(newLocale);
            }}
          >
            <HvRadio label="🇬🇧 English" value="en" />
            <HvRadio label="🇫🇷 French" value="fr" />
            <HvRadio label="🇩🇪 German" value="de" />
            <HvRadio label="🇵🇹 Portuguese" value="pt" />
          </HvRadioGroup>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ISO Date</th>
              <th>{"<TimeAgo />"}</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((dateTs) => (
              <tr key={dateTs}>
                <td>{new Date(dateTs).toISOString()}</td>
                <td aria-label="Time ago">
                  <HvTimeAgo timestamp={dateTs} locale={locale} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
