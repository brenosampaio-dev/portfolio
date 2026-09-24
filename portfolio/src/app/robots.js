// Only the non-case v2 hubs are promoted by sitemap; preserved legacy routes
// remain reachable while their eventual archive role is decided.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://brenosampaio.vercel.app/sitemap.xml",
    host: "https://brenosampaio.vercel.app",
  };
}
