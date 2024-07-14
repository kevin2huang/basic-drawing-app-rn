import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen, faPalette, faEraser } from "@fortawesome/free-solid-svg-icons";
import ColorPickerTool from "./ColorPickerTool";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  setEraserStrokeWidth,
  setPenStrokeWidth,
  setToolType,
  showColorPicker,
  showStrokeWidthSelector,
} from "../store/canvasSlice";
import { TOOL_BAR_ICON_SIZE } from "../constants/toolBarIconSize";
import { toolTypes } from "../constants/toolTypes";
import { eraserStrokeWidths, penStrokeWidths } from "../constants/strokeWidths";
import { adjustStrokeWidth } from "../util/adjustStrokeWidth";
import { getMatchingBorderWidth } from "../util/getMatchingBorderWidth";
import StrokeWidthSelectorIcon from "../assets/icons/StrokeWidthSelectorIcon";

const CanvasToolBar = () => {
  const iconRefs = useRef<TouchableOpacity>();

  const dispatch = useAppDispatch();

  const [selectorPosition, setSelectorPosition] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });
  const showStrokeWidthMenu = useAppSelector(
    (state) => state.canvas.showStrokeWidthSelector
  );

  const selectedPencilColor = useAppSelector(
    (state) => state.canvas.pencilColor
  );
  const showColorPickerTool = useAppSelector(
    (state) => state.canvas.showColorPicker
  );
  const selectedToolType = useAppSelector((state) => state.canvas.tool);

  const penThickness = useAppSelector((state) => state.canvas.penStrokeWidth);
  const eraserThickness = useAppSelector(
    (state) => state.canvas.eraserStrokeWidth
  );

  const handleStrokeWidthIconPress = () => {
    const selectorOffset = selectedToolType === toolTypes.ERASER ? 29 : 15;
    iconRefs.current?.measure((fx, fy, width, height, px, py) => {
      setSelectorPosition({
        left: px - selectorOffset,
        width,
      });
      dispatch(showStrokeWidthSelector(!showStrokeWidthMenu));
    });
  };

  const toolThickness =
    selectedToolType === toolTypes.PENCIL ? penThickness : eraserThickness;

  const renderItem = ({ item }: { item: number }) => (
    <TouchableOpacity
      style={[
        styles.strokeButton,
        getMatchingBorderWidth(toolThickness, selectedToolType) === item &&
          styles.strokeButtonHighlighted,
      ]}
      onPress={() => {
        dispatch(showStrokeWidthSelector(false));

        if (selectedToolType === toolTypes.PENCIL) {
          const strokeWidth = adjustStrokeWidth(item, toolTypes.PENCIL);
          dispatch(setPenStrokeWidth(strokeWidth));
        } else if (selectedToolType === toolTypes.ERASER) {
          const strokeWidth = adjustStrokeWidth(item, toolTypes.ERASER);
          dispatch(setEraserStrokeWidth(strokeWidth));
        }
      }}
    >
      <View style={{ borderWidth: item, borderRadius: 50 }}></View>
    </TouchableOpacity>
  );

  return (
    <>
      {showColorPickerTool && <ColorPickerTool />}
      {showStrokeWidthMenu && (
        <View style={[styles.strokeContainer, { left: selectorPosition.left }]}>
          <FlatList
            data={
              selectedToolType === toolTypes.ERASER
                ? eraserStrokeWidths
                : penStrokeWidths
            }
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      )}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.toolbarContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedToolType === toolTypes.PENCIL && styles.selectedTool,
            ]}
            onPress={() => {
              dispatch(showStrokeWidthSelector(false));
              dispatch(setToolType(toolTypes.PENCIL));
            }}
          >
            <FontAwesomeIcon
              icon={faPen}
              color={selectedPencilColor}
              size={TOOL_BAR_ICON_SIZE}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch(showStrokeWidthSelector(false));
              dispatch(showColorPicker(true));
            }}
          >
            <FontAwesomeIcon icon={faPalette} size={TOOL_BAR_ICON_SIZE} />
          </TouchableOpacity>
          <TouchableOpacity
            ref={(el) => el && (iconRefs.current = el)}
            onPress={() => handleStrokeWidthIconPress()}
          >
            <StrokeWidthSelectorIcon width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedToolType === toolTypes.ERASER && styles.selectedTool,
            ]}
            onPress={() => {
              dispatch(showStrokeWidthSelector(false));
              dispatch(setToolType(toolTypes.ERASER));
            }}
          >
            <FontAwesomeIcon icon={faEraser} size={TOOL_BAR_ICON_SIZE} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1, // for ios
    elevation: 1, // for android
    bottom: 0,
  },
  toolbarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 30,
  },
  strokeContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // width: 60,
    backgroundColor: "#F4F4F4",
    position: "absolute",
    bottom: 90,
    zIndex: 2, // for ios
    elevation: 2, // for android
  },
  strokeButton: {
    marginVertical: 5,
    padding: 10,
    alignItems: "center",
  },
  strokeButtonHighlighted: {
    backgroundColor: "darkgray",
  },
  button: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "transparent",
  },
  selectedTool: {
    borderColor: "#67c23a",
  },
});

export default CanvasToolBar;
