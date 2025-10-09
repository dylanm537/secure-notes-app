import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
const API_URL = "http://192.168.40.181:8000";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");

  const login = async () => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch(`${API_URL}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.access_token);
      alert("Login successful!");
      fetchNotes(data.access_token);
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert("Login failed: " + (errorData.detail || "Unknown error"));
    }
  } catch (err: any) {
    alert("Network error: " + err.message);
  }
};


  const fetchNotes = async (authToken: string) => {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (response.ok) {
        setNotes(data.notes);
      } else {
        Alert.alert("Error fetching notes", data.detail || "Unknown error");
      }
    } catch (err: any) {
      Alert.alert("Network error", err.message);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;

    try {
      const response = await fetch(`${API_URL}/notes?note=${encodeURIComponent(newNote)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        Alert.alert("Note added!");
        setNewNote("");
        fetchNotes(token!);
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Error adding note", errorData.detail || "Unknown error");
      }
    } catch (err: any) {
      Alert.alert("Network error", err.message);
    }
  };

  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Secure Notes Login</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={login} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Notes</Text>
      <TextInput
        placeholder="Type a new note"
        style={styles.input}
        value={newNote}
        onChangeText={setNewNote}
      />
      <Button title="Add Note" onPress={addNote} />
      <View style={styles.notesContainer}>
        {notes.map((note, idx) => (
          <Text key={idx} style={styles.noteItem}>• {note}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  notesContainer: {
    width: "100%",
    marginTop: 20,
  },
  noteItem: {
    fontSize: 15,
    marginBottom: 9,
  },
});
