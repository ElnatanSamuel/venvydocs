import React from "react";
import CodeBlock from "@/components/CodeBlock";

const CompatibilityPage: React.FC = () => (
  <div className="doc-prose">
    <h1>Compatibility</h1>
    <p>Venvy ships with two builds to support every environment:</p>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="text-left py-2 pr-4 font-semibold">Build</th><th className="text-left py-2 pr-4 font-semibold">Path</th><th className="text-left py-2 font-semibold">Module system</th></tr></thead>
        <tbody>
          <tr className="border-b border-border/30"><td className="py-2 pr-4">CommonJS</td><td className="py-2 pr-4"><code>dist/cjs/</code></td><td className="py-2"><code>require()</code></td></tr>
          <tr className="border-b border-border/30"><td className="py-2 pr-4">ESM</td><td className="py-2 pr-4"><code>dist/esm/</code></td><td className="py-2"><code>import</code></td></tr>
        </tbody>
      </table>
    </div>
    <p>The correct build is chosen <strong>automatically</strong> via the <code>exports</code> field in <code>package.json</code>.</p>

    <h2 id="nodejs-cjs">Node.js (CommonJS)</h2>
    <CodeBlock language="javascript" filename="index.js" code={`const { defineEnv, string, port } = require("venvy");

const env = defineEnv({
  PORT: port().default(3000),
  DB_HOST: string().required(),
});

console.log(env.PORT);`} />

    <h2 id="nodejs-esm">Node.js + TypeScript (ESM)</h2>
    <CodeBlock language="typescript" filename="src/env.ts" code={`import { defineEnv, url, string, enumeration } from "venvy";
import { env as schema } from "../venvy.schema.js";

export const env = defineEnv(schema);`} />
    <p>Make sure your <code>tsconfig.json</code> uses:</p>
    <CodeBlock language="json" filename="tsconfig.json" code={`{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}`} />

    <h2 id="nextjs">Next.js</h2>
    <p>Works out of the box. Create a schema in the project root and call <code>defineEnv</code> in a shared file.</p>
    <CodeBlock language="typescript" filename="lib/env.ts" code={`import { defineEnv } from "venvy";
import { env as schema } from "../venvy.schema.js";

export const env = defineEnv(schema);`} />
    <CodeBlock language="typescript" filename="pages/api/hello.ts" code={`import { env } from "../../lib/env.js";

export default function handler(req, res) {
  res.json({ db: env.DATABASE_URL });
}`} />
    <p>For Next.js, prefix frontend-safe variables with <code>NEXT_PUBLIC_</code> as usual. Venvy validates them all the same.</p>

    <h2 id="vite-react">Vite + React</h2>
    <p>Vite uses <code>import.meta.env</code> instead of <code>process.env</code>. Pass the values manually:</p>
    <CodeBlock language="typescript" filename="src/env.ts" code={`import { defineEnv, url, string } from "venvy";

export const env = defineEnv(
  {
    VITE_API_BASE: url().required().description("Backend API base URL"),
    VITE_APP_NAME: string().default("My App"),
  },
  {
    VITE_API_BASE: import.meta.env.VITE_API_BASE,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  },
);`} />

    <h2 id="react-native">React Native (Expo)</h2>
    <CodeBlock language="typescript" filename="env.ts" code={`import { defineEnv, url, string } from "venvy";
import { API_URL, APP_ENV } from "@env";

export const env = defineEnv(
  {
    API_URL: url().required(),
    APP_ENV: string().default("development"),
  },
  { API_URL, APP_ENV },
);`} />

    <h2 id="cicd">CI/CD</h2>
    <p>Add Venvy to your pipeline to catch bad config before it hits production:</p>
    <CodeBlock language="yaml" filename="GitHub Actions" code={`- name: Validate environment
  run: npx venvy validate --env production
  env:
    DATABASE_URL: \${{ secrets.DATABASE_URL }}
    JWT_SECRET: \${{ secrets.JWT_SECRET }}
    NODE_ENV: production`} />

    <h2 id="requirements">Minimum Requirements</h2>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="text-left py-2 pr-4 font-semibold">Requirement</th><th className="text-left py-2 font-semibold">Version</th></tr></thead>
        <tbody>
          <tr className="border-b border-border/30"><td className="py-2 pr-4">Node.js</td><td className="py-2">18+</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 pr-4">TypeScript (optional)</td><td className="py-2">5.0+</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 pr-4">Zod (optional)</td><td className="py-2">3.x</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default CompatibilityPage;
