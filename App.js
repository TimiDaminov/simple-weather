import { StyleSheet, Text, View, TextInput } from "react-native";
import { getData } from "./utils/fetchData";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import useDebounce from "./hooks/useDebounce";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  let [fontsLoaded] = useFonts({
    "ChesterSans-Bold": require("./assets/fonts/ChesterSans-Bold.ttf"),
  });

  const [weather, setWeather] = useState({ temperature: 0, description: "" });
  const [cityName, setCityName] = useState("Riga");
  const [displayedCity, setDisplayedCity] = useState("");
  const debouncedSearch = useDebounce(cityName, 1000);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
    !!debouncedSearch &&
      getData(debouncedSearch)
        .then((data) => {
          setWeather({
            temperature: Math.round(data.main.temp - 273.15),
            description: data.weather[0].description,
          });
          setDisplayedCity(data.name);
          console.log(data);
        })
        .catch((err) => err);
  }, [debouncedSearch]);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.weatherDescriptionContainer}>
        <View style={styles.textInput}>
          <TextInput
            value={cityName}
            onChangeText={(newText) => setCityName(newText)}
            style={{ borderWidth: 0 }}
          />
        </View>
        <Text style={styles.cityName}>{displayedCity}</Text>
        <Text style={styles.weatherDescription}>{weather.temperature} °C</Text>
        <Text style={styles.weatherDescription}>{weather.description}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with love by Timi ❤️</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDescriptionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 50,
    padding: 15,
    width: 350,
    borderWidth: 2,
    borderColor: "coral",
    marginBottom: 60,
    borderStyle: "solid",
    borderRadius: 30,
  },
  cityName: {
    fontFamily: "ChesterSans-Bold",
    fontSize: 72,
  },
  weatherDescription: {
    fontFamily: "ChesterSans-Bold",
    fontSize: 36,
  },
  footer: {
    position: "absolute",
    bottom: 0,
  },
  footerText: {
    fontFamily: "ChesterSans-Bold",
    fontSize: 24,
  },
});
