import { proxyRawg } from "../../lib/proxy.js";

export function onRequest(context) {
  return proxyRawg(context, {
    edgeTtl: 1800, // 30 minutes
    clientTtl: 300, // 5 minutes
  });
}
