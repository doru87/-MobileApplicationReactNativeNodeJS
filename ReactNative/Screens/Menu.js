import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const Menu = ({ route, navigation }) => {
  const [meniu, setMeniu] = React.useState([]);

  const [cantitate, setCantitate] = React.useState(0);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  React.useEffect(() => {
    let { item } = route.params;
    setMeniu(item);
  }, []);

  const getDataCard = async () => {
    const jsonValue = await AsyncStorage.getItem("listCart");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  };

  async function updateDataCart(actiune, idMeniu, pret, poza, nume) {
    var listCart = (await AsyncStorage.getItem("listCart")) || [];

    var item = {};
    if (listCart.length > 0) {
      const listCart = await getDataCard();
      item = listCart.filter((data) => data.idMeniu == idMeniu);

      if (item.length > 0) {
        if (actiune == "+") {
          let cantitate = item[0].cantitate + 1;
          setCantitate(cantitate);
          item[0].cantitate = cantitate;
          item[0].total = item[0].cantitate * pret;
        } else if (actiune == "-") {
          if (item[0].cantitate > 0) {
            let cantitate = item[0].cantitate - 1;
            setCantitate(cantitate);
            item[0].cantitate = cantitate;
            item[0].total = cantitate * pret;
          }
        }
        await AsyncStorage.setItem("listCart", JSON.stringify(listCart));
        const data = await getDataCard();
      } else {
        if (actiune == "+") {
          const newItem = {
            idMeniu: idMeniu,
            cantitate: 1,
            pret: pret,
            total: pret,
            poza: poza,
            nume: nume,
          };
          listCart.push(newItem);
          await AsyncStorage.setItem("listCart", JSON.stringify(listCart));
        }
      }
    } else {
      if (actiune == "+") {
        const newItem = {
          idMeniu: idMeniu,
          cantitate: 1,
          pret: pret,
          total: pret,
          poza: poza,
          nume: nume,
        };

        listCart.push(newItem);
        await AsyncStorage.setItem("listCart", JSON.stringify(listCart));
      }
    }
  }

  const CheckoutButton = ({ title, order }) => {
    return (
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: "#009688",
            borderRadius: 10,
            height: 50,
            width: windowWidth - 80,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
          onPress={() =>
            navigation.navigate("Stripe", {
              order,
            })
          }
        >
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const [cartProducts, setCartProducts] = React.useState([]);
  var _isMounted = false;

  function getQuantity(meniuId) {
    React.useEffect(() => {
      _isMounted = true;
      async function getData() {
        var cart = await getDataCard();
        if (_isMounted) {
          setCartProducts(cart);
        }
      }

      getData();
      return () => {
        _isMounted = false;
      };
    }, [cantitate]);

    if (cartProducts.length > 0) {
      let orderItem = cartProducts.filter((item) => item.idMeniu == meniuId);
      if (orderItem.length > 0) {
        return orderItem[0].cantitate;
      }
    }
    return 0;
  }

  function renderHeader() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#0b1214" />
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodInfo() {
    return (
      <View key={`menu-${meniu.id_meniu}`} style={{ alignItems: "center" }}>
        <View style={{ height: windowHeight * 0.35 }}>
          <Image
            source={meniu.poza_meniu}
            resizeMode="cover"
            style={{ width: windowWidth, height: "100%" }}
          />
        </View>

        <View
          style={{
            backgroundColor: "#0b1214",
            width: windowWidth,
            height: 400,
            padding: 40,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 10,
              left: windowWidth - 300,
              width: windowWidth,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
              }}
              onPress={() =>
                updateDataCart(
                  "-",
                  meniu.id_meniu,
                  meniu.pret_meniu,
                  meniu.poza_meniu,
                  meniu.nume_meniu
                )
              }
            >
              <Text>-</Text>
            </TouchableOpacity>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{getQuantity(meniu.id_meniu)}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 25,
              }}
              onPress={() =>
                updateDataCart(
                  "+",
                  meniu.id_meniu,
                  meniu.pret_meniu,
                  meniu.poza_meniu,
                  meniu.nume_meniu
                )
              }
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 22,
              fontWeight: "bold",
              color: "red",
            }}
          >
            {meniu.nume_meniu}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            {meniu.descriere_meniu}
          </Text>
        </View>
        <CheckoutButton
          title="Adauga in cosul de cumparaturi"
          order={cartProducts}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F7",
  },
  checkoutContainer: {
    position: "absolute",
    bottom: 100,
  },
});

export default Menu;
