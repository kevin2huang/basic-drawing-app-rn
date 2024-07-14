import { Slice, createSlice } from "@reduxjs/toolkit";
import { ElementType } from "../constants/elementTypes";
import { toolTypes } from "../constants/toolTypes";

interface CanvasState {
  tool: string | null;
  elements: ElementType[];
  pencilColor: string;
  showColorPicker: boolean;
  showStrokeWidthSelector: boolean;
  imageUri: string; // path to where the image of the canvas is saved
  penStrokeWidth: number;
  eraserStrokeWidth: number;
  showSidePanel: boolean;
}

const initialState: CanvasState = {
  tool: toolTypes.PENCIL,
  elements: [],
  pencilColor: "#575757",
  showColorPicker: false,
  showStrokeWidthSelector: false,
  imageUri: "",
  penStrokeWidth: 4,
  eraserStrokeWidth: 10,
  showSidePanel: false,
};

const canvasSlice: Slice<CanvasState> = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setToolType: (state, action) => {
      state.tool = action.payload;
    },
    updateElement: (state, action) => {
      const { id } = action.payload;

      const index = state.elements.findIndex((element) => element.id === id);

      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        state.elements[index] = action.payload;
      }
    },
    setElements: (state, action) => {
      state.elements = action.payload;
    },
    removeLastElement: (state) => {
      if (state.elements.length > 0) {
        state.elements.pop();
        state.elements = [...state.elements];
      }
    },
    setColor: (state, action) => {
      state.pencilColor = action.payload;
    },
    showColorPicker: (state, action) => {
      state.showColorPicker = action.payload;
    },
    setImageUri: (state, action) => {
      state.imageUri = action.payload;
    },
    setPenStrokeWidth: (state, action) => {
      state.penStrokeWidth = action.payload;
    },
    showStrokeWidthSelector: (state, action) => {
      state.showStrokeWidthSelector = action.payload;
    },
    setEraserStrokeWidth: (state, action) => {
      state.eraserStrokeWidth = action.payload;
    },
    showSidePanel: (state, action) => {
      state.showSidePanel = action.payload;
    },
  },
});

export const {
  setToolType,
  updateElement,
  setElements,
  setColor,
  showColorPicker,
  setImageUri,
  setPenStrokeWidth,
  showStrokeWidthSelector,
  setEraserStrokeWidth,
  showSidePanel,
  removeLastElement,
} = canvasSlice.actions;

export default canvasSlice.reducer;
