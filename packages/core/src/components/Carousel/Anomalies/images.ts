import { Image } from "./types";

export const images: Image[] = [
  {
    name: "Image 1",
    url: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT/2019-PT/pt09featureku-polyone5gbasestationantennatelecommunications-tower-feat.jpg;maxWidth=1200",
    size: {
      width: 804,
      height: 669,
    },
    assets: [
      {
        status: "approved",
        location: { top: { x: 310, y: 110 }, bottom: { x: 380, y: 210 } },
        anomalies: [
          { name: "BOLTRUST", value: "85%" },
          { name: "BOLTRUST", value: "77%" },
          { name: "BOLTRUST", value: "64%" },
          { name: "BOLTRUST", value: "53%" },
        ],
      },
      {
        status: "rejected",
        style: "dashed",
        location: { top: { x: 400, y: 410 }, bottom: { x: 435, y: 470 } },
        anomalies: [{ name: "BOLTRUST", value: "13%" }],
      },
      {
        status: "pending",
        location: { top: { x: 600, y: 240 }, bottom: { x: 660, y: 300 } },
        anomalies: [
          { name: "BOLTRUST", value: "24%" },
          { name: "BOLTRUST", value: "39%" },
        ],
      },
    ],
  },
  {
    name: "Image 2",
    url: "https://i.ibb.co/Mhb1KTH/poles.png",
    size: {
      width: 832,
      height: 500,
    },
    assets: [
      { location: { top: { x: 345, y: 40 }, bottom: { x: 430, y: 100 } } },
      {
        status: "rejected",
        location: { top: { x: 620, y: 210 }, bottom: { x: 680, y: 250 } },
      },
    ],
  },
  {
    name: "Image 3",
    url: "https://i.ibb.co/WfGg3WX/pole.png",
    size: {
      width: 332,
      height: 724,
    },
    assets: [
      {
        status: "approved",
        location: { top: { x: 90, y: 90 }, bottom: { x: 150, y: 170 } },
      },
    ],
  },
  {
    name: "Image 4",
    url: "https://solutions.borderstates.com/wp-content/uploads/01980-2021_discontinuation-of-penta-blog-post_header-image.jpg",
    size: {
      width: 1080,
      height: 400,
    },
    assets: [
      {
        location: { top: { x: 310, y: 130 }, bottom: { x: 480, y: 220 } },
      },
    ],
  },
  {
    name: "Image 5",
    url: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/frpower_line_telephone_pole-image-kycfsdr7.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b4a4d47f1a56fe82eb299528098fe05a",
    size: {
      width: 800,
      height: 532,
    },
    assets: [
      {
        status: "approved",
        location: { top: { x: 395, y: 280 }, bottom: { x: 470, y: 335 } },
        anomalies: [{ name: "BOLTRUST", value: "85%" }],
      },
    ],
  },

  // {
  //   name: "Image 3",
  //   url: "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg?format=1000w",
  // },
  // {
  //   name: "Image 4",
  //   url: "https://blog.nzibs.co.nz/wp-content/uploads/2020/02/Landscape-1280x640.jpg",
  // },
  // {
  //   name: "Image 5",
  //   url: "https://photographylife.com/wp-content/uploads/2016/06/Mass.jpg",
  // },
  // {
  //   name: "Image 6",
  //   url: "https://static.photocdn.pt/images/articles/2018/08/20/articles/2017_8/easy_landscape_photography_tips.jpg",
  // },
  // {
  //   name: "Image 7",
  //   url: "https://images.squarespace-cdn.com/content/v1/56873b617086d7b18180c450/1570074633822-7J1FRR7Y80XR9A25DMFA/DSC_1341-Pano-Edit-2-Edit-Edit-Edit.jpg?format=1000w",
  // },
  // {
  //   name: "Image 8",
  //   url: "https://i1.adis.ws/i/canon/pro-landscape-photography-business-2_b76782acce404672b7d351dc98937699?$media-collection-full-dt-jpg$",
  // },
];
