// Sitemap — the five real, indexable routes. Cases change rarely; the landing
// and about a little more often. Domain mirrors metadataBase in layout.jsx.
export default function sitemap() {
  const base = "https://brenosampaio.vercel.app";
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/access-restored`, lastModified, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/work/missing-reservation`, lastModified, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/work/connectivity-broke`, lastModified, changeFrequency: "yearly", priority: 0.9 },
  ];
}
