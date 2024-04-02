import { ConfigEnv, UserConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import UnoCSS from "unocss/vite";
import { createProxy, wrapperEnv } from "./src/utils/envConfig";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [pathResolve("src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      UnoCSS(),
    ],

    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        {
          find: /\#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },

    server: {
      // Listening on all local IPs
      host: true,
      port: viteEnv.VITE_PORT,
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
  };
};
