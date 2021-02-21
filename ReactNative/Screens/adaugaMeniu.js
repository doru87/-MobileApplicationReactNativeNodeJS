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

const adaugaMeniu = () => {
  const [idMagazin, setIdMagazin] = useState(6);
  const [idCategorie, setIdCategorie] = useState();
  const [magazine, setMagazine] = useState([]);
  const [categorii, setCategorii] = useState([]);
  const [nume, setNume] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [imagine, setImagine] = useState("");

  React.useEffect(() => {
    fetch("http://169.254.43.135:5000/listamagazine")
      .then((response) => response.json())
      .then((response) => setMagazine(response.data));
  }, []);

  React.useEffect(() => {
    const encodedValue = encodeURIComponent(idMagazin);
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
      .then((response) => setCategorii(response.data));
  }, [idMagazin]);

  const submitData = () => {
    fetch(
      "http://169.254.43.135:5000/adaugaMeniu",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          idMagazin: idMagazin,
          idCategorie: idCategorie,
          nume: nume,
          descriere: descriere,
          pret: pret,
          imagine: imagine,
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
      <View style={styles.inputPosition}>
        <Picker
          selectedValue={idMagazin}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setIdMagazin(itemValue)}
        >
          {magazine.map((item) => {
            return <Picker.Item label={item.nume} value={item.id} />;
          })}
        </Picker>
      </View>

      <View style={styles.inputPosition}>
        <Picker
          selectedValue={idCategorie}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setIdCategorie(itemValue)}
        >
          {categorii.map((item) => {
            return (
              <Picker.Item
                label={item.nume_categorie}
                value={item.id_categorie}
              />
            );
          })}
        </Picker>
      </View>

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
          placeholder="Descriere"
          style={styles.input}
          label="Descriere"
          value={descriere}
          multiline={true}
          editable
          numberOfLines={4}
          onChangeText={(text) => setDescriere(text)}
        ></TextInput>
      </View>

      <View style={styles.inputPosition}>
        <TextInput
          placeholder="Pret"
          style={styles.input}
          label="Pret"
          value={pret}
          multiline={true}
          onChangeText={(text) => setPret(text)}
        ></TextInput>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Alege o imagine" onPress={() => pickImage(setImagine)} />
        <Image source={{ uri: imagine }} style={{ width: 200, height: 200 }} />
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

export default adaugaMeniu;
