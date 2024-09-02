import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HvButton } from "@hitachivantara/uikit-react-core";
import { HvIconContainer } from "@hitachivantara/uikit-react-icons";

export const ExternalIcons = () => (
  <HvButton
    size="xl"
    startIcon={
      <HvIconContainer size="md" color="brand">
        <FontAwesomeIcon icon={faAdd} />
      </HvIconContainer>
    }
  >
    Button
  </HvButton>
);
