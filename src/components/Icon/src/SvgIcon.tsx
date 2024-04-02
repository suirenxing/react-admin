import { useMemo } from "react";

interface Props {
  icon: string;
  size?: string | number;
  color?: string;
  prefix?: string;
}
function SvgIcon(props: Props) {
  const className = props.icon.split("|")[0];
  const iconName = useMemo<string>(() => {
    return `#${props.prefix}-${className}`;
  }, [props.prefix, className]);
  return (
    <svg style={{ height: props.size, width: props.size, marginRight: "10px" }}>
      <use href={iconName} fill={props.color} />
    </svg>
  );
}
SvgIcon.defaultProps = {
  name: "",
  size: "1em",
  color: "#333",
  prefix: "icon",
};
export default SvgIcon;
