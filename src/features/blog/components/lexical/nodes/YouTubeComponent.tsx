import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,

  COMMAND_PRIORITY_LOW,
  KEY_DELETE_COMMAND,
  KEY_BACKSPACE_COMMAND,
  NodeKey,
} from 'lexical';

export default function YouTubeComponent({
  nodeKey,
  videoID,
}: {
  nodeKey: NodeKey;
  videoID: string;
}): React.ReactElement {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);

  const onDelete = React.useCallback((payload: KeyboardEvent) => {
    if (isSelected && $isNodeSelection($getSelection())) {
      const event: KeyboardEvent = payload;
      event.preventDefault();
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
      return true;
    }
    return false;
  }, [isSelected, nodeKey]);

  React.useEffect(() => {
    // ... commands
    return mergeRegister(
        // ...
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, onDelete]);
  
  // Selection handling for iframes is tricky.
  // We'll wrap it in a div that handles selection visualization.
  
  return (
    <div 
        className={`youtube-wrapper relative my-4 block rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}
        onClick={() => {
            clearSelection();
            setSelected(true);
        }}
    >
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoID}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="YouTube video player"
        className="w-full aspect-video"
      />
      {/* Overlay to catch clicks for selection? Or just rely on wrapper padding/click? */}
    </div>
  );
}
