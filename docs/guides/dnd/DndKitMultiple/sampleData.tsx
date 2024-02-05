import {
  Battery,
  Cloud,
  Edit,
  Email,
  Favorite,
  Fire,
  Ghost,
  Heart,
  Palette,
  Share,
  Storage,
  Submit,
  Time,
} from "@hitachivantara/uikit-react-icons";

import { Column, Item } from "../types";

export const sampleColumns: Column[] = [
  {
    id: "column1",
    title: "To Do",
  },
  {
    id: "column2",
    title: "Done",
  },
];

export const sampleItems: Item[] = [
  { id: "item1", title: "Item 1", columnId: "column1", icon: <Ghost /> },
  { id: "item2", title: "Item 2", columnId: "column1", icon: <Cloud /> },
  { id: "item3", title: "Item 3", columnId: "column1", icon: <Battery /> },
  { id: "item4", title: "Item 4", columnId: "column1", icon: <Fire /> },
  { id: "item5", title: "Item 5", columnId: "column1", icon: <Ghost /> },
  { id: "item6", title: "Item 6", columnId: "column1", icon: <Palette /> },
  { id: "item7", title: "Item 7", columnId: "column1", icon: <Edit /> },
  { id: "item8", title: "Item 8", columnId: "column1", icon: <Heart /> },
  { id: "item9", title: "Item 9", columnId: "column1", icon: <Favorite /> },
  { id: "item10", title: "Item 10", columnId: "column2", icon: <Email /> },
  { id: "item11", title: "Item 11", columnId: "column2", icon: <Submit /> },
  { id: "item12", title: "Item 12", columnId: "column2", icon: <Share /> },
  { id: "item13", title: "Item 13", columnId: "column2", icon: <Time /> },
  { id: "item14", title: "Item 14", columnId: "column2", icon: <Storage /> },
];
