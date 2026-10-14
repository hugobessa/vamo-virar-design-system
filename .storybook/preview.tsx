import type { Preview } from "@storybook/react-native-web-vite";
import { useEffect } from "react";
import { View } from "react-native";
import { ReducedMotionOverride, SchemeOverride, themes } from "../src/theme";
import { ReducedMotionOverride as WebReducedMotionOverride } from "../src/web/theme";
import "./tailwind.css";

/** Mirrors the toolbar's motion choice onto <html>, for CSS animations that read it. */
function MotionFlag({ on }: { on: boolean }) {
  useEffect(() => {
    document.documentElement.dataset["vvMotion"] = on ? "on" : "off";
    return () => {
      delete document.documentElement.dataset["vvMotion"];
    };
  }, [on]);
  return null;
}

const preview: Preview = {
  globalTypes: {
    scheme: {
      description: "Tema",
      toolbar: {
        title: "Tema",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Claro" },
          { value: "dark", title: "Escuro" },
        ],
        dynamicTitle: true,
      },
    },
    motion: {
      description: "Movimento (simula a preferência de menos movimento do sistema)",
      toolbar: {
        title: "Movimento",
        icon: "play",
        items: [
          { value: "on", title: "Movimento ligado" },
          { value: "off", title: "Menos movimento" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { scheme: "light", motion: "on" },
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    options: { storySort: { order: ["Fundamentos", "Marca", "Componentes", "Web"] } },
  },
  decorators: [
    (Story, ctx) => {
      const scheme = ctx.globals["scheme"] === "dark" ? "dark" : "light";
      const reduced = ctx.globals["motion"] === "off";
      return (
        <SchemeOverride.Provider value={scheme}>
          <ReducedMotionOverride.Provider value={reduced}>
            <WebReducedMotionOverride.Provider value={reduced}>
              <MotionFlag on={!reduced} />
              {/* The web kit reads the scheme from a .light/.dark class and less motion from data-reduced-motion. */}
              <div className={scheme} data-reduced-motion={reduced ? "true" : undefined}>
                <View style={{ minHeight: "100vh" as unknown as number, backgroundColor: ctx.parameters["transparent"] ? "transparent" : themes[scheme].bg }}>
                  <Story />
                </View>
              </div>
            </WebReducedMotionOverride.Provider>
          </ReducedMotionOverride.Provider>
        </SchemeOverride.Provider>
      );
    },
  ],
};

export default preview;
