import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
};

export type HomeScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
