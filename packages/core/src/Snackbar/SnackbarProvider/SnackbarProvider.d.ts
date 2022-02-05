import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
  SnackbarProviderProps,
} from "notistack";
import { SemanticVariantTypes } from "../../Banner";
import { HvSnackbarContentProps } from "../SnackbarContentWrapper";

export interface HvSnackbarProviderProps extends SnackbarProviderProps {
  /**
   * Class object used to override notistack classes.
   */
  notistackClassesOverride?: Record<string, unknown>;
}

interface HvEnqueueOptions extends OptionsObject {
  id?: string;
  variant?: SemanticVariantTypes;
  snackbarContentProps?: HvSnackbarContentProps;
}

interface HvSnackbarProviderContext extends ProviderContext {
  enqueueSnackbar: (message: SnackbarMessage, options?: HvEnqueueOptions) => SnackbarKey;
}

export function useHvSnackbar(): HvSnackbarProviderContext;

export default function HvSnackbarProvider(props: HvSnackbarProviderProps): JSX.Element | null;
