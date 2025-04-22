export default function Robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/board/",
    },
    sitemap: "https://board.uwit.rs/sitemap.xml",
  };
}
