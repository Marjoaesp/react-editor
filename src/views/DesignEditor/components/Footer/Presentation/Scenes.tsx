import React, { useContext, useEffect, useCallback, useState } from "react";
import Icons from "~/components/Icons";
import Add from "~/components/Icons/Add";
import { DesignEditorContext } from "~/contexts/DesignEditor";
import { nanoid } from "nanoid";
import { getDefaultTemplate } from "~/constants/design-editor";
import { useEditor } from "@layerhub-io/react";
import { IScene } from "@layerhub-io/types";

const MyComponent: React.FC = () => {
  const { scenes, setScenes, setCurrentScene, currentScene, setCurrentDesign, currentDesign } =
    useContext(DesignEditorContext);
  const editor = useEditor();
  const [currentPreview, setCurrentPreview] = useState<string>("");

  useEffect(() => {
    if (editor && scenes && currentScene) {
      const isCurrentSceneLoaded = scenes.find((s) => s.id === currentScene?.id);
      if (!isCurrentSceneLoaded) {
        setCurrentScene(scenes[0]);
      }
    }
  }, [editor, scenes, currentScene]);

  useEffect(() => {
    let watcher = async () => {
      const updatedTemplate = editor.scene.exportToJSON();
      const updatedPreview = (await editor.renderer.render(updatedTemplate)) as string;
      setCurrentPreview(updatedPreview);
    };
    if (editor) {
      editor.on("history:changed", watcher);
    }
    return () => {
      if (editor) {
        editor.off("history:changed", watcher);
      }
    };
  }, [editor]);

  useEffect(() => {
    if (editor) {
      if (currentScene) {
        updateCurrentScene(currentScene);
      } else {
        const defaultTemplate = getDefaultTemplate({
          width: 1200,
          height: 1200,
        });
        setCurrentDesign({
          id: nanoid(),
          frame: defaultTemplate.frame,
          metadata: {},
          name: "Untitled Design",
          preview: "",
          scenes: [],
          type: "PRESENTATION",
        });
        editor.scene
          .importFromJSON(defaultTemplate)
          .then(() => {
            const initialDesign = editor.scene.exportToJSON() as any;
            editor.renderer.render(initialDesign).then((data) => {
              setCurrentScene({ ...initialDesign, preview: data });
              setScenes([{ ...initialDesign, preview: data }]);
            });
          })
          .catch(console.log);
      }
    }
  }, [editor, currentScene]);

  const updateCurrentScene = useCallback(
    async (design: IScene) => {
      await editor.scene.importFromJSON(design);
      const updatedPreview = (await editor.renderer.render(design)) as string;
      setCurrentPreview(updatedPreview);
    },
    [editor, currentScene]
  );

  const addScene = useCallback(async () => {
    setCurrentPreview("");
    const updatedTemplate = editor.scene.exportToJSON();
    const updatedPreview = await editor.renderer.render(updatedTemplate);

    const updatedPages = scenes.map((p) =>
      p.id === updatedTemplate.id ? { ...updatedTemplate, preview: updatedPreview } : p
    );

    const defaultTemplate = getDefaultTemplate(currentDesign.frame);
    const newPreview = await editor.renderer.render(defaultTemplate);
    const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview } as any;
    const newPages = [...updatedPages, newPage] as any[];
    setScenes(newPages);
    setCurrentScene(newPage);
  }, [scenes, currentDesign]);

  const changePage = useCallback(
    async (page: any) => {
      setCurrentPreview("");
      if (editor) {
        const updatedTemplate = editor.scene.exportToJSON();
        const updatedPreview = await editor.renderer.render(updatedTemplate);

        const updatedPages = scenes.map((p) =>
          p.id === updatedTemplate.id ? { ...updatedTemplate, preview: updatedPreview } : p
        ) as any[];

        setScenes(updatedPages);
        setCurrentScene(page);
      }
    },
    [editor, scenes, currentScene]
  );

  return (
    <div className="bg-white p-1">
      <div className="flex items-center">
        {scenes.map((page, index) => (
          <div
            key={index}
            className={`${
              page.id === currentScene?.id ? "bg-gray-200" : "bg-white"
            } p-4 border ${
              page.id === currentScene?.id ? "border-purple-600" : "border-gray-300"
            } cursor-pointer`}
            onClick={() => changePage(page)}
          >
            <img
              src={currentPreview && page.id === currentScene?.id ? currentPreview : page.preview}
              alt={`Scene ${index + 1}`}
              className="max-w-90 max-h-80"
            />
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-40 text-white text-xs rounded-full h-16 w-16 flex items-center justify-center">
              {index + 1}
            </div>
          </div>
        ))}
        <div className="bg-white p-4 ml-2">
          <div
            onClick={addScene}
            className="w-24 h-24 bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            <Add size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
