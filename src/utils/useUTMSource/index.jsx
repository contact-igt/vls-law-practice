import { useEffect } from "react";

export default function useUTMSource() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);

      let utmData = {
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_term: params.get("utm_term"),
        utm_content: params.get("utm_content"),
      };

      const utmMap = {
        fb: "facebook.com",
        ig: "instagram.com",
        yt: "youtube.com",
        li: "linkedin.com",
        tw: "twitter.com",
        gads: "google.com",
      };

      if (utmData.utm_source) {
        const mappedSource =
          utmMap[utmData.utm_source.toLowerCase()] || utmData.utm_source;
        utmData.utm_source = mappedSource;
      } else {
        const referrer = document.referrer;
        if (referrer) {
          const hostname = new URL(referrer).hostname.replace(/^www\./, "");
          utmData.utm_source = hostname;
        } else {
          utmData.utm_source = "direct";
        }
      }

      if (
        utmData.utm_source === "direct" ||
        utmData.utm_source.includes("localhost") ||
        utmData.utm_source.includes("127.0.0.1")
      ) {
        utmData = {
          utm_source: "direct",
          utm_medium: "none",
          utm_campaign: "none",
          utm_term: "none",
          utm_content: "none",
        };
      } else {
        Object.keys(utmData).forEach((key) => {
          if (utmData[key] == null) utmData[key] = "";
        });
      }

      Object.entries(utmData).forEach(([key, value]) => {
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, value);
        }
      });
    } catch (error) {
      localStorage.setItem("utm_source", "direct");
      localStorage.setItem("utm_medium", "none");
      localStorage.setItem("utm_campaign", "none");
      localStorage.setItem("utm_term", "none");
      localStorage.setItem("utm_content", "none");
    }
  }, []);
}
