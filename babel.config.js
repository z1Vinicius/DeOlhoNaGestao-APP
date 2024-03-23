module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "nativewind/babel",
      "react-native-paper/babel",
      ["babel-plugin-inline-import", { "extensions": [".svg"] }],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["module-resolver",
        {
          root: ".",
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          alias: {
            "@components": "./src/components",
          },
        }
      ],
      "react-native-reanimated/plugin",
    ],
  };
};