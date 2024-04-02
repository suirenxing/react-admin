import SvgIcon from "./SvgIcon";

interface Props {
  icon: string;
  color?: string;
  size?: number | string;
  prefix: string;
}
const SVG_FLAG = "|svg";
export default function Icon(props: Props) {
  if (props.icon.endsWith(SVG_FLAG)) {
    return <SvgIcon {...props} />;
  }
  return <div>{props.icon}</div>;
}
