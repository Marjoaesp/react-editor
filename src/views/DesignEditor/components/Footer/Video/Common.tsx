import React, { useState, useEffect } from "react";
import Icons from "~/components/Icons";
import { Button, KIND, SIZE } from "baseui/button";
import { Block } from "baseui/block";
import { useZoomRatio } from "@layerhub-io/react";
import { useTimer } from "@layerhub-io/use-timer";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";

const MyComponent: React.FC = () => {
  const { time } = useTimer();
  const { maxTime } = useDesignEditorContext();
  const [options, setOptions] = useState<{ zoomRatio: number }>({
    zoomRatio: 20,
  });
  const zoomRatio: number = useZoomRatio();

  useEffect(() => {
    setOptions({ ...options, zoomRatio: Math.round(zoomRatio * 100) });
  }, [zoomRatio]);

  return (
    <div className="h-20 bg-white flex justify-between items-center">
      <div className="flex font-medium text-base items-center">
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Layers size={20} />
        </Button>
        <Block>
          {new Date(time).toISOString().slice(14, 19)} / {new Date(maxTime).toISOString().slice(14, 19)}
        </Block>
      </div>
      <div className="flex items-center justify-end">
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          {options.zoomRatio}
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Refresh size={16} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Undo size={22} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Redo size={22} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.TimePast size={16} />
        </Button>
      </div>
    </div>
  );
};

export default MyComponent;
