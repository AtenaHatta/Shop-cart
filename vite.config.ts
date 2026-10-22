import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, loadEnv, type Plugin } from "vite";
import {
  createCheckoutSession,
  type CheckoutItemInput,
} from "./shared/createCheckoutSession.ts";

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function getDevOrigin(req: IncomingMessage) {
  const host = req.headers.host ?? "localhost:5173";
  return `http://${host}`;
}

function stripeCheckoutDevPlugin(secretKey: string): Plugin {
  return {
    name: "stripe-checkout-dev-api",
    configureServer(server) {
      server.middlewares.use(
        async (
          req: IncomingMessage,
          res: ServerResponse,
          next: (err?: unknown) => void,
        ) => {
          if (req.url !== "/api/create-checkout-session") {
            next();
            return;
          }

          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Allow", "POST");
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }

          try {
            const body = (await readJsonBody(req)) as {
              items?: CheckoutItemInput[];
            };
            const { url } = await createCheckoutSession(
              secretKey,
              body.items ?? [],
              getDevOrigin(req),
            );
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ url }));
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "Checkout failed";
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: message }));
          }
        },
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), stripeCheckoutDevPlugin(env.STRIPE_SECRET_KEY ?? "")],
    test: {
      environment: "node",
      include: ["src/**/*.test.ts"],
    },
  };
});
