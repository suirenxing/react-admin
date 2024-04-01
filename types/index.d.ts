type WithChildren<T = Record> = T & {
  /** 插槽组件 */
  children?: React.ReactNode;
};

type Recordable = Record<string, any>;

type AnyFunction<T> = (...args: any[]) => T;
