import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ route, navigation }) => {
  const [categories, setCategories] = React.useState([]);
  const [magazine, setMagazine] = React.useState([]);
  const [idMagazin, setIdMagazin] = React.useState();
  const [idCategorie, setIdCategorie] = React.useState();
  const [meniuri, setMeniuri] = React.useState([]);

  var _isMounted = false;

  useEffect(() => {
    _isMounted = true;
    fetch("http://169.254.43.135:5000/listaIntreagaMeniuri")
      .then((response) => response.json())
      .then((response) => {
        if (_isMounted) {
          setMeniuri(response.data);
        }
      });
    return () => {
      _isMounted = false;
    };
  }, []);

  var encodedValue = "";
  if (route.params !== undefined) {
    var { numeMeniu } = route.params;
    var encodedValue = encodeURIComponent(numeMeniu);
  }
  useEffect(() => {
    _isMounted = true;
    fetch(`http://169.254.43.135:5000/cautaMeniu?nume=${encodedValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (_isMounted) {
          setMeniuri(response.data);
        }
      });
    return () => {
      _isMounted = false;
    };
  }, [numeMeniu]);

  useEffect(() => {
    _isMounted = true;
    fetch("http://169.254.43.135:5000/listamagazine")
      .then((response) => response.json())
      .then((response) => {
        if (_isMounted) {
          setMagazine(response.data);
        }
      });
    return () => {
      _isMounted = false;
    };
  }, []);

  const onSelectCategory = (id) => {
    const encodedValue = encodeURIComponent(id);

    fetch(
      `http://169.254.43.135:5000/listacategorii?idMagazin=${encodedValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => setCategories(response.data));
  };

  const idM = encodeURIComponent(idMagazin);
  const idC = encodeURIComponent(idCategorie);

  useEffect(() => {
    _isMounted = true;
    if (idMagazin !== undefined && idCategorie !== undefined) {
      fetch(
        `http://169.254.43.135:5000/listameniuri?idMagazin=${idM}&idCategorie=${idC}`
      )
        .then((response) => response.json())
        .then((response) => {
          if (_isMounted) {
            setMeniuri(response.data);
          }
        });
    }
    return () => {
      _isMounted = false;
    };
  }, [idMagazin, idCategorie]);

  const onSelectMenu = (item) => {
    setIdMagazin(item.id_magazin), setIdCategorie(item.id_categorie);
  };

  async function addToFavorites(item) {
    var listFavorites = (await AsyncStorage.getItem("listFavorites")) || "[]";
    var list = JSON.parse(listFavorites);
    if (list.some((listItem) => listItem.id_meniu === item.id_meniu)) {
      AsyncStorage.setItem("listFavorites", JSON.stringify(list));
    } else {
      var finalList = [...list, item];
      AsyncStorage.setItem("listFavorites", JSON.stringify(finalList));
    }
  }
  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50, display: "flex" }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: 20,
            justifyContent: "center",
          }}
        >
          <Icon
            name="sign-in"
            size={40}
            color="#ffffff"
            style={{ position: "absolute", top: 20, left: 20 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: 20,
            justifyContent: "center",
            marginLeft: "auto",
          }}
          onPress={() => {
            navigation.navigate("Stripe");
          }}
        >
          <Icon
            name="shopping-cart"
            size={40}
            color="#ffffff"
            style={{ position: "absolute", top: 20, right: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderShopes() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
          onPress={() => onSelectCategory(item.id)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.sigla }}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
          </View>

          <Text
            style={{
              color: "white",
            }}
          >
            {item.nume}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: 20 }}>
        <FlatList
          data={magazine}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    );
  }
  function renderCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 15,
          }}
          onPress={() => onSelectMenu(item)}
        >
          <View
            style={{
              top: 0,
              position: "absolute",
            }}
          >
            <Image
              source={item.poza_categorie}
              style={{
                width: 50,
                height: 50,
                left: 0,
              }}
            />
          </View>
          <Text style={{ color: "white", marginTop: 100 }}>
            {item.nume_categorie.split(" ").length > 1
              ? item.nume_categorie.split(" ").join("\n")
              : item.nume_categorie}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        style={{ position: "absolute", height: 100, top: 180, width: "100%" }}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id_categorie}
        renderItem={renderItem}
      />
    );
  }
  function renderMenus() {
    const renderItem = ({ item }) => (
      <View
        style={{
          backgroundColor: "#2c3e50",
        }}
      >
        <TouchableOpacity
          style={{ marginBottom: 20 }}
          onPress={() =>
            navigation.navigate("Menu", {
              item,
            })
          }
        >
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Image
              source={{ uri: item.poza_meniu }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 200,
                borderRadius: 30,
              }}
            />

            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                height: 50,
                width: 100,
                backgroundColor: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.timp_preparare + "minute"}
              </Text>
            </View>
          </View>

          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {item.nume_meniu}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addToFavorites(item)}>
          <Icon
            name="gratipay"
            size={40}
            color="#ffffff"
            style={{ position: "absolute", bottom: 10, right: 0 }}
          />
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        style={{ marginTop: 80 }}
        data={meniuri}
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
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderShopes()}
      {renderCategories()}
      {renderMenus()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
  },
});

export default Home;
