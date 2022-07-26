import React, { useMemo, useState } from "react";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core";
import { HvRadio, HvRadioGroup, HvTypography } from "@hitachivantara/uikit-react-core";

import { HvTimeAgo, HvTimePicker } from "../..";

export default {
  title: "Lab/Time Ago",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTimeAgo } from "@hitachivantara/uikit-react-lab"',

    dsVersion: "3.3.0",
  },
  component: HvTimeAgo,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    minHeight: 300,
    "& > div": {
      padding: theme.hvSpacing("xs"),
    },
  },
  table: {
    border: `1px solid ${theme.palette.acce1}`,
    borderCollapse: "collapse",
    "& th, td": {
      border: `1px solid ${theme.palette.acce1}`,
      padding: theme.hvSpacing("5px", "sm"),
    },
  },
}));

export const Main = () => {
  const classes = useStyles();
  const dates = useMemo(
    () =>
      [
        dayjs(),
        dayjs().subtract(1, "minutes"),
        dayjs().subtract(10, "minutes"),
        dayjs().subtract(59, "minutes"),
        dayjs().hour(0),
        dayjs().day(0),
        dayjs().date(0),
        dayjs().month(-2),
        dayjs().month(-4),
      ].map((date) => date.valueOf()),
    []
  );

  return (
    <table className={classes.table}>
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
            <td>
              <HvTimeAgo timestamp={dateTs} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const LocaleOverride = () => {
  const classes = useStyles();
  const [locale, setLocale] = useState("en");
  const [time, setTime] = useState(Date.now());

  const handleTimeChange = ({ hours, minutes, seconds }) => {
    const newDate = new Date();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    setTime(newDate.getTime());
  };

  // dynamically import locales
  // if the supported locales are known beforehand, its preferable
  // to import them statically, to avoid bundling unnecessary locales
  const handleLocaleChange = async (event, newLocale) => {
    // prevent bundling of unwanted non-js files
    // by specifying the file extension in the dynamic import
    await import(`dayjs/locale/${newLocale}.js`);
    setLocale(newLocale);
  };

  return (
    <div className={classes.container}>
      <div>
        <HvRadioGroup orientation="horizontal" value={locale} onChange={handleLocaleChange}>
          <HvRadio label="🇬🇧 English" value="en" />
          <HvRadio label="🇫🇷 French" value="fr" />
          <HvRadio label="🇩🇪 German" value="de" />
          <HvRadio label="🇵🇹 Portuguese" value="pt" />
        </HvRadioGroup>
      </div>
      <div>
        <HvTypography variant="sTitle">
          <HvTimeAgo timestamp={time} locale={locale} />
        </HvTypography>
        <span>{new Date(time).toISOString()}</span>
      </div>
      <div style={{ width: 300, minHeight: 300 }}>
        <HvTimePicker label="Time" description="Pick a time" onChange={handleTimeChange} />
      </div>
    </div>
  );
};

LocaleOverride.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line no-multi-str
        "Sample dates and locale controlled externally.<br /> \
        `HvTimeAgo` leverages `dayjs` for locales and custom dates. To use a locale, import it with `dayjs/locale/{locale}`<br />\
        Locale strings can be overridden using [dayjs.updateLocale](https://day.js.org/docs/en/plugin/update-locale)",
    },
  },
};
