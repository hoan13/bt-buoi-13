import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View,Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ttDangNhap, setTTDangNhap] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Đăng nhập: </Text>
      <View style={styles.v1}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setUsername(text)}
          placeholder="Nhập username"
          value={username}
        />

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          placeholder="Nhập password"
          value={password}
        />
      </View>
      <View style={styles.btn}>
        <View style={{ marginRight: 100 }}>
          <Button
            title="Luu thong tin"
            onPress={async () => {
              if (username === "" || password === "") {
                Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
                console.log("đa vào đây rồi nè");
                return;
              }

              try {
                const jsonValue = JSON.stringify({ username, password });
                await AsyncStorage.setItem("dangnhap", jsonValue);

                Toast.show({
                  type: "success",
                  position: "top",
                  text1: "Thông báo:",
                  text2: "Đã lưu",
                });
                console.log("Da luu");

                // Set text of TextInput to empty
                setUsername("");
                setPassword("");
              } catch (e) {
                // saving error
                console.log(e);
              }
            }}
          />
        </View>

        <Button
          title="Lay thong tin"
          onPress={async () => {
            try {
              const jsonValue = await AsyncStorage.getItem("dangnhap");

              let tt = JSON.parse(jsonValue);
              setTTDangNhap(tt.username + " - " + tt.password);
            } catch (e) {
              // error reading value
            }
          }}
        />
        <StatusBar style="auto" />
      </View>
      <View>
        <Text style={{ alignSelf: "center", fontSize: 30 }}>Thông tin :</Text>
        <Text >{ttDangNhap}</Text>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  v1: {
    position: "relative",
    marginHorizontal: 30,
    width: "85%",
    padding: 10,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
