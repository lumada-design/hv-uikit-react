import { HvTypography } from "@hitachivantara/uikit-react-core";
import { Level0Good, Level3Bad } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import classes from "./styles";
import { Asset, Image, Status } from "./types";

type AssetDetailsProps = {
  // The asset
  asset: Asset;
  // Original image size
  size: Image["size"];
};

const getStatusDetails = (status: Status) => {
  switch (status) {
    case "approved": {
      return {
        color: theme.colors.positive,
        icon: <Level0Good semantic="positive" />,
      };
    }
    case "rejected": {
      return {
        color: theme.colors.negative,
        icon: <Level3Bad semantic="negative" />,
      };
    }
    case "undefined": {
      return {
        color: theme.colors.primary,
        icon: undefined,
      };
    }
    default:
      return {
        color: theme.colors.catastrophic,
        icon: undefined,
      };
  }
};

const AssetDetail = ({ asset, size }: AssetDetailsProps) => {
  const { status = "pending" } = asset;

  const statusDetails = getStatusDetails(status);

  const realTop = {
    x: (asset.location.top.x / size.width) * 100,
    y: (asset.location.top.y / size.height) * 100,
  };
  const realBottom = {
    x: (asset.location.bottom.x / size.width) * 100,
    y: (asset.location.bottom.y / size.height) * 100,
  };

  const excessAnomalies = asset.anomalies ? asset.anomalies.length - 3 : 0;

  return (
    <div className={classes.asset}>
      <div
        className={classes.assetIcon}
        style={{
          top: `calc(${realTop.y}% - 16px)`,
          left: `calc(${realBottom.x}% - 16px)`,
        }}
      >
        {statusDetails.icon}
      </div>
      <div
        className={classes.assetRectangle}
        style={{
          top: `${realTop.y}%`,
          left: `${realTop.x}%`,
          width: `${realBottom.x - realTop.x}%`,
          height: `${realBottom.y - realTop.y}%`,
          outline: `2px ${asset.style ?? "solid"} ${statusDetails.color}`,
        }}
      />
      {asset.anomalies && asset.anomalies.length > 0 && (
        <div
          className={classes.assetAnomaly}
          style={{
            outlineColor: statusDetails.color,
            top: `${realTop.y}%`,
            left: `calc(${realBottom.x}% + 2px)`,
          }}
        >
          {asset.anomalies?.slice(0, 3).map((anomaly, i) => (
            <HvTypography
              key={`anomaly.name-${i}`}
              variant="caption2"
              style={{
                color: statusDetails.color,
                fontWeight: theme.fontWeights.semibold,
              }}
            >
              {anomaly.name} {anomaly.value}
            </HvTypography>
          ))}
          {excessAnomalies > 0 && (
            <div
              className={classes.assetMore}
              style={{
                backgroundColor: statusDetails.color,
              }}
            >
              <HvTypography variant="caption2" style={{ color: "white" }}>
                +{excessAnomalies}
              </HvTypography>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssetDetail;
