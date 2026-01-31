import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";
import { $convertFromMarkdownString, Transformer } from "@lexical/markdown";

export default function MarkdownInitializerPlugin({ markdown, transformers }: { markdown: string; transformers: Array<Transformer> }) {
  const [editor] = useLexicalComposerContext();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    
    editor.update(() => {
      $convertFromMarkdownString(markdown, transformers);
    });
    
    processedRef.current = true;
  }, [editor, markdown, transformers]);

  return null;
}
