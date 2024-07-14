import { PathElement } from "../constants/elementTypes";
import { toolTypes } from "../constants/toolTypes";
import { setElements } from "../store/canvasSlice";
import { store } from "../store/store";

export const updateElementWhileDrawing = (
  index: number,
  newPoint: string,
  color: string,
  strokeWidth: number,
  toolType: toolTypes,
  elements: PathElement[]
) => {
  const elementsCopy = [...elements];

  switch (toolType) {
    case toolTypes.ERASER:
    case toolTypes.PENCIL:
      elementsCopy[index] = {
        ...elementsCopy[index],
        points: [...elementsCopy[index].points, newPoint],
        color,
        strokeWidth,
      };

      store.dispatch(setElements(elementsCopy));
      break;
    default:
      throw new Error("Something went wrong when updating element");
  }
};
