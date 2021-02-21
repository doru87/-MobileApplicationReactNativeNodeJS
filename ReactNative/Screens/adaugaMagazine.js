import React, { useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { ImageContext } from "../context/imageContext";

const adaugaMagazine = () => {
  const [sigla, setSigla] = useState("");
  const [nume, setNume] = useState("");
  const [categorii, setCategorii] = useState("");
  const [locatieGPS, setLocatieGPS] = useState();

  const { insertImage, pickImage } = useContext(ImageContext);
  insertImage();
  const submitData = async (event) => {
    fetch(
      "http://169.254.43.135:5000/incarcadate",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          nume: nume,
          categorii: categorii,
          sigla: sigla,
          locatieGPS: locatieGPS,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputPosition}>
        <TextInput
          placeholder="Nume"
          style={styles.input}
          label="Nume"
          value={nume}
          onChangeText={(text) => setNume(text)}
        ></TextInput>
      </View>

      <View style={styles.inputPosition}>
        <TextInput
          placeholder="Categorii"
          style={styles.input}
          label="Categorii"
          value={categorii}
          onChangeText={(text) => setCategorii(text)}
        ></TextInput>
      </View>

      <View style={styles.inputPosition}>
        <TextInput
          placeholder="Locatie GPS"
          keyboardType="numeric"
          style={styles.input}
          label="Locatie GPS"
          value={locatieGPS}
          onChangeText={(text) => setLocatieGPS(text)}
        ></TextInput>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Alege o imagine" onPress={() => pickImage(setSigla)} />

        <Image source={{ uri: sigla }} style={{ width: 200, height: 200 }} />
      </View>

      <TouchableOpacity onPress={submitData} style={styles.submit}>
        <Text style={{ color: "white" }}>Adauga</Text>
      </TouchableOpacity>
    </View>
  );
};

export default adaugaMagazine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
  },
  input: {
    width: "50%",
    backgroundColor: "white",
    marginLeft: 20,
    height: 30,
    borderRadius: 10,
  },
  inputPosition: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  submit: {
    marginBottom: 50,
    width: 100,
    backgroundColor: "red",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
