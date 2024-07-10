import {
  Battery,
  Cloud,
  Edit,
  Favorite,
  Fire,
  Ghost,
  Heart,
  Palette,
} from "@hitachivantara/uikit-react-icons";

import { Item } from "./types";

export const sampleItems: Item[] = [
  { id: "item1", title: "Item 1", icon: <Ghost /> },
  { id: "item2", title: "Item 2", icon: <Cloud /> },
  { id: "item3", title: "Item 3", icon: <Battery /> },
  { id: "item4", title: "Item 4", icon: <Fire /> },
  { id: "item5", title: "Item 5", icon: <Ghost /> },
  { id: "item6", title: "Item 6", icon: <Palette /> },
  { id: "item7", title: "Item 7", icon: <Edit /> },
  { id: "item8", title: "Item 8", icon: <Heart /> },
  { id: "item9", title: "Item 9", icon: <Favorite /> },
];
