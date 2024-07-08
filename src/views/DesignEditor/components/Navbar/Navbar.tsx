import React, { useRef, useCallback } from "react";
import Logo from "~/components/Icons/Logo";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import Play from "~/components/Icons/Play";
import { Block } from "baseui/block"; // Remove if not needed
import { useEditor } from "@layerhub-io/react";
import useEditorType from "~/hooks/useEditorType";
import { IScene } from "@layerhub-io/types";
import { loadTemplateFonts } from "~/utils/fonts";
import { loadVideoEditorAssets } from "~/utils/video";
import DesignTitle from "./DesignTitle";
import { IDesign } from "~/interfaces/DesignEditor";

// Define TemplateData type
interface TemplateData {
  scenes: IScene[];
  design: IDesign;
}

export default function CustomizeHeader() {
  const { setDisplayPreview, setScenes, setCurrentDesign, currentDesign, scenes } = useDesignEditorContext();
  const editorType = useEditorType();
  const editor = useEditor();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const parseGraphicJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: "GRAPHIC",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(graphicTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const makeDownload = (data: object) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "template.json";
    a.click();
  };

  const makeDownloadTemplate = async () => {
    if (editor && editorType === "GRAPHIC") {
      parseGraphicJSON();
    }
  };

  const loadGraphicTemplate = async (payload: IDesign): Promise<TemplateData> => {
    const loadedScenes: IScene[] = [];

    for (const scn of payload.scenes) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);
      await loadTemplateFonts(loadedScene);

      const preview = await editor.renderer.render(loadedScene) as string;
      loadedScenes.push({ ...loadedScene, preview });
    }

    return { scenes: loadedScenes, design: payload };
  };

  const handleImportTemplate = useCallback(
    async (data: any) => {
      if (data.type === "GRAPHIC") {
        const templateData = await loadGraphicTemplate(data);
        setScenes(templateData.scenes);
        setCurrentDesign(templateData.design);
      }
    },
    [editor, setScenes, setCurrentDesign]
  );

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (res) => {
        const result = res.target?.result as string;
        const design = JSON.parse(result);
        handleImportTemplate(design);
      };
      reader.onerror = (err) => {
        console.log(err);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className="h-16 bg-black grid grid-cols-3 items-center px-5">
      <DesignTitle />
      <Block className="flex items-center gap-2 justify-end">
        <input
          multiple={false}
          onChange={handleFileInput}
          type="file"
          id="file"
          ref={inputFileRef}
          className="hidden"
        />

        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
          onClick={makeDownloadTemplate}
        >
          Export
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
          onClick={() => setDisplayPreview(true)}
        >
          <Play size={24} />
        </button>
      </Block>
    </div>
  );
}
