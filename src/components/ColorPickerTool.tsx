import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { setColor, showColorPicker } from "../store/canvasSlice";

const ColorPickerTool = () => {
  const [selectedColor, setSelectedColor] = useState<string>();
  const pencilColor = useAppSelector((state) => state.canvas.pencilColor);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => dispatch(showColorPicker(false))}
      >
        <FontAwesomeIcon icon={faClose} size={20} />
      </TouchableOpacity>
      <ColorPicker
        color={selectedColor ? selectedColor : pencilColor}
        onColorChange={(color) => setSelectedColor(color)}
        onColorChangeComplete={(color) => dispatch(setColor(color))}
        sliderSize={40}
        swatches={true}
        swatchesLast={true}
        swatchesOnly={false}
        noSnap={true}
        row={false}
        thumbSize={40}
        useNativeLayout={true}
        discrete={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "absolute", // This makes it float over the SVG
    bottom: 0, // Distance from the bottom of the parent container
    width: "100%",
    height: "60%",
    padding: 40,
    paddingBottom: 40,
    zIndex: 2, // for ios
    elevation: 2, // for android
  },
  selectedColorText: {
    marginTop: 20,
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10, // Adjust as needed
    right: 10, // Adjust as needed
    // backgroundColor: "lightgrey",
    // borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ColorPickerTool;
