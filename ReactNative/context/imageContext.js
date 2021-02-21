import React, { createContext, useState } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const ImageContext = createContext();
const ImageProvider = (props) => {
  const insertImage = () => {
    React.useEffect(() => {
      (async () => {
        if (Platform.OS !== "web") {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();
    }, []);
  };
  const pickImage = async (setSigla) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSigla(result.uri);
    }
  };

  return (
    <ImageContext.Provider value={{ insertImage, pickImage }}>
      {props.children}
    </ImageContext.Provider>
  );
};
export default ImageProvider;
