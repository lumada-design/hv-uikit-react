import React, { useMemo, useState } from "react";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core";
import { HvRadio, HvRadioGroup, HvTypography } from "@hv/uikit-react-core";

import { HvTimeAgo, HvTimePicker } from "../..";

export default {
  title: "Lab/Time Ago",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTimeAgo } from "@hv/uikit-react-lab"',

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

  const handleLocaleChange = async (event, value) => {
    const newLocale = value;
    await import(`dayjs/locale/${newLocale}`);
    dayjs.locale(newLocale);

    setLocale(newLocale);
    setTime(time + 1); // force update for locale update
  };

  return (
    <div className={classes.container}>
      <div>
        <HvRadioGroup orientation="horizontal" value={locale} onChange={handleLocaleChange}>
          <HvRadio label="🇬🇧 English" value="en" />
          <HvRadio label="🇹🇹 English (TT)" value="en-tt" />
          <HvRadio label="🇫🇷 French" value="fr" />
          <HvRadio label="🇩🇪 German" value="de" />
          <HvRadio label="🇵🇹 Portuguese" value="pt" />
        </HvRadioGroup>
      </div>
      <div>
        <HvTypography variant="sTitle">
          <HvTimeAgo timestamp={time} />
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
      story: `Sample dates and locale controlled externally.
        HvTimeAgo leverages dayjs for locales and custom dates - to use a locale, import it with ${`dayjs/locale/<locale>`}.
        Locale strings can be overridden using [dayjs.updateLocale](https://day.js.org/docs/en/plugin/update-locale)`,
    },
  },
};
