import {
  HvButton,
  HvCarousel,
  HvCarouselSlide,
  HvContainer,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Picture } from "@hitachivantara/uikit-react-icons";
import { useState } from "react";
import AssetDetail from "./AssetDetail";
import { images } from "./images";
import classes from "./styles";

const Anomalies = () => {
  const [view, setView] = useState(true);

  const renderThumbnail = (i: number) => {
    const img = images[i];
    return (
      <div className={classes.thumbnail}>
        <HvTypography variant="caption1">{img.name}</HvTypography>
        <img src={img.url} alt={`thumbnail-${i}`} />
      </div>
    );
  };

  return (
    <HvContainer className={classes.root} maxWidth="md">
      <HvCarousel
        thumbnailsPosition="top"
        controlsPosition="bottom"
        carouselOptions={{ loop: false }}
        renderThumbnail={renderThumbnail}
        height={500}
        actions={
          <HvButton icon variant="secondaryGhost">
            <Picture onClick={() => setView((p) => !p)} />
          </HvButton>
        }
        classes={{ panel: classes.thumbnails }}
      >
        {images.map((img) => (
          <HvCarouselSlide key={img.name} classes={{ slide: classes.slide }}>
            <div
              style={{
                position: "relative",
              }}
            >
              <div className={classes.imageWrapper}>
                <img
                  src={img.url}
                  alt={`${img.name}`}
                  className={classes.image}
                />
                <div className={classes.assets}>
                  {view &&
                    img.assets?.map((asset, i) => (
                      <AssetDetail
                        key={`asset-${i}`}
                        asset={asset}
                        size={img.size}
                      />
                    ))}
                </div>
              </div>
            </div>
          </HvCarouselSlide>
        ))}
      </HvCarousel>
      <div className={classes.legendContainer}>
        <div className={classes.legendCategory}>
          <div
            className={classes.legend}
            style={{
              backgroundColor: theme.colors.catastrophic,
            }}
          />
          <HvTypography variant="caption1">Pending for Approval</HvTypography>
        </div>{" "}
        <div className={classes.legendCategory}>
          <div
            className={classes.legend}
            style={{
              backgroundColor: theme.colors.primary,
            }}
          />
          <HvTypography variant="caption1">Undefined state</HvTypography>
        </div>
        <div className={classes.legendCategory}>
          <div
            className={classes.legend}
            style={{
              backgroundColor: theme.colors.positive,
            }}
          />
          <HvTypography variant="caption1">Accepted</HvTypography>
        </div>
        <div className={classes.legendCategory}>
          <div
            className={classes.legend}
            style={{
              backgroundColor: theme.colors.negative,
            }}
          />
          <HvTypography variant="caption1">Rejected</HvTypography>
        </div>
      </div>
    </HvContainer>
  );
};

export default Anomalies;
