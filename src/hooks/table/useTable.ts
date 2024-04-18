import { useState } from "react";

export default function useTable() {
  /** 记录id */
  const [id, setId] = useState({});
  /** 是否显示模态框 */
  const [isModalOpen, setIsModalOpen] = useState(false);
  /** 是否加载中 */
  const [loading, setLoading] = useState(false);
  /** 新增 */
  const handleCreate = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  /** 编辑 */
  const handleEidt = (isOpen: boolean, id: number | string) => {
    setId(id);
    setIsModalOpen(isOpen);
  };
  return {
    id,
    isModalOpen,
    setIsModalOpen,
    handleEidt,
    handleCreate,
    setLoading,
    loading,
  };
}
