import React from "react";

import {
  HvTypography,
  HvCard,
  HvCardHeader,
  HvCardMedia,
  HvCardContent,
} from "@hitachivantara/uikit-react-core";

import { HvImageCarousel } from "../..";

import DarthVader from "./resources/DarthVader.png";
import BobaFett from "./resources/BobaFett.jpg";
import Revan from "./resources/Revan.png";
import TheMandalorian from "./resources/TheMandalorian.jpg";
import Anakin from "./resources/AnakinSkywalker.jpg";
import Ahsoka from "./resources/Ahsoka.jpg";
import ObiWan from "./resources/Obiwan.webp";
import Mace from "./resources/MaceWindu.jpg";
import Yoda from "./resources/Yoda.jpg";

export default {
  title: "Lab/ImageCarousel",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvImageCarousel } from '@hitachivantara/uikit-react-lab'",
  },
  component: HvImageCarousel,
};

export const Main = () => {
  const images = [
    { src: DarthVader, value: "DarthVader" },
    { src: BobaFett, value: "BobaFett" },
    { src: Revan, value: "Revan" },
    { src: TheMandalorian, value: "TheMandalorian" },
    { src: Anakin, value: "Anakin" },
    { src: Ahsoka, value: "Ahsoka" },
    { src: ObiWan, value: "ObiWan" },
    { src: Mace, value: "Mace" },
    { src: Yoda, value: "Yoda" },
  ];

  const title = (
    <HvTypography paragraph variant="xsTitle">
      Star Wars Characters
    </HvTypography>
  );

  return <HvImageCarousel documents={images} title={title} thumbnails infiniteCarousel />;
};
export const WithoutThumbnails = () => {
  const images = [
    { src: DarthVader, value: "DarthVader2" },
    { src: BobaFett, value: "BobaFett2" },
    { src: Revan, value: "Revan2" },
    { src: TheMandalorian, value: "TheMandalorian2" },
    { src: Anakin, value: "Anakin2" },
    { src: Ahsoka, value: "Ahsoka2" },
    { src: ObiWan, value: "ObiWan2" },
    { src: Mace, value: "Mace2" },
    { src: Yoda, value: "Yoda2" },
  ];

  return <HvImageCarousel documents={images} />;
};

export const LowCardinality = () => {
  const images = [
    {
      src: "https://www.picturecorrect.com/wp-content/uploads/2016/11/landscape-photography-components.jpg",
      value: "Landscape1",
    },
    {
      src: "https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg?ixlib=rb-1.1.0&rect=273%2C0%2C2639%2C1379&q=45&auto=format&w=926&fit=clip",
      value: "Landscape2",
    },
    {
      src: "https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg",
      value: "Landscape3",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
      value: "Landscape4",
    },
    {
      src: "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
      value: "Landscape5",
    },
    { src: "https://photographylife.com/wp-content/uploads/2016/06/Mass.jpg", value: "Landscape6" },
    {
      src: "https://static.photocdn.pt/images/articles/2018/08/20/articles/2017_8/easy_landscape_photography_tips.jpg",
      value: "Landscape7",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/56873b617086d7b18180c450/1570074633822-7J1FRR7Y80XR9A25DMFA/DSC_1341-Pano-Edit-2-Edit-Edit-Edit.jpg?format=1000w",
      value: "Landscape8",
    },
    {
      src: "https://i1.adis.ws/i/canon/pro-landscape-photography-business-2_b76782acce404672b7d351dc98937699?$media-collection-full-dt-jpg$",
      value: "Landscape9",
    },
    {
      src: "https://cdn.photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
      value: "Landscape10",
    },
  ];

  const title = (
    <HvTypography paragraph variant="xsTitle">
      Landscapes
    </HvTypography>
  );

  return (
    <HvImageCarousel
      documents={images}
      title={title}
      lowCardinality
      thumbnails
      infiniteCarousel
      fullscreen
      variant="cover"
    />
  );
};

export const ImageCarouselXS = () => {
  const images = [
    {
      src: "https://www.picturecorrect.com/wp-content/uploads/2016/11/landscape-photography-components.jpg",
      value: "Landscape1",
    },
    {
      src: "https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg?ixlib=rb-1.1.0&rect=273%2C0%2C2639%2C1379&q=45&auto=format&w=926&fit=clip",
      value: "Landscape2",
    },
    {
      src: "https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg",
      value: "Landscape3",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
      value: "Landscape4",
    },
    {
      src: "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
      value: "Landscape5",
    },
  ];

  return (
    <HvCard bgcolor="atmo1" style={{ width: 350 }}>
      <HvCardHeader title="Image Carousel" aria-label="Compressor" />
      <HvCardMedia>
        <HvImageCarousel documents={images} xs counter infiniteCarousel variant="cover" />
      </HvCardMedia>
      <HvCardContent>
        <div style={{ paddingTop: "20px" }}>
          <HvTypography variant="highlightText">ID</HvTypography>
          <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
        </div>
        <div style={{ marginTop: "20px" }}>
          <HvTypography variant="highlightText">Last connected</HvTypography>
          <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
        </div>
      </HvCardContent>
    </HvCard>
  );
};
