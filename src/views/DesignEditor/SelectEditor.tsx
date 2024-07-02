import React from "react";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { DesignType } from "~/interfaces/DesignEditor";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import Images from "~/components/Icons/Images";

export default function () {
  const [selectedEditor, setSelectedEditor] = React.useState<DesignType>("GRAPHIC");
  const { setEditorType } = useDesignEditorContext();

  return (
    <Block
      $style={{
        height: "100vh",
        width: "100vw",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Block $style={{ textAlign: "center" }}>
        <Block
          $style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Block
            onClick={() => setSelectedEditor("GRAPHIC")}
            $style={{
              height: "180px",
              width: "180px",
              background: selectedEditor === "GRAPHIC" ? "#000000" : "rgb(231, 236, 239)",
              color: selectedEditor === "GRAPHIC" ? "#ffffff" : "#333333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Images size={34} />
            <Block>Graphic</Block>
          </Block>
        </Block>
        <Block $style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Button style={{ width: "180px" }} onClick={() => setEditorType(selectedEditor)}>
            Continue
          </Button>
        </Block>
      </Block>
    </Block>
  );
}
