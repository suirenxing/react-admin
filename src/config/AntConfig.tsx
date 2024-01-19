import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import useAppStore from "@/store/module/appStore";

export default function AntConfig({ children }: { children: React.ReactNode }) {
  // const [primary, setPrimary] = useState("#1677ff");
  const { primary } = useAppStore();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primary,
        },
        components: {
          Layout: {
            headerBg: primary,
            siderBg: "#fff",
          },
        },
      }}
      locale={zhCN}
    >
      {children}
    </ConfigProvider>
  );
}
