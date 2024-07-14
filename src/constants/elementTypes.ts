import { Key } from "react";
import { toolTypes } from "./toolTypes";

export interface PathElement {
  id: Key | null | undefined;
  points: string[];
  color: string;
  strokeWidth: number;
  toolType: toolTypes;
  index?: number;
}

export interface ImageElement {
  id: Key | null | undefined;
  uri: string;
}

export type ElementType = PathElement | ImageElement;
