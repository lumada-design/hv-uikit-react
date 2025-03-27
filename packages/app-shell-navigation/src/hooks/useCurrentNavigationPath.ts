import { useMemo } from "react";
import { useHvMenuItems } from "@hitachivantara/app-shell-shared";

export const useCurrentNavigationPath = () => {
  const { items, selectedMenuItemId } = useHvMenuItems();
  return useMemo(() => {
    let currentItems = items;

    if (!selectedMenuItemId) {
      return [];
    }
    const paths: { label: string; path: string | undefined }[] = [];

    const selectedPathIds = selectedMenuItemId.split("-");
    selectedPathIds.forEach((item) => {
      const currentItem = currentItems[parseInt(item, 10)];
      paths.push({
        label: currentItem.label,
        path: currentItem.data ? undefined : currentItem.href,
      });
      if (currentItem.data) {
        currentItems = currentItem.data;
      }
    });

    return paths;
  }, [items, selectedMenuItemId]);
};
