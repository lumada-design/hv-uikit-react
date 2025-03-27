import {
  HvIconSprite,
  type HvIconSpriteProps,
} from "@hitachivantara/uikit-react-icons";

export interface IconUiKitProps
  extends Omit<HvIconSpriteProps, "iconName" | "spriteUrl"> {
  name: string;
}

const spriteUri = import.meta.resolve?.("@hv/uikit-icons/icons.svg");

const IconUiKit = ({ name, ...others }: IconUiKitProps) => {
  return (
    <HvIconSprite
      spriteUrl={spriteUri!}
      iconName={name}
      color="currentcolor"
      {...others}
    />
  );
};

export default IconUiKit;
