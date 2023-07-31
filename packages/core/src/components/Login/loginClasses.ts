import { getClasses } from "@core/utils/classes";

export interface HvLoginClasses {
  root?: string;
  formContainer?: string;
}

const classKeys: (keyof HvLoginClasses)[] = ["root", "formContainer"];

const loginClasses = getClasses(classKeys, "HvLogin");

export default loginClasses;
