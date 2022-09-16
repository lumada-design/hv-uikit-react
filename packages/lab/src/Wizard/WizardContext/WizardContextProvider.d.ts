import { StandardProps } from "@mui/material";

export type HvWizardContextProviderClassKey = "root";

export interface HvWizardContextProviderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvWizardContextProviderClassKey> {
  /**
   * Initial context value
   */
  value?: {
    /**
     * Initial context object
     */
    context: any;
    /**
     * Function to modify the context
     */
    setContext: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  };
  /**
   * Child components for the Wizard
   */
  children?: React.ReactNode;
}

export default function HvWizardContextProvider(
  props: HvWizardContextProviderProps
): JSX.Element | null;
