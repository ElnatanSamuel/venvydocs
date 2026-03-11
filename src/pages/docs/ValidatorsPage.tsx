import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ValidatorsPage: React.FC = () => (
  <div className="doc-prose">
    <h1>Validators</h1>
    <p>All validators are factory functions imported from <code>venvy</code>. Every validator supports the base methods listed at the bottom.</p>

    <h2 id="string">string()</h2>
    <p>Validates any string value.</p>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="text-left py-2 pr-4 font-semibold">Method</th><th className="text-left py-2 font-semibold">Description</th></tr></thead>
        <tbody>
          <tr className="border-b border-border/30"><td className="py-2 pr-4"><code>.minLength(n)</code></td><td className="py-2">Fails if the string is shorter than n characters</td></tr>
          <tr className="border-b border-border/30"><td className="py-2 pr-4"><code>.regex(pattern)</code></td><td className="py-2">Fails if the string doesn't match the given RegExp</td></tr>
        </tbody>
      </table>
    </div>
    <CodeBlock language="typescript" filename="example" code={`import { string } from "venvy";

JWT_SECRET: string().required().minLength(32),
API_KEY: string().required().regex(/^sk_/),`} />

    <h2 id="number">number()</h2>
    <p>Parses a string from the environment into a JavaScript <code>number</code>. Returns <code>0</code> if optional and missing.</p>
    <CodeBlock language="typescript" filename="example" code={`import { number } from "venvy";

TIMEOUT_MS: number().default(5000),`} />

    <h2 id="boolean">boolean()</h2>
    <p>Accepts <code>"true"</code> or <code>"1"</code> as truthy, <code>"false"</code> or <code>"0"</code> as falsy.</p>
    <CodeBlock language="typescript" filename="example" code={`import { boolean } from "venvy";

ENABLE_LOGGING: boolean().default(true),`} />

    <h2 id="enumeration">enumeration(options[])</h2>
    <p>Ensures the value is one of the provided strings. The type is automatically inferred as a union.</p>
    <CodeBlock language="typescript" filename="example" code={`import { enumeration } from "venvy";

NODE_ENV: enumeration(["development", "production", "test"]).required(),
// TypeScript type: "development" | "production" | "test"`} />

    <h2 id="url">url()</h2>
    <p>Parses the value with the native <code>URL</code> constructor. Fails if the string is not a valid URL.</p>
    <CodeBlock language="typescript" filename="example" code={`import { url } from "venvy";

DATABASE_URL: url().required(),
// Valid:   "https://db.example.com"
// Invalid: "db.example.com"  →  Error: Invalid URL`} />

    <h2 id="email">email()</h2>
    <p>Validates the value against a standard email format.</p>
    <CodeBlock language="typescript" filename="example" code={`import { email } from "venvy";

SUPPORT_EMAIL: email().required(),`} />

    <h2 id="ip">ip()</h2>
    <p>Validates an IPv4 address.</p>
    <CodeBlock language="typescript" filename="example" code={`import { ip } from "venvy";

SERVER_IP: ip().required(),`} />

    <h2 id="port">port()</h2>
    <p>Validates that the value is a number between <code>1</code> and <code>65535</code>.</p>
    <CodeBlock language="typescript" filename="example" code={`import { port } from "venvy";

PORT: port().default(3000),`} />

    <h2 id="base-methods">Base Methods</h2>
    <p>These methods are available on <strong>every</strong> validator.</p>
    <h3>.required()</h3>
    <p>Marks the variable as mandatory. Validation fails if it is absent and has no default.</p>
    <h3>.default(value)</h3>
    <p>Provides a fallback value when the variable is absent from the environment.</p>
    <h3>.description(text)</h3>
    <p>Human-readable description. Used by <code>venvy docs</code> to generate the README table.</p>
    <h3>.requiredIf(condition)</h3>
    <p>Makes the variable required only when the condition returns <code>true</code>.</p>
    <CodeBlock language="typescript" filename="example" code={`// Only required when NODE_ENV is "production"
ADMIN_EMAIL: email().requiredIf(v => v.NODE_ENV === "production"),`} />
  </div>
);

export default ValidatorsPage;
