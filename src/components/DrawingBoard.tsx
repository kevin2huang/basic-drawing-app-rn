import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";
import { View, StyleSheet, Platform } from "react-native";
import { Svg, Path, Image } from "react-native-svg";
import { canvasHeight, canvasWidth } from "../constants/canvasSize";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  setImageUri,
  showColorPicker,
  showStrokeWidthSelector,
  updateElement,
} from "../store/canvasSlice";
import { toolTypes } from "../constants/toolTypes";
import { createElement } from "../util/createElement";
import { ElementType, PathElement } from "../constants/elementTypes";
import { updateElementWhileDrawing } from "../util/updateElementWhileDrawing";
import ViewShot, { captureRef } from "react-native-view-shot";
import ViewShotRef from "react-native-view-shot";

export interface drawingBoardHandle {
  handleDownload: () => Promise<void>;
  setCanvasImageUri: () => Promise<void>;
}

const DrawingBoard = forwardRef<drawingBoardHandle>((props, ref) => {
  const viewRef = useRef<ViewShotRef>(null);

  const dispatch = useAppDispatch();
  const [currentElement, setCurrentElement] = useState<ElementType | null>(
    null
  );
  const selectedToolType = useAppSelector((state) => state.canvas.tool);
  const elements = useAppSelector((state) => state.canvas.elements);
  const selectedPencilColor = useAppSelector(
    (state) => state.canvas.pencilColor
  );
  const showColorPickerTool = useAppSelector(
    (state) => state.canvas.showColorPicker
  );
  const showStrokeWidthMenu = useAppSelector(
    (state) => state.canvas.showStrokeWidthSelector
  );
  const penThickness = useAppSelector((state) => state.canvas.penStrokeWidth);
  const eraserThickness = useAppSelector(
    (state) => state.canvas.eraserStrokeWidth
  );

  useImperativeHandle(ref, () => ({
    handleDownload: async () => {
      try {
        const uri = await captureRef(viewRef);

        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // get base64 string of the image, do something with it...
        console.log("Base64 string:", base64);
      } catch (error) {
        console.error("Failed to save the image ", error);
      }
    },
    setCanvasImageUri: async () => {
      try {
        const uri = await captureRef(viewRef);
        dispatch(setImageUri(uri));
      } catch (error) {
        console.error("Failed to save the image ", error);
      }
    },
  }));

  const onTouchStart = (event: any) => {
    if (event.nativeEvent.touches.length === 1) {
      if (showColorPickerTool) dispatch(showColorPicker(false));
      if (showStrokeWidthMenu) dispatch(showStrokeWidthSelector(false));

      switch (selectedToolType) {
        case toolTypes.ERASER:
        case toolTypes.PENCIL: {
          const locationX = event.nativeEvent.locationX;
          const locationY = event.nativeEvent.locationY;
          const newPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)} `;
          const elementId = uuid.v4() as string;

          const elementColor =
            selectedToolType === toolTypes.ERASER
              ? "#ffffff"
              : selectedPencilColor;

          const element = createElement({
            id: elementId,
            points: [newPoint],
            color: elementColor,
            strokeWidth:
              selectedToolType === toolTypes.ERASER
                ? eraserThickness
                : penThickness,
            toolType: selectedToolType,
          });

          setCurrentElement(element);
          dispatch(updateElement(element));
          break;
        }
        default:
          return null;
      }
    }
  };

  const onTouchEnd = () => {
    setCurrentElement(null);
  };

  const onTouchMove = (event: any) => {
    if (event.nativeEvent.touches.length === 1) {
      const index = elements.findIndex((el) => el.id === currentElement?.id);

      if (index !== -1) {
        const locationX = event.nativeEvent.locationX;
        const locationY = event.nativeEvent.locationY;
        const newPoint = `${locationX.toFixed(0)},${locationY.toFixed(0)} `;

        const elementColor =
          selectedToolType === toolTypes.ERASER
            ? "#ffffff"
            : selectedPencilColor;

        const strokeWidth =
          selectedToolType === toolTypes.ERASER
            ? eraserThickness
            : penThickness;

        updateElementWhileDrawing(
          index,
          newPoint,
          elementColor,
          strokeWidth,
          (elements[index] as PathElement).toolType,
          elements as PathElement[]
        );
      }
    }
  };

  return (
    <>
      <View
        style={styles.svgContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <ViewShot
          ref={viewRef}
          options={{ result: "tmpfile", format: "jpg", quality: 0.9 }}
        >
          <Svg height={canvasHeight} width={canvasWidth}>
            {elements.length > 0 &&
              elements.map((element) =>
                "points" in element ? (
                  <Path
                    key={element.id}
                    d={element.points.join("")}
                    stroke={element.color}
                    fill={"transparent"}
                    strokeWidth={element.strokeWidth}
                    strokeLinejoin={"round"}
                    strokeLinecap={"round"}
                  />
                ) : (
                  <Image
                    key={element.id}
                    href={element.uri}
                    height={canvasHeight}
                    width={canvasWidth}
                  />
                )
              )}
          </Svg>
        </ViewShot>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  svgContainer: {
    display: "flex",
    flexDirection: "column",
    height: canvasHeight,
    width: canvasWidth,
    backgroundColor: "white",
    zIndex: 0, // for ios
    elevation: 0, // for android
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DrawingBoard;
