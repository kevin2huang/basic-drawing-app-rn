import { toolTypes } from "../constants/toolTypes";

export const getMatchingBorderWidth = (
  strokeWidth: number,
  toolType: string | null
) => {
  if (toolType === toolTypes.PENCIL) {
    switch (strokeWidth) {
      case 8:
        return 6;
      case 16:
        return 10;
      case 28:
        return 15;
      default:
        return strokeWidth;
    }
  } else if (toolType === toolTypes.ERASER) {
    switch (strokeWidth) {
      case 14:
        return 10;
      case 25:
        return 15;
      case 35:
        return 20;
      case 45:
        return 25;
      case 60:
        return 30;
      default:
        return strokeWidth;
    }
  }
};
