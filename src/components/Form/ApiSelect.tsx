import { Select } from "antd";
import { useEffect, useState } from "react";

interface Props {
  api: (params: Recordable) => Promise<any>;
  params?: Recordable;
  resultField?: string;
  valueField?: string;
  labelField?: string;
  value?: any;
  onChange?: (value: any) => void;
  [index: string]: any;
}
const defautlParams = {};
const ApiSelect: React.FC<Props> = ({
  api,
  params = defautlParams,
  resultField = "records",
  valueField = "id",
  labelField = "name",
  ...props
}) => {
  const [options, setOptions] = useState<any[]>([]);
  useEffect(() => {
    api(params).then((result) => {
      const options = result[resultField].map((item: Recordable) => {
        return {
          label: item[labelField],
          value: item[valueField],
        };
      });
      setOptions(options);
    });
  }, [params]);
  return <Select {...props} options={options} />;
};

export default ApiSelect;
