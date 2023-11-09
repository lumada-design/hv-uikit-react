import { HvAvatar } from "@hitachivantara/uikit-react-core";
import { LogIn } from "@hitachivantara/uikit-react-icons";

export const Avatar = () => {
  return (
    <div className="flex gap-md">
      <HvAvatar>
        <LogIn color="atmo1" iconSize="XS" />
      </HvAvatar>
      <HvAvatar id="status1" size="sm" status="negative">
        AB
      </HvAvatar>
      <HvAvatar
        id="badge1"
        size="lg"
        status="neutral"
        alt="Ben"
        src="https://i.imgur.com/Cq5LCMu.png"
      >
        AB
      </HvAvatar>
      <HvAvatar
        id="status2"
        size="lg"
        badge="positive"
        alt="Beatrice"
        src="https://i.imgur.com/DCgvHDW.png"
      >
        AB
      </HvAvatar>
    </div>
  );
};
