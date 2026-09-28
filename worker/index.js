/**
 * Cloudflare Worker for Dream Cart BD
 * - Serves static assets via Workers Static Assets (env.ASSETS)
 * - Proxies /api/* requests to Google Apps Script Web App
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API Request Proxying
    if (url.pathname.startsWith("/api/")) {
      const backendUrl = env.GOOGLE_APPS_SCRIPT_URL;
      if (!backendUrl) {
        return new Response(JSON.stringify({
          success: false,
          message: "GOOGLE_APPS_SCRIPT_URL secret not configured in Cloudflare environment",
          error: "BACKEND_UNCONFIGURED"
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Append action or forward query parameters
      const targetUrl = new URL(backendUrl);
      url.searchParams.forEach((val, key) => {
        targetUrl.searchParams.set(key, val);
      });

      // Forward request to Apps Script
      const init = {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-Secret": env.GOOGLE_API_SECRET || ""
        }
      };

      if (request.method === "POST" || request.method === "PUT") {
        init.body = await request.text();
      }

      return fetch(targetUrl.toString(), init);
    }

    // Static Assets Serving
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Dream Cart BD System Online", { status: 200 });
  }
};
