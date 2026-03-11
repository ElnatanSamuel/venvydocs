import React from "react";
import CodeBlock from "@/components/CodeBlock";

const RuntimePage: React.FC = () => (
  <div className="doc-prose">
    <h1>Runtime Protection</h1>
    <p>Venvy can protect your app at startup by validating the environment before any code runs. If validation fails, the process exits immediately with a clear error</p>

    <h2 id="define-env">defineEnv(schema)</h2>
    <p>The standard way to validate and access your environment. Returns a <strong>fully typed</strong> object based on your schema.</p>
    <CodeBlock language="typescript" filename="src/env.ts" code={`import { defineEnv } from "venvy";
import { env as schema } from "./venvy.schema.js";

export const env = defineEnv(schema);`} />

    <h3>What happens when it fails</h3>
    <CodeBlock language="bash" filename="output" code={`Venvy Validation Failed:
  - JWT_SECRET: Variable is required (received: undefined)
  - PORT: Port must be between 1 and 65535 (received: 99999)`} />
    <p>Then <code>process.exit(1)</code> is called. Your app never starts.</p>

    <h3>Type Inference</h3>
    <p>The return type is fully inferred from your schema — no manual types needed.</p>
    <CodeBlock language="typescript" filename="example" code={`const env = defineEnv({
  PORT: port().default(3000),        // → number
  DB_URL: url().required(),          // → string
  NODE_ENV: enumeration(["dev", "prod"]).required(), // → "dev" | "prod"
});

env.PORT;     // TypeScript knows: number
env.DB_URL;   // TypeScript knows: string
env.NODE_ENV; // TypeScript knows: "dev" | "prod"`} />

    <h2 id="recommended-pattern">Recommended Pattern</h2>
    <p>Keep your schema and env export in one place and import it everywhere:</p>
    <CodeBlock language="typescript" filename="src/env.ts" code={`import { defineEnv } from "venvy";
import { env as schema } from "../venvy.schema.js";

export const env = defineEnv(schema);`} />
    <CodeBlock language="typescript" filename="src/server.ts" code={`import { env } from "./env.js";

app.listen(env.PORT, () => {
  console.log(\`Listening on \${env.PORT}\`);
});`} />
    <CodeBlock language="typescript" filename="src/db.ts" code={`import { env } from "./env.js";

const client = new PostgresClient({ url: env.DATABASE_URL });`} />
    <p>This way <code>defineEnv</code> only runs once at boot, and every file gets the same validated, typed object.</p>

    <h2 id="guard">guard(schema)</h2>
    <p>A lower-level alternative to <code>defineEnv</code>. Throws an error instead of exiting the process, giving you control over the error handling.</p>
    <CodeBlock language="typescript" filename="example" code={`import { guard } from "venvy";
import { env as schema } from "./venvy.schema.js";

try {
  const env = guard(schema);
  startServer(env);
} catch (err) {
  console.error("Config error:", err.message);
  process.exit(1);
}`} />
    <p>Use <code>guard</code> when you need custom error logging (e.g. sending to Sentry before crashing).</p>
  </div>
);

export default RuntimePage;
