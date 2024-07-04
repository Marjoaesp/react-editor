import React from "react";
import useDesignEditorScenes from "~/hooks/useDesignEditorScenes";
import { Carousel } from "react-responsive-carousel";
import { useEditor } from "@layerhub-io/react";
import { IScene } from "@layerhub-io/types";
import Loading from "~/components/Loading";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function () {
  const [slides, setSlides] = React.useState<{ id: string; preview: string }[]>([]);
  const scenes = useDesignEditorScenes();
  const editor = useEditor();
  const [loading, setLoading] = React.useState(true);

  const loadSlides = React.useCallback(
    async (scenes: IScene[]) => {
      const slides = [];
      for (const scene of scenes) {
        const preview = (await editor.renderer.render(scene)) as string;
        slides.push({
          id: scene.id,
          preview,
        });
      }
      setSlides(slides);
      setLoading(false);
    },
    [editor]
  );

  React.useEffect(() => {
    if (scenes && editor) {
      const currentScene = editor.scene.exportToJSON();
      const updatedScenes = scenes.map((scene) => {
        if (scene.id === currentScene.id) {
          return currentScene;
        }
        return scene;
      });
      loadSlides(updatedScenes);
    }
  }, [editor, scenes]);

  return (
    <div className="flex flex-1 items-center justify-center relative">
      <div className="absolute max-w-screen-lg">
        {loading ? (
          <Loading />
        ) : (
          <Carousel showIndicators={false} showThumbs={false} useKeyboardArrows={true} showStatus={false}>
            {slides.map((page, index) => (
              <img key={index} src={page.preview} alt={`Slide ${index}`} className="w-auto h-full" />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
