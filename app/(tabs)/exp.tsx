import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const WeatherScreen = () => {
  const [city, setCity] = useState('thane');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'HQTRQX5ZJUFGZWMSCYA8V2X8W';

  const fetchData = async (city: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${API_KEY}&contentType=json`
      );
      const json = await response.json();
      setWeather(json);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(city); // Initial fetch for default city
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.btn} onPress={() => fetchData(city)}>
        <Text style={styles.btnText}>Fetch Weather</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" style={{ marginTop: 20 }} />
      ) : weather ? (
        <View style={styles.weatherBox}>
          <Text style={styles.title}>📍 {weather.resolvedAddress}</Text>
          <Text style={styles.info}>📅 Date: {weather.days[0].datetime}</Text>
          <Text style={styles.info}>🌡 Temp: {weather.days[0].temp}°F</Text>
          <Text style={styles.info}>🤒 Feels Like: {weather.days[0].feelslike}°F</Text>
          <Text style={styles.info}>💧 Humidity: {weather.days[0].humidity}%</Text>
          <Text style={styles.info}>🌤️ Conditions: {weather.days[0].conditions}</Text>
          <Text style={styles.info}>🌬️ Wind Speed: {weather.days[0].windspeed} mph</Text>
          <Text style={styles.info}>☁️ Cloud Cover: {weather.days[0].cloudcover}%</Text>
          <Text style={styles.info}>🌅 Sunrise: {weather.days[0].sunrise}</Text>
          <Text style={styles.info}>🌇 Sunset: {weather.days[0].sunset}</Text>

          <Text style={styles.title}>🕐 Hourly Forecast (Next 6 hrs)</Text>
          {weather.days[0].hours.slice(0, 6).map((hour: any, index: number) => (
            <Text key={index} style={styles.info}>
              🕒 {hour.datetime} | 🌡 {hour.temp}°F | 💧 {hour.humidity}% | 🌧 {hour.conditions}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={[styles.text, { color: 'red', marginTop: 20 }]}>No data found.</Text>
      )}
    </ScrollView>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#1e1e1e',
    marginBottom: 15,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#1E90FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherBox: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
