import { toolTypes } from "../constants/toolTypes";

export const adjustStrokeWidth = (strokeWidth: number, toolType: string) => {
  if (toolType === toolTypes.PENCIL) {
    switch (strokeWidth) {
      case 6:
        return 8;
      case 10:
        return 16;
      case 15:
        return 28;
      default:
        return strokeWidth;
    }
  } else if (toolType === toolTypes.ERASER) {
    switch (strokeWidth) {
      case 10:
        return 14;
      case 15:
        return 25;
      case 20:
        return 35;
      case 25:
        return 45;
      case 30:
        return 60;
      default:
        return strokeWidth;
    }
  }
};
