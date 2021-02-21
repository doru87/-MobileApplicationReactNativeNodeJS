import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addToFavorites = ({ navigation }) => {
  const [favoriteListItems, setFavoriteListItems] = React.useState([]);

  React.useEffect(() => {
    const getDataCard = async () => {
      const jsonValue = await AsyncStorage.getItem("listFavorites");
      const result = jsonValue != null ? JSON.parse(jsonValue) : [];
      setFavoriteListItems(result);
    };
    getDataCard();
  }, [favoriteListItems]);

  function renderFavoriteItems() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Menu", {
            item,
          })
        }
      >
        <View
          style={{
            backgroundColor: "#2c3e50",
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Image
            source={{ uri: item.poza_meniu }}
            resizeMode="cover"
            style={{
              width: 100,
              height: 70,
            }}
          />
          <Text style={styles.textStyle}>{item.nume_meniu}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        style={{ marginTop: 80 }}
        data={favoriteListItems}
        keyExtractor={(item) => `${item.id_meniu}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 30,
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
          Meniurile mele favorite
        </Text>
      </View>
      <View>{renderFavoriteItems()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

export default addToFavorites;
