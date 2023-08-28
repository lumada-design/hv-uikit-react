import { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import {
  HvCard,
  HvCardHeader,
  HvCardMedia,
  HvCardContent,
  HvCarousel,
  HvCarouselProps,
  HvCarouselSlide,
  HvDropDownMenu,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export default {
  title: "Widgets/Carousel",
  component: HvCarousel,
  subcomponents: { HvCarouselSlide },
  parameters: {
    eyes: {
      waitBeforeCapture: 5000,
    },
  },
} as Meta<typeof HvCarousel>;

export const Main: StoryObj<HvCarouselProps> = {
  args: {
    height: 500,
    thumbnailWidth: 120,
    title: "Landscapes",
    xs: false,
    showDots: false,
    showCounter: false,
    showFullscreen: true,
    showSlideControls: false,
    hideThumbnails: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    actions: { control: { disable: true } },
    children: { control: { disable: true } },
    carouselOptions: { control: { disable: true } },
  },
  render: (args: Partial<HvCarouselProps>) => {
    const images = [
      "https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg",
      "https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg",
      "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
      "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
      "https://photographylife.com/wp-content/uploads/2016/06/Mass.jpg",
      "https://static.photocdn.pt/images/articles/2018/08/20/articles/2017_8/easy_landscape_photography_tips.jpg",
      "https://images.squarespace-cdn.com/content/v1/56873b617086d7b18180c450/1570074633822-7J1FRR7Y80XR9A25DMFA/DSC_1341-Pano-Edit-2-Edit-Edit-Edit.jpg?format=1000w",
      "https://i1.adis.ws/i/canon/pro-landscape-photography-business-2_b76782acce404672b7d351dc98937699?$media-collection-full-dt-jpg$",
    ];

    const renderThumbnail = (i: number) => (
      <img src={images[i]} alt={`thumbnail-${i}`} />
    );

    return (
      <HvCarousel renderThumbnail={renderThumbnail} {...args}>
        {images.map((src, i) => (
          <HvCarouselSlide key={src} src={src} alt={`image-${i}`} />
        ))}
      </HvCarousel>
    );
  },
};

export const Actions: StoryObj<HvCarouselProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with no thumbnails and custom actions set to delete slides.<br /> \
          Deleting a slide will turn show the low-cardinality dots instead of arrow pagination. Can be overridden with `showDots`",
      },
    },
  },

  render: () => {
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState([
      "https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg",
      "https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg",
      "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
      "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
      "https://photographylife.com/wp-content/uploads/2016/06/Mass.jpg",
      "https://static.photocdn.pt/images/articles/2018/08/20/articles/2017_8/easy_landscape_photography_tips.jpg",
    ]);

    return (
      <HvCarousel
        title="Landscapes"
        showFullscreen
        onChange={setIndex}
        actions={
          <HvDropDownMenu
            placement="left"
            dataList={[{ id: "delete", label: "Delete" }]}
            onClick={(evt, action) => {
              if (action.id === "delete") {
                setImages([
                  ...images.slice(0, index),
                  ...images.slice(index + 1),
                ]);
              }
            }}
          />
        }
      >
        {images.map((src, i) => (
          <HvCarouselSlide key={src} src={src} alt={`image-${i}`} />
        ))}
      </HvCarousel>
    );
  },
};

export const Embedded: StoryObj<HvCarouselProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Carousel embedded in an `HvCard`, using the `xs` prop.<br /> \
        A custom `height` is set as the default `16/9` aspect-ratio doesn't fit.",
      },
    },
  },
  render: () => {
    const images = [
      { name: "DarthVader", src: "https://i.imgur.com/zAeHrRF.jpg" },
      { name: "BobaFett", src: "https://i.imgur.com/0OR7lyx.jpg" },
      { name: "Revan", src: "https://i.imgur.com/WmgIWxw.jpg" },
      { name: "TheMandalorian", src: "https://i.imgur.com/kjPDte9.jpg" },
      { name: "Anakin", src: "https://i.imgur.com/5QbhIqE.jpg" },
      { name: "Ahsoka", src: "https://i.imgur.com/MqqmCWc.jpg" },
      { name: "ObiWan", src: "https://i.imgur.com/zJe518o.png" },
      { name: "Mace", src: "https://i.imgur.com/wgeZ4uO.jpg" },
      { name: "Yoda", src: "https://i.imgur.com/65lzJlV.jpg" },
    ];

    return (
      <HvCard bgcolor="atmo1" style={{ width: 350 }}>
        <HvCardHeader title="Image Carousel" />
        <HvCardMedia role="none">
          <HvCarousel xs height={400}>
            {images.map(({ src, name }) => (
              <HvCarouselSlide
                key={src}
                src={src}
                alt={`image ${name}`}
                style={{ objectFit: "cover" }}
              />
            ))}
          </HvCarousel>
        </HvCardMedia>
        <HvCardContent>
          <div style={{ paddingTop: "20px" }}>
            <HvTypography variant="label">ID</HvTypography>
            <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
      </HvCard>
    );
  },
};

export const Options: StoryObj<HvCarouselProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can control the `HvCarousel`'s configuration via the `carouselOptions` prop. See [options documentation](https://www.embla-carousel.com/api/options/).",
      },
    },
  },

  render: () => {
    const startIndex = 2;
    const images = [
      "https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg",
      "https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg",
      "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
      "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
      "https://photographylife.com/wp-content/uploads/2016/06/Mass.jpg",
      "https://static.photocdn.pt/images/articles/2018/08/20/articles/2017_8/easy_landscape_photography_tips.jpg",
      "https://images.squarespace-cdn.com/content/v1/56873b617086d7b18180c450/1570074633822-7J1FRR7Y80XR9A25DMFA/DSC_1341-Pano-Edit-2-Edit-Edit-Edit.jpg?format=1000w",
      "https://i1.adis.ws/i/canon/pro-landscape-photography-business-2_b76782acce404672b7d351dc98937699?$media-collection-full-dt-jpg$",
    ];

    const carouselOptions: HvCarouselProps["carouselOptions"] = {
      loop: false,
      dragFree: true,
      startIndex,
    };

    return (
      <HvCarousel
        title="Landscapes"
        showFullscreen
        carouselOptions={carouselOptions}
        renderThumbnail={(i) => <img src={images[i]} alt={`thumbnail-${i}`} />}
      >
        {images.map((src, i) => (
          <HvCarouselSlide key={src} src={src} alt={`image-${i}`} />
        ))}
      </HvCarousel>
    );
  },
};

export const CustomContent: StoryObj<HvCarouselProps> = {
  parameters: {
    docs: {
      description: {
        story: "A Carousel supports any kind of content, not just images.",
      },
    },
  },

  render: () => {
    const images = [
      "https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg",
      "https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg",
      "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
      "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
      "https://photographylife.com/wp-content/uploads/2016/06/Mass.jpg",
      "https://static.photocdn.pt/images/articles/2018/08/20/articles/2017_8/easy_landscape_photography_tips.jpg",
      "https://images.squarespace-cdn.com/content/v1/56873b617086d7b18180c450/1570074633822-7J1FRR7Y80XR9A25DMFA/DSC_1341-Pano-Edit-2-Edit-Edit-Edit.jpg?format=1000w",
      "https://i1.adis.ws/i/canon/pro-landscape-photography-business-2_b76782acce404672b7d351dc98937699?$media-collection-full-dt-jpg$",
    ];

    return (
      <HvCarousel title="Travel Suggestions" carouselOptions={{ loop: false }}>
        {images.map((src, i) => (
          <HvCarouselSlide key={src} size="50%">
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  width: "70%",
                  margin: theme.space.md,
                  padding: theme.space.xs,
                  backgroundColor: `rgba(0, 0, 0, 0.5)`,
                }}
              >
                <HvTypography
                  variant="title3"
                  style={{ color: theme.colors.base_light }}
                >
                  Travel destination {i + 1}
                </HvTypography>
                <HvTypography style={{ color: theme.colors.base_light }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </HvTypography>
              </div>
              <img
                src={src}
                alt={`travel destination ${i}`}
                style={{ width: 600, aspectRatio: "16/9" }}
              />
            </div>
          </HvCarouselSlide>
        ))}
      </HvCarousel>
    );
  },
};
