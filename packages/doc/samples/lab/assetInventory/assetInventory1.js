/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import HvAssetInventory from "@hv/uikit-react-lab/dist/AssetInventory";
import Grid from "@material-ui/core/Grid";
import HvCard from "@hv/uikit-react-core/dist/Card";
import Typography from "@material-ui/core/Typography";
import compressor from "../../core/card/resources/leaf.png";
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
      <Typography>{data.firstTitle}</Typography>
      <Typography>{data.firstContent}</Typography>
    </div>
    <div style={{ marginTop: "15px" }}>
      <Typography>{data.secondTitle}</Typography>
      <Typography>{data.secondContent}</Typography>
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
  titleTypography: {
    ...theme.hv.typography.sTitle
  },
  image: {
    width: "180px",
    height: "60px",
    padding: "0px 20px 0px 20px"
  },
  whenRoot: {
    width: "200px"
  },
  normalTypography: {
    ...theme.hv.typography.normalText
  }
});

const ListItem = ({ title, imageSrc, when, classes }) => (
  <div className={classes.root}>
    <div className={classes.titleRoot}>
      <Typography className={classes.titleTypography}>{title}</Typography>
    </div>
    <img alt={""} src={imageSrc} className={classes.image} />
    <div className={classes.whenRoot}>
      <Typography className={classes.normalTypography}>{when}</Typography>
    </div>
    <div style={{ paddingLeft: "20px" }}>
      <Typography className={classes.normalTypography}>
        {data.firstTitle}
      </Typography>
      <Typography className={classes.normalTypography}>
        {data.firstContent}
      </Typography>
    </div>
    <div style={{ paddingLeft: "20px" }}>
      <Typography className={classes.normalTypography}>
        {data.secondTitle}
      </Typography>
      <Typography className={classes.normalTypography}>
        {data.secondContent}
      </Typography>
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
