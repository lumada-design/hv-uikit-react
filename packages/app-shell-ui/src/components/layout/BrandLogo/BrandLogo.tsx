import { useTranslation } from "react-i18next";
import {
  CONFIG_TRANSLATIONS_NAMESPACE,
  HvAppShellConfig,
} from "@hitachivantara/app-shell-shared";

import { Hitachi, Lumada, Pentaho } from "./logos";

export type HvBrandLogoProps = {
  logo?: HvAppShellConfig["logo"];
};

const BrandLogo = ({ logo }: HvBrandLogoProps) => {
  const { t: tConfig } = useTranslation(CONFIG_TRANSLATIONS_NAMESPACE);

  if (!logo) {
    // When the user explicitly passes "null" to the logo, we don't use any logo
    if (logo === null) {
      return null;
    }

    // Otherwise, use Hitachi's logo
    return <Hitachi />;
  }

  // Rules out explicit null value or non-existent prop but assumes empty string
  const description =
    logo.description != null ? tConfig(logo.description) : undefined;

  if (logo.name === "LUMADA") {
    return <Lumada description={description} />;
  }
  if (logo.name === "PENTAHO") {
    return <Pentaho description={description} />;
  }
  return <Hitachi description={description} />;
};

export default BrandLogo;
