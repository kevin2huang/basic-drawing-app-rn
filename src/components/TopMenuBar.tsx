import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faRotateLeft,
  faTrash,
  faDownload,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  removeLastElement,
  setElements,
  showSidePanel,
} from "../store/canvasSlice";
import { HomeScreenNavigationProps } from "../constants/navigatorTypes";
import { drawingBoardHandle } from "./DrawingBoard";
import { RefObject } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

type drawingBoardRefType = {
  drawingBoardRef: RefObject<drawingBoardHandle>;
};

type TopMenuBarProps = HomeScreenNavigationProps & drawingBoardRefType;

const TopMenuBar = (props: TopMenuBarProps) => {
  const { drawingBoardRef } = props;
  const dispatch = useAppDispatch();
  const canvasElements = useAppSelector((state) => state.canvas.elements);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => dispatch(showSidePanel(true))}>
          <FontAwesomeIcon icon={faBars} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(removeLastElement(""))}
          disabled={canvasElements.length === 0}
        >
          <FontAwesomeIcon
            icon={faRotateLeft}
            style={
              canvasElements.length === 0 ? styles.disabledIcon : { opacity: 1 }
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(setElements([]))}
          disabled={canvasElements.length === 0}
        >
          <FontAwesomeIcon
            icon={faTrash}
            style={
              canvasElements.length === 0 ? styles.disabledIcon : { opacity: 1 }
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            drawingBoardRef.current?.handleDownload();
          }}
        >
          <FontAwesomeIcon icon={faDownload} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1, // for ios
    elevation: 1, // for android
  },
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
  },
  disabledIcon: {
    opacity: 0.5,
  },
});

export default TopMenuBar;
