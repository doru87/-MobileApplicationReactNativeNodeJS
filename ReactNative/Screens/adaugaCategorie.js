import { Picker } from "@react-native-picker/picker";
import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { ImageContext } from "../context/imageContext";

const adaugaCategorie = () => {
  const [idMagazin, setIdMagazin] = useState();
  const [magazine, setMagazine] = useState([]);

  const [nume, setNume] = useState("");
  const [sigla, setSigla] = useState("");

  React.useEffect(() => {
    const { data } = fetch("http://169.254.43.135:5000/listamagazine")
      .then((response) => response.json())
      .then((response) => setMagazine(response.data));
  }, []);

  console.log(magazine);

  const submitData = () => {
    fetch(
      "http://169.254.43.135:5000/adaugaCategorie",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          nume: nume,
          idMagazin: idMagazin,
          magazine: magazine,
          sigla: sigla,
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

  const { insertImage, pickImage } = useContext(ImageContext);
  insertImage();

  return (
    <View style={styles.container}>
      <View style={styles.oneline}>
        <Picker
          selectedValue={idMagazin}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => {
            setIdMagazin(itemValue);
          }}
        >
          {magazine.map((item) => {
            return (
              <Picker.Item label={item.nume} value={item.id} key={item.id} />
            );
          })}
        </Picker>
      </View>

      <View style={styles.oneline}>
        <TextInput
          placeholder="Nume"
          style={styles.input}
          label="Nume"
          value={nume}
          onChangeText={(text) => setNume(text)}
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
  oneline: {
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

export default adaugaCategorie;
