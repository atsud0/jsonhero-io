import { createEventHandler } from "@remix-run/cloudflare-workers";

import * as build from "../build";

function getSessionSecret() {
  const sessionSecret = globalThis.SESSION_SECRET;

  if (typeof sessionSecret !== "string" || sessionSecret.length === 0) {
    throw new Error("SESSION_SECRET binding is missing");
  }

  return sessionSecret;
}

addEventListener(
  "fetch",
  createEventHandler({
    build,
    getLoadContext(event) {
      return {
        SESSION_SECRET: getSessionSecret(),
        waitUntil(promise) {
          return event.waitUntil(promise);
        },
      };
    },
  })
);
