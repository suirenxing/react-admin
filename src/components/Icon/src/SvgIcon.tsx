import { useMemo } from "react";

interface Props {
  name: string;
  size?: string | number;
  color?: string;
  prefix?: string;
}
function SvgIcon(props: Props) {
  const iconName = useMemo<string>(() => {
    return `#${props.prefix}-${props.name}`;
  }, [props.prefix, props.name]);
  return (
    <svg style={{ height: props.size, width: props.size }}>
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
