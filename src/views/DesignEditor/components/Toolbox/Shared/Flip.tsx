import React from "react";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import FlipHorizontal from "~/components/Icons/FlipHorizontal";
import FlipVertical from "~/components/Icons/FlipVertical";

export default function Toolbar() {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const [state, setState] = React.useState({ flipX: false, flipY: false });

  React.useEffect(() => {
    if (activeObject) {
      setState({
        flipX: activeObject.flipX,
        flipY: activeObject.flipY,
      });
    }
  }, [activeObject]);

  const flipHorizontally = React.useCallback(() => {
    editor.objects.update({ flipX: !state.flipX });
    setState({ ...state, flipX: !state.flipX });
  }, [editor, state]);

  const flipVertically = React.useCallback(() => {
    editor.objects.update({ flipY: !state.flipY });
    setState({ ...state, flipY: !state.flipY });
  }, [editor, state]);

  return (
    <div className="relative">
      <div className="absolute bg-white p-3 w-48">
        <button
          className="flex items-center w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
          onClick={flipHorizontally}
        >
          <FlipHorizontal size={24}  />
          Flip horizontally
        </button>
        <button
          className="flex items-center w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded mt-2"
          onClick={flipVertically}
        >
          <FlipVertical size={24} />
          Flip vertically
        </button>
      </div>
      <div className="relative">
        <button className="text-gray-700 hover:bg-gray-200 p-2 rounded">
          Flip
        </button>
      </div>
    </div>
  );
}
