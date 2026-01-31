import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ImageNode } from "./nodes/ImageNode";
import { YouTubeNode } from "./nodes/YouTubeNode";
import { CUSTOM_TRANSFORMERS } from "./markdownTransformers";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor } from "lexical";
import React, { useEffect } from "react";

import theme from "./theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import MarkdownInitializerPlugin from "./plugins/MarkdownInitializerPlugin";
import { cn } from "@/shared/ui/utils";

function Placeholder() {
  return (
    <div className="absolute top-[1.125rem] left-[1.125rem] text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap select-none pointer-events-none">
      Enter some rich text...
    </div>
  );
}

const editorConfig = {
  namespace: "MyEditor",
  theme,
  onError(error: Error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
    ImageNode,
    YouTubeNode,
  ],
};

interface EditorProps {
    readOnly?: boolean;
    initialEditorState?: string | null;
    markdown?: string;
    onInit?: (editor: LexicalEditor) => void;
}

function EditorInitPlugin({ onInit }: { onInit: (editor: LexicalEditor) => void }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    onInit(editor);
  }, [editor, onInit]);
  return null;
}

export function Editor({ readOnly = false, initialEditorState, markdown, onInit }: EditorProps) {
  return (
    <LexicalComposer initialConfig={{ ...editorConfig, editorState: initialEditorState, editable: !readOnly }}>
      <div className={cn(
        "relative flex flex-col w-full",
        !readOnly && "rounded-lg border bg-background shadow-sm"
      )}>
        {!readOnly && <ToolbarPlugin />}
        <div className={cn(
          "relative",
          !readOnly ? "p-4 min-h-[500px]" : ""
        )}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className={cn(
                "outline-none",
                !readOnly ? "min-h-[500px] px-4 py-2" : "py-2"
              )} />
            }
            placeholder={!readOnly ? <Placeholder /> : null}
            ErrorBoundary={({ children }) => <div>{children}</div>}
          />
          <HistoryPlugin />
          {!readOnly && <AutoFocusPlugin />}
          <ListPlugin />
          <LinkPlugin />
          <CodeHighlightPlugin />
          <MarkdownShortcutPlugin transformers={CUSTOM_TRANSFORMERS} />
          {markdown && <MarkdownInitializerPlugin markdown={markdown} transformers={CUSTOM_TRANSFORMERS} />}
          {onInit && <EditorInitPlugin onInit={onInit} />}
        </div>
      </div>
    </LexicalComposer>
  );
}
