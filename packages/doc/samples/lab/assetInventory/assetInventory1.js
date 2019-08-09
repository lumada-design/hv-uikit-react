import React from "react";
import HvAssetInventory from "@hv/uikit-react-lab/dist/AssetInventory";
import Grid from "@material-ui/core/Grid";
import HvCard from "@hv/uikit-react-core/dist/Card";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import compressor from "../../components/card/resources/leaf.png";
import withStyles from "@material-ui/core/styles/withStyles";

const data = {
  firstTitle: "ID",
  firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
  secondTitle: "Last connected",
  secondContent: "Aug 30, 2017 12:27:53 PM"
};

const SingleContent = () => (
  <div>
    <div>
      <div>
        <HvTypography variant="highlightText">{data.firstTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="infoText">{data.firstContent}</HvTypography>
      </div>
    </div>
    <div style={{ marginTop: "15px" }}>
      <div>
        <HvTypography variant="highlightText">{data.secondTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="infoText">{data.secondContent}</HvTypography>
      </div>
    </div>
  </div>
);

const listStyles = theme => ({
  root: {
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    padding: "0px 20px 0px 20px"
  },
  titleRoot: {
    width: "400px"
  },
  image: {
    width: "180px",
    height: "60px",
    padding: "0px 20px 0px 20px"
  },
  whenRoot: {
    width: "200px"
  }
});

const ListItem = ({ title, imageSrc, when, classes }) => (
  <div className={classes.root}>
    <div className={classes.titleRoot}>
      <HvTypography variant="sTitle">{title}</HvTypography>
    </div>
    <img alt={""} src={imageSrc} className={classes.image} />
    <div className={classes.whenRoot}>
      <HvTypography variant="normalText">{when}</HvTypography>
    </div>
    <div style={{ paddingLeft: "20px" }}>
      <div>
        <HvTypography variant="highlightText">{data.firstTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="infoText">{data.firstContent}</HvTypography>
      </div>
    </div>
    <div style={{ paddingLeft: "20px" }}>
      <div>
        <HvTypography variant="highlightText">{data.secondTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="infoText">{data.secondContent}</HvTypography>
      </div>
    </div>
  </div>
);

const CustomListItem = withStyles(listStyles, { withTheme: true })(ListItem);

const list = [
  <CustomListItem
    title={"Leaves appear wilted and scorched"}
    imageSrc={compressor}
    when="just now | L20"
  />,
  <CustomListItem
    title={"Cracked brown lesions on fruit"}
    imageSrc={compressor}
    when="2 minutes ago | L20"
  />,
  <CustomListItem
    title={"Staking and pruning M20 Ace 55"}
    imageSrc={compressor}
    when="12 Jan 2018, 11:23 AM | L20"
  />,
  <CustomListItem
    title={"Leaves appear wilted and scorched"}
    imageSrc={compressor}
    when="just now | L20"
  />,
  <CustomListItem
    title={"Cracked brown lesions on fruit"}
    imageSrc={compressor}
    when="2 minutes ago | L20"
  />,
  <CustomListItem
    title={"Staking and pruning M20 Ace 55"}
    imageSrc={compressor}
    when="12 Jan 2018, 11:23 AM | L20"
  />
];

const listCard = [
  <HvCard
    headerTitle="Leaves appear wilted and scorched"
    subheader="just now | L20"
    innerCardContent={<SingleContent />}
    mediaPath={compressor}
    mediaHeight={186}
  />,
  <HvCard
    headerTitle="Cracked brown lesions on fruit"
    subheader="2 minutes ago | L20"
    innerCardContent={<SingleContent />}
    mediaPath={compressor}
    mediaHeight={186}
  />,
  <HvCard
    headerTitle="Staking and pruning M20 Ace 55"
    subheader="12 Jan 2018, 11:23 AM | L20"
    innerCardContent={<SingleContent />}
    mediaPath={compressor}
    mediaHeight={186}
  />,
  <HvCard
    headerTitle="Leaves appear wilted and scorched"
    subheader="just now | L20"
    innerCardContent={<SingleContent />}
    mediaPath={compressor}
    mediaHeight={186}
  />,
  <HvCard
    headerTitle="Cracked brown lesions on fruit"
    subheader="2 minutes ago | L20"
    innerCardContent={<SingleContent />}
    mediaPath={compressor}
    mediaHeight={186}
  />,
  <HvCard
    headerTitle="Staking and pruning M20 Ace 55"
    subheader="12 Jan 2018, 11:23 AM | L20"
    innerCardContent={<SingleContent />}
    mediaPath={compressor}
    mediaHeight={186}
  />
];

const GridBuild = ({ list }) => (
  <Grid container spacing={30}>
    {list.map(elem => (
      <Grid item>
        <div>{elem}</div>
      </Grid>
    ))}
  </Grid>
);

export default (
  <HvAssetInventory
    assetsTitle="Events"
    cardRenderComponent={<GridBuild list={listCard} />}
    listRenderComponent={<GridBuild list={list} />}
  />
);
