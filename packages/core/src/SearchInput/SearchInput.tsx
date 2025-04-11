import { HvAdornment } from "../FormElement";
import { HvIcon } from "../icons";
import { HvInput, HvInputProps } from "../Input";
import { fixedForwardRef } from "../types/generic";

export const HvSearchInput = fixedForwardRef(function HvSearchInput(
  props: HvInputProps<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <div>
      <HvInput
        ref={ref}
        type="search"
        disableSearchButton
        startAdornment={
          <HvAdornment
            icon={<HvIcon compact name="Search" title={"Search"} />}
          />
        }
        {...props}
      />
    </div>
  );
});
