import React from "react";
import { useEditor } from "@layerhub-io/react";

export default function () {
  const editor = useEditor();
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    image: "",
  });

  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON();
      const image = (await editor.renderer.render(template)) as string;
      setState({ image });
      setLoading(false);
    }
  }, [editor]);

  React.useEffect(() => {
    makePreview();
  }, [editor]);

  return (
    <div className="flex flex-1 items-center justify-center p-20">
      {!loading && <img className="w-auto h-full" src={state.image} alt="Preview" />}
    </div>
  );
}
