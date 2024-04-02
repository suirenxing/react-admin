import { createElement } from "react";
import SvgIcon from "./SvgIcon";
import * as Icons from "@ant-design/icons";

interface Props {
  icon: string;
  color?: string;
  size?: number | string;
  prefix?: string;
}
const SVG_FLAG = "|svg";
export default function Icon(props: Props) {
  if (props.icon.endsWith(SVG_FLAG)) {
    return <SvgIcon {...props} />;
  }
  return createElement((Icons as any)[props.icon], {
    twoToneColor: props.color,
    style: {
      fontSize: props.size,
    },
  });
}
Icon.defaultProps = {
  size: "16px",
};
