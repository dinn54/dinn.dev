"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useMemo } from "react";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

import { ImageNode } from "./lexical/nodes/ImageNode";
import { YouTubeNode } from "./lexical/nodes/YouTubeNode";
import { TweetNode } from "./lexical/nodes/TweetNode";
import CodeHighlightPlugin from "./lexical/plugins/CodeHighlightPlugin";
import MarkdownInitializerPlugin from "./lexical/plugins/MarkdownInitializerPlugin";
import OpenLinksInNewTabPlugin from "./lexical/plugins/OpenLinksInNewTabPlugin";
import { CUSTOM_TRANSFORMERS } from "./lexical/markdownTransformers";
import theme from "./lexical/theme";

interface MarkdownRendererProps {
  markdown: string;
}

const EditorNodes = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  CodeNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  HorizontalRuleNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  ImageNode,
  YouTubeNode,
  TweetNode,
];

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const initialConfig = {
    namespace: "MarkdownViewer",
    theme,
    onError: (error: Error) => console.error(error),
    nodes: EditorNodes,
    editable: false,
  };

  const formattedMarkdown = useMemo(() => {
    if (!markdown) return "";

    const processed = markdown
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n")
      .replace(/\\`/g, "`")
      .replace(/\\\\/g, "\\")
      .replace(/\\t/g, "\t");

    const codeBlockRegex = /```(\w*)(?:[^\n]*)\n([\s\S]*?)```/g;

    const replacements: {
      start: number;
      end: number;
      replacement: string;
    }[] = [];
    let match;

    while ((match = codeBlockRegex.exec(processed)) !== null) {
      const [fullMatch, lang, content] = match;
      const startIndex = match.index;
      const endIndex = startIndex + fullMatch.length;

      const lines = content.split("\n");

      let startIdx = 0;
      let endIdx = lines.length;

      while (startIdx < endIdx && lines[startIdx].trim() === "") {
        startIdx++;
      }
      while (endIdx > startIdx && lines[endIdx - 1].trim() === "") {
        endIdx--;
      }

      const activeLines = lines.slice(startIdx, endIdx);

      if (activeLines.length === 0) {
        replacements.push({
          start: startIndex,
          end: endIndex,
          replacement: `\`\`\`${lang}\n\`\`\``,
        });
        continue;
      }

      let minIndent = Infinity;
      for (const line of activeLines) {
        const expandedLine = line.replace(/\t/g, "  ");
        const m = expandedLine.match(/^\s*/);
        const indent = m ? m[0].length : 0;
        if (indent < minIndent) minIndent = indent;
      }

      if (minIndent === Infinity) minIndent = 0;

      const dedented = activeLines
        .map((line) => {
          const expandedLine = line.replace(/\t/g, "  ");
          const trimmed =
            expandedLine.length >= minIndent
              ? expandedLine.slice(minIndent)
              : expandedLine;

          return trimmed.replace(/^ +/g, (match) => match.repeat(1));
        })
        .join("\n");

      replacements.push({
        start: startIndex,
        end: endIndex,
        replacement: `\`\`\`${lang}\n${dedented}\n\`\`\``,
      });
    }

    let finalStr = processed;
    for (let i = replacements.length - 1; i >= 0; i--) {
      const { start, end, replacement } = replacements[i];
      finalStr = finalStr.slice(0, start) + replacement + finalStr.slice(end);
    }

    return finalStr;
  }, [markdown]);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="markdown-renderer relative z-0 flex h-full w-full flex-col">
        <div className="relative h-full w-full grow">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="h-full w-full resize-none focus:outline-none" />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <LinkPlugin />
          <TablePlugin />
          <CodeHighlightPlugin />
          <OpenLinksInNewTabPlugin />
          <MarkdownInitializerPlugin
            markdown={formattedMarkdown}
            transformers={CUSTOM_TRANSFORMERS}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}
