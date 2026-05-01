"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "./lexical/Editor";
import { LexicalEditor, $getRoot } from "lexical";
import { $isHeadingNode } from "@lexical/rich-text";

interface PostEditorViewerProps {
  markdownContent: string;
}

export function PostEditorViewer({ markdownContent }: PostEditorViewerProps) {
  const [editor, setEditor] = useState<LexicalEditor | null>(null);
  const [toc, setToc] = useState<
    { key: string; text: string; level: number }[]
  >([]);

  useEffect(() => {
    if (!editor) return;

    // Function to extract headings from the editor state
    const updateToc = () => {
      editor.getEditorState().read(() => {
        const root = $getRoot();
        const children = root.getChildren();
        const headings: { key: string; text: string; level: number }[] = [];

        for (const node of children) {
          if ($isHeadingNode(node)) {
            const tag = node.getTag();
            const level = parseInt(tag.replace("h", ""), 10);
            if (level === 2 || level === 3) {
              headings.push({
                key: node.getKey(),
                text: node.getTextContent(),
                level: level,
              });
            }
          }
        }

        // Only update state if headings have changed to avoid infinite loops
        setToc((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(headings)) return prev;
          return headings;
        });
      });
    };

    // Initial check
    updateToc();

    // Listen for updates (important because markdown transformation might happen after init)
    return editor.registerUpdateListener(() => {
      updateToc();
    });
  }, [editor]);

  const handleTocClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    if (editor) {
      editor.getEditorState().read(() => {
        const element = editor.getElementByKey(key);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  };

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-sm prose-slate dark:prose-invert max-w-full border-slate-100 dark:border-slate-800">
        <Editor markdown={markdownContent} readOnly={true} onInit={setEditor} />
      </div>

      {/* 
           Table of Contents (Aside)
           Positioned absolutely relative to the center.
           Check parent container relative positioning in PostDetail.
        */}
      <aside className="absolute top-16 left-[calc(50%+440px)] hidden h-full xl:block">
        <div className="sticky top-32 w-64">
          <div className="border-l border-slate-200 pl-4 dark:border-slate-800">
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              목차
            </h3>
            <nav className="flex flex-col space-y-3 text-sm">
              {toc.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  onClick={(e) => handleTocClick(e, item.key)}
                  className={`block cursor-pointer truncate transition-colors duration-300 ease-in-out ${
                    item.level === 3
                      ? "pl-3 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      : "font-medium text-slate-900 hover:text-teal-600 dark:text-white dark:hover:text-teal-400"
                  } `}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
