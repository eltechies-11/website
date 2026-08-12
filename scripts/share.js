#!/usr/bin/env node
/**
 * Temporary public share (not a permanent hosted domain).
 *
 * Prefers localtunnel with a fixed subdomain so the URL stays the same
 * across restarts: https://eltechies-share.loca.lt
 *
 * If localtunnel’s free relay is down, falls back to a Cloudflare quick
 * tunnel and keeps that process alive so the URL does not change until
 * you stop this script.
 *
 * Usage:
 *   npm run dev          # terminal 1
 *   npm run share        # terminal 2
 */

const { spawn } = require("child_process");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const SUBDOMAIN = process.env.SHARE_SUBDOMAIN || "eltechies-share";
const LT_HOST = process.env.SHARE_HOST || "https://loca.lt";
const URL_FILE = path.join(__dirname, "..", ".share-url");

function saveUrl(url) {
  fs.writeFileSync(URL_FILE, `${url}\n`, "utf8");
}

function printUrl(url, note) {
  console.log("\n========================================");
  console.log("Share this URL:");
  console.log(url);
  console.log("========================================");
  if (note) console.log(note);
  console.log("Keep this process running while sharing.\n");
}

function checkLocal() {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${PORT}/`, (res) => {
      res.resume();
      resolve(Boolean(res.statusCode && res.statusCode < 500));
    });
    req.on("error", () => resolve(false));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function probeUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      { headers: { "bypass-tunnel-reminder": "1" }, timeout: 8000 },
      (res) => {
        res.resume();
        resolve(Boolean(res.statusCode && res.statusCode < 500));
      },
    );
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function startLocaltunnel() {
  let localtunnel;
  try {
    localtunnel = require("localtunnel");
  } catch {
    throw new Error("localtunnel package is not installed");
  }

  console.log(`Trying localtunnel (${SUBDOMAIN}.${LT_HOST.replace(/^https?:\/\//, "")})…`);

  const tunnel = await localtunnel({
    port: PORT,
    subdomain: SUBDOMAIN,
    host: LT_HOST,
  });

  const url = tunnel.url;
  if (!url.includes(SUBDOMAIN)) {
    tunnel.close();
    throw new Error(
      `Requested subdomain "${SUBDOMAIN}" was unavailable (got ${url})`,
    );
  }

  const ok = await probeUrl(url);
  if (!ok) {
    tunnel.close();
    throw new Error(`localtunnel URL is not reachable (${url})`);
  }

  saveUrl(url);
  printUrl(
    url,
    "First visit may show a localtunnel password page — click Continue.",
  );

  tunnel.on("close", () => {
    console.error("\nTunnel closed.");
    process.exit(1);
  });
  tunnel.on("error", (err) => {
    console.error("\nTunnel error:", err.message || err);
    process.exit(1);
  });

  const shutdown = () => {
    tunnel.close();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  // Keep event loop alive
  return new Promise(() => {});
}

function startCloudflare() {
  return new Promise((resolve, reject) => {
    console.log(
      "Falling back to Cloudflare quick tunnel (URL stays fixed until you stop this process)…\n",
    );

    const child = spawn(
      "cloudflared",
      ["tunnel", "--url", `http://localhost:${PORT}`, "--protocol", "http2"],
      { stdio: ["ignore", "pipe", "pipe"] },
    );

    let captured = false;

    const handle = (buf) => {
      const text = buf.toString();
      process.stdout.write(text);
      const match = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
      if (match && !captured) {
        captured = true;
        saveUrl(match[0]);
        printUrl(
          match[0],
          "This is still temporary — not a permanent domain. Do not stop this process if you need the same URL.",
        );
      }
    };

    child.stdout.on("data", handle);
    child.stderr.on("data", handle);

    child.on("error", reject);
    child.on("exit", (code) => {
      console.error(`\nTunnel stopped (code ${code ?? "unknown"}).`);
      process.exit(code || 1);
    });

    process.on("SIGINT", () => child.kill("SIGINT"));
    process.on("SIGTERM", () => child.kill("SIGTERM"));
  });
}

async function main() {
  const up = await checkLocal();
  if (!up) {
    console.error(`Site is not running on http://localhost:${PORT}`);
    console.error("Start it first with: npm run dev");
    process.exit(1);
  }

  try {
    await startLocaltunnel();
  } catch (err) {
    console.warn(`\nlocaltunnel unavailable: ${err.message || err}\n`);
    await startCloudflare();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
