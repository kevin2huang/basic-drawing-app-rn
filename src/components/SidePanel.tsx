import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import i18nInit from "../i18n";
import { SelectCountry } from "react-native-element-dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser, faClose } from "@fortawesome/free-solid-svg-icons";
import { showSidePanel } from "../store/canvasSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { localeList } from "../constants/localeList";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

const SidePanel = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectedLocale, setSelectedLocale] = useState(i18n.language);
  const translateX = useRef(new Animated.Value(-screenWidth)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const closePanel = () => {
    Animated.spring(translateX, {
      toValue: -screenWidth * 0.8,
      useNativeDriver: true,
    }).start(() => {
      dispatch(showSidePanel(false));
    });
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <SafeAreaView style={styles.SafeAreaContainer}>
        <View style={styles.userNameStyle}>
          <FontAwesomeIcon icon={faCircleUser} size={40} />
        </View>
        <View style={styles.separatorStyle} />
        <View style={styles.localeContainer}>
          <Text style={styles.localeText}>{t("SIDE_PANEL.LANGUAGE")}: </Text>
          <SelectCountry
            style={styles.localeDropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            imageStyle={styles.imageStyle}
            iconStyle={styles.iconStyle}
            maxHeight={200}
            value={selectedLocale}
            data={localeList}
            valueField="value"
            labelField="lable"
            imageField=""
            placeholder="Select language"
            searchPlaceholder="Search..."
            onChange={(e) => {
              setSelectedLocale(e.value);
              console.log(e.value);
              i18nInit.changeLanguage(e.value);
            }}
          />
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={closePanel}>
          <FontAwesomeIcon icon={faClose} size={20} />
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2, // for ios
    elevation: 2, // for android
    width: screenWidth * 0.8, // Panel width is 80% of the screen width
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  SafeAreaContainer: {
    flex: 1,
    width: "100%",
    marginTop: 35,
  },
  userNameStyle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 15,
    marginTop: 40,
  },
  separatorStyle: {
    height: 1,
    width: "auto",
    backgroundColor: "#C0C0C0",
    marginTop: 15,
    marginHorizontal: 10,
  },
  localeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  localeText: {
    marginLeft: 10,
  },
  localeDropdown: {
    margin: 16,
    height: 50,
    width: 150,
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    display: "none",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    // margin: 10,
    position: "absolute",
    top: 10,
    right: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default SidePanel;
