import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const TimerScreen = () => {
  const [time, setTime] = useState(0);
  const [ttime, setTTime] = useState(6);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null |number>(null);
  const countdownRef = useRef<NodeJS.Timeout | null|number>(null);
  const [city, setCity] = useState('chennai');
  const fetchData=async()=>{
      try{
          const response= await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=HQTRQX5ZJUFGZWMSCYA8V2X8W&contentType=json`);
          const json=await response.json();
          console.log(json.days[0].temp);
      }
      catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setloading(false);
    }
  }
  const handleStartTimer = () => {
    if (timerRef.current) return; // Prevent multiple intervals
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const handleStartCountdown = () => {
    if (countdownRef.current) return;
    countdownRef.current = setInterval(() => {
      setTTime(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          countdownRef.current = null;
          Alert.alert('Time is up!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Stopwatch Timer: {time}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleStartTimer}>
        <Text style={styles.txt}>Start Timer</Text>
      </TouchableOpacity>

      <Text style={styles.txt}>Countdown Timer: {ttime}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleStartCountdown}>
        <Text style={styles.txt}>Start Countdown</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn1}
        onPress={() => setTTime(prev => prev + 1)}>
        <Text style={styles.txt}>Add Time</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={fetchData}>
        <Text style={styles.txt}>FetchData</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#1E90FF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btn1: {
    backgroundColor: 'green',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});
