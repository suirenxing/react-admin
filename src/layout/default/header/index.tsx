import setting from "@/settings/projectSetting";
import useAppStore from "@/store/module/appStore";
import { ColorPicker } from "antd";
export default function Header() {
  const { primary, setPrimary } = useAppStore();
  return (
    <div>
      {setting.showThemeColor && (
        <ColorPicker
          showText
          value={primary}
          onChangeComplete={(color) => setPrimary(color.toHexString())}
        />
      )}
    </div>
  );
}
