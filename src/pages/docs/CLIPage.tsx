import React from "react";
import CodeBlock from "@/components/CodeBlock";

const CLIPage: React.FC = () => (
  <div className="doc-prose">
    <h1>CLI Reference</h1>
    <p>All commands are available via <code>npx venvy</code> or the <code>venvy</code> binary if installed globally. Every command reads your schema from <code>venvy.schema.ts</code> or <code>venvy.schema.js</code> in the current working directory.</p>

    <h2 id="init">venvy init</h2>
    <p>Scans your <code>.env</code> file and generates a <code>venvy.schema.ts</code> with inferred types. Ideal for adding Venvy to an existing project in seconds.</p>
    <CodeBlock language="bash" filename="terminal" code="npx venvy init" />
    <p>Reads <code>.env</code>, infers types (numbers, booleans, URLs, strings), and writes a ready-to-use schema.</p>

    <h2 id="validate">venvy validate</h2>
    <p>Validates the current environment against the schema. Exits with code <code>1</code> if validation fails.</p>
    <CodeBlock language="bash" filename="terminal" code={`npx venvy validate
npx venvy validate --env production   # reads .env.production`} />
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="text-left py-2 pr-4 font-semibold">Flag</th><th className="text-left py-2 font-semibold">Description</th></tr></thead>
        <tbody>
          <tr className="border-b border-border/30"><td className="py-2 pr-4"><code>--env &lt;name&gt;</code></td><td className="py-2">Load a named env file (e.g. production → .env.production)</td></tr>
        </tbody>
      </table>
    </div>
    <p>Add to your CI/CD pipeline:</p>
    <CodeBlock language="yaml" filename="ci.yml" code={`- run: npx venvy validate --env production`} />

    <h2 id="sync">venvy sync</h2>
    <p>Interactively fills in any missing required variables and writes them to your <code>.env</code>.</p>
    <CodeBlock language="bash" filename="terminal" code="npx venvy sync" />
    <p>Compares your schema against your current <code>.env</code>, prompts for each missing variable, validates input in real-time, and appends new values.</p>

    <h2 id="diff">venvy diff</h2>
    <p>Compares two environment files and shows what's missing or different between them.</p>
    <CodeBlock language="bash" filename="terminal" code={`npx venvy diff development production
# Compares .env.development against .env.production`} />
    <CodeBlock language="bash" filename="output" code={`Variable         development     production
DB_HOST          localhost       db.prod.example.com
FEATURE_FLAGS    true            MISSING`} />

    <h2 id="generate">venvy generate</h2>
    <p>Generates a <code>.env.example</code> file from the schema. Variables with <code>.default()</code> are shown with their default values; required ones are shown blank.</p>
    <CodeBlock language="bash" filename="terminal" code="npx venvy generate" />
    <CodeBlock language="bash" filename=".env.example" code={`PORT=3000
DATABASE_URL=
NODE_ENV=
JWT_SECRET=`} />
    <p>Commit this file to your repo so new devs know what they need.</p>

    <h2 id="docs">venvy docs</h2>
    <p>Injects a Markdown table of all environment variables directly into your <code>README.md</code>. Add markers to your README first:</p>
    <CodeBlock language="markdown" filename="README.md" code={`<!-- venvy:start -->
<!-- venvy:end -->`} />
    <p>Then run:</p>
    <CodeBlock language="bash" filename="terminal" code="npx venvy docs" />

    <h2 id="hook">venvy hook</h2>
    <p>Installs a Git <code>pre-commit</code> hook that runs <code>venvy validate</code> before every commit. Prevents bad config from ever being committed.</p>
    <CodeBlock language="bash" filename="terminal" code="npx venvy hook" />
    <p>Writes to <code>.git/hooks/pre-commit</code>. Safe to run multiple times.</p>
  </div>
);

export default CLIPage;
