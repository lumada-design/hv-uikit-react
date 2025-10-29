/**
 * A loading button.
 */
import { useState } from "react";
import {
  HvButton,
  HvButtonProps,
  HvLoading,
} from "@hitachivantara/uikit-react-core";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Demo() {
  return <LoadingButton onClick={() => delay(3000)}>Submit</LoadingButton>;
}

function LoadingButton({ onClick, children, ...others }: HvButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <HvButton
      className="w-140px"
      disabled={isLoading}
      onClick={async (event) => {
        setIsLoading(true);
        await onClick?.(event);
        setIsLoading(false);
      }}
      {...others}
    >
      {isLoading ? <HvLoading small color="inherit" /> : children}
    </HvButton>
  );
}
