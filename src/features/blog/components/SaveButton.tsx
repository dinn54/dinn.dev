"use client";

import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";

interface SaveButtonProps {
  postTitle: string;
}

export function SaveButton({ postTitle }: SaveButtonProps) {
  const handleDownloadHtml = async () => {
    const contentElement = document.getElementById("post-content");
    const headerElement = document.getElementById("post-header");
    const footerElement = document.getElementById("post-footer");

    if (!contentElement || !headerElement || !footerElement) {
      alert("콘텐츠를 찾을 수 없습니다.");
      return;
    }

    // Extract CSS rules
    let cssText = "";
    const styleSheets = Array.from(document.styleSheets);
    const hasTweet =
      contentElement.querySelector(".react-tweet-theme") !== null ||
      contentElement.querySelector("[data-lexical-tweet-id]") !== null;

    if (hasTweet) {
      const cssPromises = styleSheets.map(async (sheet) => {
        try {
          if (
            sheet.href &&
            (sheet.href.startsWith(window.location.origin) ||
              sheet.href.startsWith("/"))
          ) {
            const response = await fetch(sheet.href);
            if (response.ok) return await response.text();
          } else if (!sheet.href) {
            let inlineCss = "";
            try {
              const rules = Array.from(sheet.cssRules);
              rules.forEach((rule) => {
                inlineCss += rule.cssText;
              });
            } catch {
              /* Ignore cross-origin rules */
            }
            return inlineCss;
          }
        } catch {
          return "";
        }
        return "";
      });
      const cssChunks = await Promise.all(cssPromises);
      cssText = cssChunks.join("\n");
    } else {
      styleSheets.forEach((sheet) => {
        try {
          if (sheet.href) return;
          const rules = Array.from(sheet.cssRules);
          rules.forEach((rule) => {
            cssText += rule.cssText;
          });
        } catch {
          /* Ignore */
        }
      });
    }

    // Process content HTML
    const contentHtml = contentElement.innerHTML;
    const sanitizedContent = contentHtml.replace(
      /<iframe[^>]*src="https?:\/\/(?:www\.)?(?:youtube\.com|youtube-nocookie\.com)\/embed\/([\w-]+)(?:\?[^"]*)?"[^>]*><\/iframe>/g,
      (_, videoId) => {
        return `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" style="display: block; width: 100%; aspect-ratio: 16 / 9; position: relative; text-decoration: none; border-radius: 8px; overflow: hidden; background: transparent;">
            <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.95; display: block;" alt="Play Video" />
             <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background-color: rgba(0, 0, 0, 0.8); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                <div style="width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 16px solid white; margin-left: 4px;"></div>
             </div>
          </a>
        `;
      }
    );

    // Prepare footer (remove save button and its divider)
    const footerClone = footerElement.cloneNode(true) as HTMLElement;
    const saveButton = footerClone.querySelector("#btn-save");
    const divider = footerClone.querySelector("#btn-save-divider");
    if (saveButton) saveButton.remove();
    if (divider) divider.remove();

    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${postTitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            padding: 40px;
            line-height: 1.6;
            margin: 0;
            background-color: #f9fafb;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        article {
            width: 100%;
            max-width: 800px;
            background: white;
            padding: 40px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border-radius: 8px;
        }
        img { max-width: 100%; height: auto; border-radius: 8px; }
        iframe { width: 100%; aspect-ratio: 16 / 9; border: none; border-radius: 8px; display: none; }
        ${cssText}
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }
    </style>
</head>
<body>
    <article>
      ${headerElement.outerHTML}
      <div class="content">
        ${sanitizedContent}
      </div>
      ${footerClone.outerHTML}
    </article>
    <script>
      document.querySelector('button[id="btn-scroll-top"]')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    </script>
</body>
</html>
    `;

    // Download file
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${postTitle.replace(/\s+/g, "_")}_${new Date().getTime()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      id="btn-save"
      variant="ghost"
      size="sm"
      onClick={handleDownloadHtml}
      className="gap-2 rounded-full text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/20 dark:hover:text-teal-400"
    >
      <Bookmark className="h-4 w-4" />
      <span className="font-medium">저장하기</span>
    </Button>
  );
}
