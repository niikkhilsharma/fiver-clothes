import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // nikhil - remove the line later
      "@typescript-eslint/no-unused-vars": [
        "warn", // Can also use "off" or "error" as needed
        {
          vars: "all", // Check all variables
          args: "after-used", // Ignore unused arguments before the last used
          ignoreRestSiblings: true, // Ignore unused destructured siblings
        },
      ],
    },
  },
];

export default eslintConfig;
