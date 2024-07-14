import { toolTypes } from "../constants/toolTypes";
import { PathElement } from "../constants/elementTypes";

export const createElement = (element: PathElement): PathElement => {
  switch (element.toolType) {
    case toolTypes.ERASER:
    case toolTypes.PENCIL:
      return {
        id: element.id,
        points: element.points,
        color: element.color,
        toolType: element.toolType,
        strokeWidth: element.strokeWidth,
      };
    default:
      throw new Error("Something went wrong when creating Element");
  }
};
