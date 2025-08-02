import { useStateForPath } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const [toggle, settoggle] = useState(true);
  const [first, setFirst] = useState(0);
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<string[]>(taskList);
  const handleSubmit = () => {
    setFirst(first + 1);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTaskList([...taskList, task]);
      setTask("");
    }
  };

  const handleDeleteTask = (td: string) => {
    setTaskList(taskList.filter((task) => task !== td));
  };

  const handleToggle = () => {
    settoggle(!toggle);
  };

  const handleFilter = (query: string) => {
    const filtered = taskList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredList(filtered);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txt}>Index</Text>
      </View>

      <View style={styles.main}>
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.txt}>Add: {first}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.form}
          placeholder="Type anything"
          placeholderTextColor="gray"
          value={task}
          onChangeText={setTask}
        />

        <TextInput
          style={styles.form}
          placeholder="search anything"
          placeholderTextColor="gray"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity onPress={() => handleFilter(task)} style={styles.btn}>
          <Text style={styles.txt}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddTask} style={styles.btn}>
          <Text style={styles.txt}>Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggle} style={styles.btn}>
          <Text style={toggle ? styles.txt : styles.txt1}>
            Toggle: {toggle.toString()}
          </Text>
        </TouchableOpacity>

        <Text style={styles.output}>Tasks:</Text>

        <ScrollView style={styles.taskScroll}>
          {taskList.map((task, index) => (
            <View key={index} style={styles.taskRow}>
              <Text style={styles.taskItem}>• {task}</Text>
              <TouchableOpacity
                onPress={() => handleDeleteTask(task)}
                style={styles.btn}
              >
                <Text style={styles.txt}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.output}>Filtered:</Text>
          {filteredList.map((task, index) => (
            <View key={index} style={styles.taskRow}>
              <Text style={styles.taskItem}>• {task}</Text>
              <TouchableOpacity
                onPress={() => handleDeleteTask(task)}
                style={styles.btn}
              >
                <Text style={styles.txt}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
    backgroundColor: "#000",
  },
  header: {
    flex: 1,
  },
  main: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#1E90FF",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  txt: {
    color: "white",
    fontSize: 18,
  },
  txt1: {
    color: "black",
    fontSize: 18,
    backgroundColor: "white",
  },
  form: {
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "white",
    marginTop: 20,
  },
  output: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  taskScroll: {
    maxHeight: 750,
    width: "100%",
    marginTop: 10,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 6,
  },
  taskItem: {
    color: "lightgreen",
    fontSize: 16,
  },
});
