import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ZodIntegrationPage: React.FC = () => (
  <div className="doc-prose">
    <h1>Zod Integration</h1>
    <p>If your project already uses Zod, you don't need to rewrite your schemas. Venvy can bridge them.</p>

    <h2 id="when-to-use">When to Use This</h2>
    <ul>
      <li>You have an existing Zod schema for your API or database models</li>
      <li>You want Venvy's CLI tools (<code>diff</code>, <code>docs</code>, <code>hook</code>, <code>generate</code>) without rewriting anything</li>
      <li>You want to avoid maintaining two separate schemas for the same variables</li>
    </ul>

    <h2 id="setup">Setup</h2>
    <p>Install Zod as a peer dependency:</p>
    <CodeBlock language="bash" filename="terminal" code="npm install zod" />

    <h2 id="usage">Usage</h2>
    <CodeBlock language="typescript" filename="venvy.schema.ts" code={`import { z } from "zod";
import { fromZod } from "venvy";

const zodSchema = z.object({
  PORT: z.number().default(3000).describe("App server port"),
  DATABASE_URL: z.string().url().describe("PostgreSQL connection string"),
  NODE_ENV: z.enum(["development", "production", "test"]),
  IS_DEBUG: z.boolean().default(false),
});

export const env = fromZod(zodSchema);`} />
    <p>Now all Venvy CLI commands will use this schema:</p>
    <CodeBlock language="bash" filename="terminal" code={`npx venvy validate      # validates against the Zod schema
npx venvy docs          # injects a table into README.md
npx venvy diff dev prod # compares environments`} />

    <h2 id="conversion-table">What fromZod Converts</h2>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="text-left py-2 pr-4 font-semibold">Zod type</th><th className="text-left py-2 font-semibold">Venvy validator</th></tr></thead>
        <tbody>
          <tr className="border-b border-border/30"><td className="py-2 pr-4"><code>z.string()</code></td><td className="py-2"><code>string()</code></td></tr>
          <tr className="border-b border-border/30"><td className="py-2 pr-4"><code>z.number()</code></td><td className="py-2"><code>number()</code></td></tr>
          <tr className="border-b border-border/30"><td className="py-2 pr-4"><code>z.boolean()</code></td><td className="py-2"><code>boolean()</code></td></tr>
          <tr className="border-b border-border/30"><td className="py-2 pr-4"><code>z.string().url()</code></td><td className="py-2"><code>url()</code></td></tr>
          <tr className="border-b border-border/30"><td className="py-2 pr-4"><code>z.enum([...])</code></td><td className="py-2"><code>enumeration([...])</code></td></tr>
        </tbody>
      </table>
    </div>
    <p><code>.describe("...")</code> on a Zod field maps to <code>.description("...")</code> in Venvy, which is used by <code>venvy docs</code>.</p>

    <h2 id="combining">Combining Zod and Venvy DSL</h2>
    <CodeBlock language="typescript" filename="venvy.schema.ts" code={`import { z } from "zod";
import { fromZod, string, port } from "venvy";

const zodPart = fromZod(
  z.object({
    DATABASE_URL: z.string().url().describe("DB connection"),
  }),
);

export const env = {
  ...zodPart,
  PORT: port().default(3000),
  JWT_SECRET: string().required().minLength(32),
};`} />

    <h2 id="limitations">Limitations</h2>
    <ul>
      <li><code>fromZod</code> is a bridge for common types. Complex Zod refinements (<code>.refine()</code>, <code>.transform()</code>, <code>.superRefine()</code>) are not supported.</li>
      <li>Zod is a <strong>peer dependency</strong> — you manage the version. Any Zod v3 version is compatible.</li>
    </ul>
  </div>
);

export default ZodIntegrationPage;
