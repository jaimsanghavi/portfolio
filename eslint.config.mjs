import coreWebVitalsConfig from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

const eslintConfig = [
  // Global ignores (docs/ is added; .next/, out/, build/, next-env.d.ts come from the preset)
  {
    ignores: ["docs/**"],
  },
  // core-web-vitals already includes the full next base config
  ...coreWebVitalsConfig,
  // TypeScript-eslint recommended rules + @typescript-eslint/no-unused-vars warn
  ...typescriptConfig,
];

export default eslintConfig;
