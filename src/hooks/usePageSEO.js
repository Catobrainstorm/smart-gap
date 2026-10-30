// src/hooks/usePageSEO.js
// Utility hook for dynamic client-side SEO updates (title, meta description, canonical, and OG tags)

import { useEffect } from "react";

export function usePageSEO({
  title,
  description,
  canonical,
  ogImage = "https://smartanhouse.org/assets/og-preview.png",
} = {}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMeta = (attribute, key, value) => {
      if (!value) return;
      let el = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attribute, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("property", "twitter:description", description);
    }

    if (title) {
      setMeta("property", "og:title", title);
      setMeta("property", "twitter:title", title);
    }

    if (canonical) {
      setMeta("property", "og:url", canonical);
      setMeta("property", "twitter:url", canonical);

      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonical);
    }

    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("property", "twitter:image", ogImage);
    }
  }, [title, description, canonical, ogImage]);
}

export default usePageSEO;

