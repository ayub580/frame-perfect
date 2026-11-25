import { proxyRawg } from "../../lib/proxy.js";

export function onRequest(context) {
  return proxyRawg(context, {
    edgeTtl: 604800, // 7 days
    clientTtl: 3600, // 1 hour
  });
}
