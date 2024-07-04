import { useStyletron } from "baseui"
import { LAYER_ITEM } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import { styled } from "baseui"
import Icons from "~/components/Icons"
import { useTranslation } from "react-i18next"
import Scrollable from "~/components/Scrollable"
import { Block } from "baseui/block"

const Container = styled("div", (props) => ({
  width: "80px",
  backgroundColor: props.$theme.colors.primary100,
  display: "flex",
  flexDirection: "column",
}))

function LayersList() {
  const { t } = useTranslation("editor")
  const PANEL_ITEMS = LAYER_ITEM
  return (
    <Container>
      <Scrollable autoHide={true}>
        {PANEL_ITEMS.map((layerListItem) => (
          <LayerListItem
            label={t(`panels.panelsList.${layerListItem.id}`)}
            name={layerListItem.name}
            key={layerListItem.name}
            icon={layerListItem.name}
          />
        ))}
      </Scrollable>
    </Container>
  )
}

function LayerListItem({ label, icon, name }: any) {
  const [css, theme] = useStyletron()
  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <Block
      id={"LayerPanelList"}
      $style={{
        width: "80px",
        height: "80px",
        backgroundColor: theme.colors.primary100,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Uber Move Text",
        fontWeight: 500,
        fontSize: "0.8rem",
        userSelect: "none",
        transition: "all 0.5s",
        gap: "0.1rem",
        ":hover": {
          cursor: "pointer",
          backgroundColor: theme.colors.white,
          transition: "all 1s",
        },
      }}
    >
      <Icon size={24} />
      <div>{label}</div>
    </Block>
  )
}

export default LayersList
