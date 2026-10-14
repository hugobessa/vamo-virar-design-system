import type { StorybookConfig } from "@storybook/react-native-web-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

// The React Native kit renders in the browser through react-native-web; the
// web kit (src/web) is plain React DOM styled with Tailwind.
const config: StorybookConfig = {
  framework: { name: "@storybook/react-native-web-vite", options: {} },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  viteFinal: (config) => mergeConfig(config, { plugins: [tailwindcss()] }),
};

export default config;
