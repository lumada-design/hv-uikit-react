import dayjs, {
  formatToUTC,
  isDateTimeRange,
  isDateTimeStrings,
  isNumericRange,
  validateDateTimeValues,
} from "./utils";

function isOr(rule) {
  return rule.$or !== undefined;
}

function isAnd(rule) {
  return rule.$and !== undefined;
}

const groupHasNoSubGroupsOrJustOneOR = (group) => {
  let foundOr = false;

  for (let i = 0; i !== group.rules.length; ++i) {
    const rule = group.rules[i];
    if ("combinator" in rule) {
      if (!foundOr && rule.combinator === "or") {
        foundOr = true;
      } else {
        return false;
      }
    }
  }

  return true;
};

const ruleToMongo = (rule, timezone) => {
  if (rule.attribute == null) {
    return null;
  }

  if (
    (rule.value == null ||
      (typeof rule.value === "string" && rule.value.trim() === "")) &&
    rule.operator !== "Empty" &&
    rule.operator !== "IsNotEmpty"
  ) {
    throw new Error("Missing value");
  }

  const stringValue = rule.value?.toString().trim() ?? "";

  let value;
  switch (rule.operator) {
    case "equals":
      value = stringValue;
      break;
    case "equalsIgnoreCase":
      value = { $regex: stringValue, $options: "i" };
      break;
    case "Contains":
      value = { $regex: `.*${stringValue}.*` };
      break;
    case "StartsWith":
      value = { $regex: `${stringValue}.*` };
      break;
    case "EndsWith":
      value = { $regex: `.*${stringValue}` };
      break;
    case "IsNot":
      value = { $ne: stringValue };
      break;
    case "Empty":
      // TODO what about null?
      value = "";
      break;
    case "IsNotEmpty":
      value = { $exists: true, $ne: "" };
      break;

    case "equalsTo":
      if (
        rule.value != null &&
        isDateTimeStrings(rule.value) &&
        rule.value.date != null &&
        rule.value.time != null &&
        validateDateTimeValues(rule.value.date, rule.value.time)
      ) {
        value = formatToUTC(`${rule.value.date} ${rule.value.time}`, timezone);
      } else if (rule.value != null && typeof rule.value === "boolean") {
        value = rule.value;
      } else if (rule.value != null && Number.isFinite(Number(rule.value))) {
        value = Number(rule.value);
      } else {
        throw new Error("Invalid value");
      }
      break;
    case "notEqual":
      if (
        rule.value != null &&
        isDateTimeStrings(rule.value) &&
        rule.value.date != null &&
        rule.value.time != null &&
        validateDateTimeValues(rule.value.date, rule.value.time)
      ) {
        value = {
          $ne: formatToUTC(`${rule.value.date} ${rule.value.time}`, timezone),
        };
      } else if (rule.value != null && Number.isFinite(Number(rule.value))) {
        value = { $ne: Number(rule.value) };
      } else {
        throw new Error("Invalid value");
      }
      break;
    case "greaterThan":
      if (
        rule.value != null &&
        isDateTimeStrings(rule.value) &&
        rule.value.date != null &&
        rule.value.time != null &&
        validateDateTimeValues(rule.value.date, rule.value.time)
      ) {
        value = {
          $gt: formatToUTC(`${rule.value.date} ${rule.value.time}`, timezone),
        };
      } else if (rule.value != null && Number.isFinite(Number(rule.value))) {
        value = { $gt: Number(rule.value) };
      } else {
        throw new Error("Invalid value");
      }
      break;
    case "greaterThanEq":
      if (
        rule.value != null &&
        isDateTimeStrings(rule.value) &&
        rule.value.date != null &&
        rule.value.time != null &&
        validateDateTimeValues(rule.value.date, rule.value.time)
      ) {
        value = {
          $gte: formatToUTC(`${rule.value.date} ${rule.value.time}`, timezone),
        };
      } else if (rule.value != null && Number.isFinite(Number(rule.value))) {
        value = { $gte: Number(rule.value) };
      } else {
        throw new Error("Invalid value");
      }
      break;
    case "lessThan":
      if (
        rule.value != null &&
        isDateTimeStrings(rule.value) &&
        rule.value.date != null &&
        rule.value.time != null &&
        validateDateTimeValues(rule.value.date, rule.value.time)
      ) {
        value = {
          $lt: formatToUTC(`${rule.value.date} ${rule.value.time}`, timezone),
        };
      } else if (rule.value != null && Number.isFinite(Number(rule.value))) {
        value = { $lt: Number(rule.value) };
      } else {
        throw new Error("Invalid value");
      }
      break;
    case "lessThanEq":
      if (
        rule.value != null &&
        isDateTimeStrings(rule.value) &&
        rule.value.date != null &&
        rule.value.time != null &&
        validateDateTimeValues(rule.value.date, rule.value.time)
      ) {
        value = {
          $lte: formatToUTC(`${rule.value.date} ${rule.value.time}`, timezone),
        };
      } else if (rule.value != null && Number.isFinite(Number(rule.value))) {
        value = { $lte: Number(rule.value) };
      } else {
        throw new Error("Invalid value");
      }
      break;
    case "range":
      if (
        rule.value != null &&
        isDateTimeRange(rule.value) &&
        rule.value.start?.date != null &&
        rule.value.start?.time != null &&
        rule.value.end?.date != null &&
        rule.value.end?.time != null &&
        validateDateTimeValues(
          rule.value.start.date,
          rule.value.start.time,
          rule.value.end.date,
          rule.value.end.time,
        )
      ) {
        value = {
          $gte: formatToUTC(
            `${rule.value.start.date} ${rule.value.start.time}`,
            timezone,
          ),
          $lte: formatToUTC(
            `${rule.value.end.date} ${rule.value.end.time}`,
            timezone,
          ),
        };
      } else if (
        rule.value != null &&
        isNumericRange(rule.value) &&
        Number.isFinite(Number(rule.value.from)) &&
        Number.isFinite(Number(rule.value.to)) &&
        rule.value.from < rule.value.to
      ) {
        value = { $gte: Number(rule.value.from), $lte: Number(rule.value.to) };
      } else {
        throw new Error("Invalid value");
      }
      break;
    default:
      value = rule.value;
  }

  return { [rule.attribute]: value };
};

const groupToMongo = (group, timezone) => {
  if (group.combinator == null) {
    throw new Error("missing combinator");
  }

  // we can't use an implicit AND if:
  //  - we're in a OR
  //  - we have nested ANDs (unless only one and no other rules)
  //  - we have more than one nested OR
  const implicitAnd =
    group.combinator === "and" &&
    (group.rules.length <= 1 || groupHasNoSubGroupsOrJustOneOR(group));

  const initialValue = implicitAnd ? {} : { [`$${group.combinator}`]: [] };

  const mongo = group.rules.reduce((mongoRule, queryRule) => {
    let rule;

    if ("attribute" in queryRule && queryRule.attribute != null) {
      rule = ruleToMongo(queryRule, timezone);
    } else if ("combinator" in queryRule && queryRule.combinator != null) {
      rule = groupToMongo(queryRule, timezone);
    }

    if (rule != null) {
      if (implicitAnd) {
        Object.assign(mongoRule, rule);
      } else if (isAnd(mongoRule)) {
        mongoRule.$and.push(rule);
      } else if (isOr(mongoRule)) {
        mongoRule.$or.push(rule);
      }
    }

    return mongoRule;
  }, initialValue);

  return mongo;
};

export default (query, timezone = dayjs.tz.guess()) => {
  const isValid = !JSON.stringify(query, (key, value) =>
    value === undefined ? "undefined" : value,
  ).includes("undefined");

  if (isValid) return groupToMongo(query, timezone);

  throw new Error("Missing values");
};
