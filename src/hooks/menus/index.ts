import { Menu } from "@/api/sys";
import Icon from "@/components/Icon";
import React from "react";

export function addIconToMenu(menus: Menu[]) {
  menus.forEach((item) => {
    if (item.icon) {
      item.icon = React.createElement(Icon, { icon: item.path });
    }
    if (item.children) {
      addIconToMenu(item.children);
    }
  });
  return menus;
}
