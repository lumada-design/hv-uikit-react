import { Meta, StoryObj } from "@storybook/react";

import {
  HvTypography,
  HvCard,
  HvCardHeader,
  HvCardMedia,
  HvCardContent,
  HvDropDownMenu,
} from "@hitachivantara/uikit-react-core";

import { HvCarousel, HvCarouselProps } from "../..";

export default {
  title: "Lab/Carousel",
  component: HvCarousel,
} as Meta<typeof HvCarousel>;

export const Main: StoryObj<HvCarouselProps> = {
  args: {
    height: 400,
    thumbnailWidth: 120,
    title: "Wallpapers",
    xs: false,
    showDots: false,
    showCounter: false,
    showFullscreen: true,
    showSlideControls: false,
    hideThumbnails: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    documents: { control: { disable: true } },
    actions: { control: { disable: true } },
    carouselOptions: { control: { disable: true } },
  },
  render: (args: Partial<HvCarouselProps>) => {
    const images = [
      "https://www.picturecorrect.com/wp-content/uploads/2016/11/landscape-photography-components.jpg",
      "https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg",
      "https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg",
      "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
      "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
      "https://photographylife.com/wp-content/uploads/2016/06/Mass.jpg",
      "https://static.photocdn.pt/images/articles/2018/08/20/articles/2017_8/easy_landscape_photography_tips.jpg",
      "https://images.squarespace-cdn.com/content/v1/56873b617086d7b18180c450/1570074633822-7J1FRR7Y80XR9A25DMFA/DSC_1341-Pano-Edit-2-Edit-Edit-Edit.jpg?format=1000w",
      "https://i1.adis.ws/i/canon/pro-landscape-photography-business-2_b76782acce404672b7d351dc98937699?$media-collection-full-dt-jpg$",
      "https://cdn.photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    ];

    return (
      <HvCarousel
        documents={images.map((src, i) => ({ src, value: `img${i}` }))}
        {...args}
      />
    );
  },
};

export const LowCardinality = () => {
  const images = [
    "https://www.picturecorrect.com/wp-content/uploads/2016/11/landscape-photography-components.jpg",
    "https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg",
    "https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg",
    "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
    "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
    "https://photographylife.com/wp-content/uploads/2016/06/Mass.jpg",
    "https://static.photocdn.pt/images/articles/2018/08/20/articles/2017_8/easy_landscape_photography_tips.jpg",
    "https://images.squarespace-cdn.com/content/v1/56873b617086d7b18180c450/1570074633822-7J1FRR7Y80XR9A25DMFA/DSC_1341-Pano-Edit-2-Edit-Edit-Edit.jpg?format=1000w",
    "https://i1.adis.ws/i/canon/pro-landscape-photography-business-2_b76782acce404672b7d351dc98937699?$media-collection-full-dt-jpg$",
    "https://cdn.photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
  ];

  const title = (
    <HvTypography paragraph variant="xsTitle">
      Landscapes
    </HvTypography>
  );

  return (
    <HvCarousel
      height={600}
      title={title}
      showDots
      showFullscreen
      actions={
        <HvDropDownMenu
          placement="left"
          dataList={[{ id: "1", label: "action1" }]}
        />
      }
      documents={images.map((src, i) => ({ src, value: `landscape${i + 1}` }))}
    />
  );
};

export const ImageCarouselXS = () => {
  const images = [
    { value: "DarthVader", src: "https://i.imgur.com/zAeHrRF.jpg" },
    { value: "BobaFett", src: "https://i.imgur.com/0OR7lyx.jpg" },
    { value: "Revan", src: "https://i.imgur.com/WmgIWxw.jpg" },
    { value: "TheMandalorian", src: "https://i.imgur.com/kjPDte9.jpg" },
    { value: "Anakin", src: "https://i.imgur.com/5QbhIqE.jpg" },
    { value: "Ahsoka", src: "https://i.imgur.com/MqqmCWc.jpg" },
    { value: "ObiWan", src: "https://i.imgur.com/zJe518o.png" },
    { value: "Mace", src: "https://i.imgur.com/wgeZ4uO.jpg" },
    { value: "Yoda", src: "https://i.imgur.com/65lzJlV.jpg" },
  ];

  return (
    <HvCard bgcolor="atmo1" style={{ width: 350 }}>
      <HvCardHeader title="Image Carousel" aria-label="Compressor" />
      <HvCardMedia>
        <HvCarousel xs height={200} documents={images} showCounter />
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
