import { View } from "react-native";
import DrawingBoard, { drawingBoardHandle } from "../components/DrawingBoard";
import TopMenuBar from "../components/TopMenuBar";
import CanvasToolBar from "../components/CanvasToolBar";
import { HomeScreenNavigationProps } from "../constants/navigatorTypes";
import { useRef } from "react";
import SidePanel from "../components/SidePanel";
import { useAppSelector } from "../hooks/useAppSelector";

const HomeScreen = ({ navigation, route }: HomeScreenNavigationProps) => {
  const drawingBoardRef = useRef<drawingBoardHandle>(null);
  const isSidePanelOpen = useAppSelector((state) => state.canvas.showSidePanel);

  return (
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#F4F4F4" }}
    >
      <TopMenuBar
        navigation={navigation}
        route={route}
        drawingBoardRef={drawingBoardRef}
      />
      {isSidePanelOpen && <SidePanel />}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <DrawingBoard ref={drawingBoardRef} />
      </View>
      <CanvasToolBar />
    </View>
  );
};

export default HomeScreen;
