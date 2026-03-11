import React from "react";
import CodeBlock from "@/components/CodeBlock";

const GettingStartedPage: React.FC = () => (
  <div className="doc-prose">
    <div className="mb-10 pb-8 border-b">
      
      <h1 className="!text-5xl !font-extrabold !mb-4 !tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>venvy</h1>
      <p className="!text-lg  !text-foreground/90 !mb-2">Your environment variables deserve a schema.<br/>Stop shipping broken configs.</p>
      <p className="!text-sm !text-muted-foreground !mb-2">Venvy is a schema first environment variable validator for Node.js. Define your env shape once, get full TypeScript inference, CLI validation, CI/CD guards, and Zod integration all from one source of truth.</p>
      <div className="flex flex-wrap gap-3">

      </div>
    </div>

    <h2 id="install">1. Install</h2>
    <CodeBlock language="bash" filename="terminal" code="npm install venvy" />

    <h2 id="create-schema">2. Create a Schema</h2>
    <p>Create <code>venvy.schema.ts</code> in your project root. This is the single source of truth for all your environment variables.</p>
    <CodeBlock
      language="typescript"
      filename="venvy.schema.ts"
      code={`import { string, number, boolean, url, email, enumeration, port } from "venvy";

export const env = {
  PORT: port().default(3000).description("Port the server listens on"),
  DATABASE_URL: url().required().description("PostgreSQL connection string"),
  NODE_ENV: enumeration(["development", "production", "test"]).required(),
  ADMIN_EMAIL: email().requiredIf((v) => v.NODE_ENV === "production"),
  JWT_SECRET: string().required().minLength(32),
  FEATURE_FLAGS: boolean().default(false),
};`}
    />
    <p>If you have an existing <code>.env</code> file, just run <code>npx venvy init</code> and Venvy will auto-generate this file for you.</p>

    <h2 id="validate">3. Validate Your Environment</h2>
    <CodeBlock language="bash" filename="terminal" code="npx venvy validate" />
    <p>Venvy will read your <code>.env</code> and check it against the schema. If anything is wrong, you get a clear, coloured error:</p>
    <CodeBlock language="bash" filename="output" code={`Venvy Validation Failed:
  - JWT_SECRET: Variable is required (received: undefined)
  - ADMIN_EMAIL: Invalid email address (received: notanemail)`} />

    <h2 id="protect-app">4. Protect Your App at Startup</h2>
    <p>Call <code>defineEnv</code> at the top of your app entry point so your app never boots with an invalid config.</p>
    <CodeBlock
      language="typescript"
      filename="src/index.ts"
      code={`import { defineEnv } from "venvy";
import { env as schema } from "../venvy.schema.js";

export const env = defineEnv(schema);
// ^ If validation fails, the process exits here with a helpful error message.

console.log(\`Starting on port \${env.PORT}\`);`}
    />

    <h2 id="sync">5. Fill in Missing Variables</h2>
    <CodeBlock language="bash" filename="terminal" code="npx venvy sync" />
    <p>Venvy will ask you for each missing required variable one by one and append them to your <code>.env</code>.</p>
  </div>
);

export default GettingStartedPage;
