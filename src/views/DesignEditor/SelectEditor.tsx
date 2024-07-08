import React from "react";
import { DesignType } from "~/interfaces/DesignEditor";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import Images from "~/components/Icons/Images";

export default function () {
  const [selectedEditor, setSelectedEditor] = React.useState<DesignType>("GRAPHIC");
  const { setEditorType } = useDesignEditorContext();

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex gap-8 justify-center mb-8">
          <div
            onClick={() => setSelectedEditor("GRAPHIC")}
            className={`h-45 w-45 flex items-center justify-center cursor-pointer flex-col gap-2
              ${selectedEditor === "GRAPHIC" ? "bg-black text-white" : "bg-gray-200 text-gray-800"}`}
          >
            <Images size={34} />
            <div>Graphic</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button 
            className="w-45 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setEditorType(selectedEditor)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
