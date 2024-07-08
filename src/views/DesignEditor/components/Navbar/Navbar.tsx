import React, { useRef, useCallback } from "react";
import { styled, ThemeProvider, DarkTheme } from "baseui";
import { Theme } from "baseui/theme";
import { Button, KIND } from "baseui/button";
import Logo from "~/components/Icons/Logo";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import Play from "~/components/Icons/Play";
import { Block } from "baseui/block";
import { useEditor } from "@layerhub-io/react";
import useEditorType from "~/hooks/useEditorType";
import { IScene } from "@layerhub-io/types";
import { loadTemplateFonts } from "~/utils/fonts";
import { loadVideoEditorAssets } from "~/utils/video";
import DesignTitle from "./DesignTitle";
import { IDesign } from "~/interfaces/DesignEditor";

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "grid",
  padding: "0 1.25rem",
  gridTemplateColumns: "240px 1fr 240px",
  alignItems: "center",
}));

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
    if (editor) {
      if (editorType === "GRAPHIC") {
        parseGraphicJSON();
      }
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
      let templateData: TemplateData | undefined;
      if (data.type === "GRAPHIC") {
        templateData = await loadGraphicTemplate(data);
      }

      if (templateData) {
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
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <DesignTitle />
        <Block $style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "flex-end" }}>
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: "none" }}
          />

          <Button
            size="compact"
            onClick={makeDownloadTemplate}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Export
          </Button>
          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            <Play size={24} />
          </Button>
        </Block>
      </Container>
    </ThemeProvider>
  );
}
