import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const SearchProduct = ({ navigation }) => {
  const [numeMeniu, setNumeMeniu] = useState("");
  const submitData = () => {
    navigation.navigate("Home", { numeMeniu });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
          Cauta in lista de meniuri
        </Text>
      </View>
      <View style={styles.inputPosition}>
        <TextInput
          placeholder="Nume"
          style={styles.input}
          label="Nume"
          value={numeMeniu}
          onChangeText={(text) => setNumeMeniu(text)}
        ></TextInput>
      </View>

      <TouchableOpacity onPress={submitData} style={styles.submit}>
        <Text style={{ color: "white" }}>Cauta meniu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  input: {
    width: "50%",
    backgroundColor: "white",
    marginLeft: 20,
    height: 40,
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
    marginTop: 50,
    width: 100,
    backgroundColor: "#242624",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default SearchProduct;
