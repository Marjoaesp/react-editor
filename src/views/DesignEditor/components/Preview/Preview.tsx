import React from "react";
import useEditorType from "~/hooks/useEditorType";
import Video from "./Video";
import Presentation from "./Presentation";
import Graphic from "./Graphic";

interface ComponentProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export default function ({ isOpen, setIsOpen }: ComponentProps) {
  const editorType = useEditorType();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>
      <div className="relative w-full h-full bg-white overflow-hidden rounded-none">
        <div className="absolute flex h-full w-full">
          {{
            GRAPHIC: <Graphic />,
            PRESENTATION: <Presentation />,
            VIDEO: <Video />,
            NONE: <></>,
          }[editorType]}
        </div>
        <button
          className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
