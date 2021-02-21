import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "modal-react-native-web";
import { Dimensions } from "react-native";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";

const CheckoutDetails = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;

  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [length, setLength] = useState();
  const [orderProducts, setOrderProducts] = useState([]);
  const [currentLocation, setCurrrentLocation] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const apiKey = "AIzaSyAP1romFm4ZTiYFJNLyepHhiwGfsBXXuMs";

  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    const getProducts = async () => {
      var listCart = await AsyncStorage.getItem("listCart");
      var products = JSON.parse(listCart);
      if (products !== null) {
        setLength(products.length);
        setOrderProducts(products);
      }
    };
    getProducts();
  }, []);

  async function removeItemCart(id) {
    var list = await AsyncStorage.getItem("listCart");
    list = JSON.parse(list);

    const finalList = list.filter((item) => item.idMeniu !== id);
    AsyncStorage.setItem("listCart", JSON.stringify(finalList));
    const listCart = await AsyncStorage.getItem("listCart");
    const products = JSON.parse(listCart);
    setOrderProducts(products);
  }

  const getTotal = () => {
    var total = 0;
    orderProducts.map((produs) => {
      total = total + produs.cantitate * produs.pret;
    });
    return total;
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.removeItem("listCart");
  };

  React.useEffect(() => {
    const getPermission = async () => {
      let result = await Location.getPermissionsAsync();
      if (result.status !== "granted") {
        setErrorMessage("Permisiunea pentru a accesa locatia este interzisa");
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;
      Location.setGoogleApiKey(apiKey);

      const coords = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });

      var fullAdress = "";
      fullAdress =
        coords[0].street + "," + coords[0].city + "," + coords[0].region;
      setCurrrentLocation(fullAdress);
    };
    getPermission();
  }, [currentLocation]);

  const createCustomer = (callback) => {
    try {
      fetch("http://169.254.43.135:5000/createCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          nume: nume,
          email: email,
          telefon: telefon,
        }),
      })
        .then((response) => response.json())
        .then((response) => callback(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const charge = async (custId) => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post("http://169.254.43.135:5000/charge", {
          id,
          amount: getTotal() * 100,
          email: email,
          customerId: custId,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        });

        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const payAction = (callback) => {
    createCustomer(charge);
    callback();
  };

  const ActivateModal = async () => {
    const data = await charge();

    if (data.confirm.status === "succeeded") {
      setModalVisible(!modalVisible);
    }
  };

  function renderHeader() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-left" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View
        style={{
          position: "relative",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {orderProducts.map((produs, index) => {
          return (
            <View
              key={produs.idMeniu}
              style={{
                flexDirection: "row",
                position: "absolute",
                top: 40 * (index + 1),
                left: 10,
              }}
            >
              <Image
                source={produs.poza}
                resizeMode="cover"
                style={{ width: 80, height: 40 }}
              />
              <Text style={styles.textStyle}>{produs.nume}</Text>
              <Text style={styles.textStyle}>
                {produs.cantitate}/{produs.pret}
              </Text>

              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "white",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  removeItemCart(produs.idMeniu);
                }}
              >
                <Text style={{ fontSize: 30 }}>×</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <Text
          style={{
            marginLeft: windowWidth - 100,
            marginTop: 50 * (length + 1),
            color: "white",
          }}
        >
          Total: {getTotal()}
        </Text>
      </View>
      <View style={{ flex: 1, marginTop: 30 * length }}>
        <View style={{ padding: 20 }}>
          <CardElement
            options={{
              iconStyle: "solid",
              style: {
                base: {
                  padding: 20,
                  fontSize: "18px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#5d88b3",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </View>

        <TextInput
          placeholder="Adresa"
          style={styles.input}
          label="Adresa"
          value={currentLocation}
          onChangeText={(text) => setCurrrentLocation(text)}
        ></TextInput>

        <TextInput
          placeholder="Nume"
          style={styles.input}
          label="Nume"
          value={nume}
          onChangeText={(text) => setNume(text)}
        ></TextInput>

        <TextInput
          placeholder="Email"
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>

        <TextInput
          placeholder="Telefon"
          style={styles.input}
          label="Telefon"
          value={telefon}
          onChangeText={(text) => setTelefon(text)}
        ></TextInput>
      </View>
      <View
        style={{ width: 120, marginTop: 50, marginLeft: windowWidth - 150 }}
      >
        <Button
          title="Cumpara"
          disabled={!stripe}
          onPress={() => payAction(ActivateModal)}
        ></Button>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Modal
          style={styles.centered}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#ffffff",
                margin: 50,
                padding: 50,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 14 }}>
                Tranzactia a fost incheiata cu succes.!!!
              </Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  position: "absolute",
                  top: 20,
                  right: 20,
                  backgroundColor: "#0b1214",

                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Home");
                  clearAsyncStorage();
                }}
              >
                <Text style={{ color: "white" }}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1214",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    marginLeft: 10,
    color: "white",
  },
  input: {
    width: "50%",
    backgroundColor: "white",
    marginLeft: 20,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#242624",
    padding: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});

export default CheckoutDetails;
