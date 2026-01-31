"use client";

import { Tweet } from "react-tweet";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  $isNodeSelection,
  $getSelection,
  ElementFormatType,
  NodeKey,
} from "lexical";
import { useRef, useEffect, useCallback } from "react";
import { $isTweetNode } from "./TweetNode";

export default function TweetComponent({
  tweetID,
  nodeKey,
  width,
}: {
  tweetID: string;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  width: number | "inherit";
}) {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const containerRef = useRef<HTMLDivElement>(null);

  const isEditable = editor.isEditable();

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (!isEditable) return false;
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isTweetNode(node)) {
          node.remove();
        }
      }
      return false;
    },
    [isSelected, nodeKey, isEditable]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event: MouseEvent) => {
          if (!editor.isEditable()) return false;
          if (
            containerRef.current &&
            containerRef.current.contains(event.target as Node)
          ) {
            if (event.shiftKey) {
              setSelected(!isSelected);
            } else {
              clearSelection();
              setSelected(true);
            }
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [clearSelection, editor, isSelected, onDelete, setSelected]);

  const displayWidth = width === "inherit" ? 450 : width;

  return (
    <div
      ref={containerRef}
      className={`relative group ${
        isSelected && isEditable ? "ring-2 ring-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20" : ""
      }`}
      style={{
        width: displayWidth,
        maxWidth: "100%",
      }}
    >
      <Tweet id={tweetID} />
    </div>
  );
}
