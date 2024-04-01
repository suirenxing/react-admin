import axios from "axios";
import { defHttp } from "@/utils/request/index";
/**
 * userModel
 */
export interface UserModel {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime: Date;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 用户id
   */
  id: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 角色
   */
  role?: string;
  /**
   * 更新时间
   */
  updateTime: Date;
  /**
   * 用户名
   */
  username: string;
  [property: string]: any;
}

/** 获取用户列表 */
export const getUserList = (params) => {
  return defHttp.get<UserModel[]>({ url: "/basic-api/user/list", params });
};
