# Basic Drawing App in React Native

A drawing board application built with `Path` from `react-native-svg`. In addition, it has some basic functionality like color picker, pen thickness selection, erasing capabilities, undo, and clear canvas. This project also includes a basic setup for localization using i18n.

## Features

- **Drawing Board**: Draw freely on the canvas.
- **Color Picker**: Choose from a variety of colors for your pen.
- **Pen Thickness Selection**: Select different thicknesses for the pen.
- **Eraser**: Erase parts of your drawing.
- **Undo**: Undo your last action.
- **Clear Canvas**: Clear the entire drawing board.
- **Localization**: Basic setup for multiple languages using i18n.

## Demo

https://github.com/user-attachments/assets/87dc2107-5e72-4bdd-afe1-88ba9038c627

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)

### Installation

`npm install`

### Running the App

To run your project, run one of the following npm commands.

- npm run android
- npm run ios
- npm run web

Using your phone's camera to scan the QR code which will open the app from Expo on your phone. (Install Expo from the PlayStore or AppStore if you don't have it).

### Building for Production

`npm run build`

## Localization

The project uses i18next and react-i18next for localization. You can find the localization files in the src/locales directory. To add a new language, follow these steps:

1. Create a new JSON file for your language in the src/locales directory (e.g., fr.json for French).
2. Add the translations for your language in the new JSON file.
3. Update the src/i18n.ts file to include your new language.
