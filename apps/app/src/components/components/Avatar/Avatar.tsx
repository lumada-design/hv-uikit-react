import { HvAvatar } from "@hitachivantara/uikit-react-core";
import { LogIn } from "@hitachivantara/uikit-react-icons";

import man1 from "./resources/man-1.png";
import woman1 from "./resources/woman-1.png";

export const Avatar = () => {
  return (
    <div className="flex gap-md">
      <HvAvatar>
        <LogIn color="atmo1" iconSize="XS" />
      </HvAvatar>
      <HvAvatar id="status1" size="sm" status="negative">
        AB
      </HvAvatar>
      <HvAvatar id="badge1" size="lg" status="neutral" alt="Ben" src={man1}>
        AB
      </HvAvatar>
      <HvAvatar
        id="status2"
        size="lg"
        badge="positive"
        alt="Beatrice"
        src={woman1}
      >
        AB
      </HvAvatar>
    </div>
  );
};
