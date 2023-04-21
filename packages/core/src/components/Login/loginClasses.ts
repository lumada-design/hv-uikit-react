import { getClasses } from "@core/utils";

export type HvLoginClasses = {
  root?: string;
  formContainer?: string;
};

const classKeys: string[] = ["root", "formContainer"];

const loginClasses = getClasses<HvLoginClasses>(classKeys, "HvLogin");

export default loginClasses;
