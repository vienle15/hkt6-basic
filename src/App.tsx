import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App: React.FC = () => {
  type Task = {
    id: number;
    title: string;
    date: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/notes");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask === "") {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/v1/notes", {
        title: newTask,
        content: "",
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteTask = async (noteId: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/notes/${noteId}`);
      const updatedTasks = tasks.filter((note) => note.id !== noteId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const countChars = (text: string) => {
    return 200 - text.length;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/notes?q=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching tasks:", error);
    }
  };

  return (
    <div className="App">
      <h2>Note keeper</h2>
      <input
        id="search-ip"
        type="text"
        placeholder="search here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the searchQuery state
      />
      <button onClick={handleSearch}>Search</button> <br />
      <div className="card-container">
        {searchResults.length > 0
          ? searchResults.map((task) => (
              <div className="add-task" key={task.id}>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                  value={task.title}
                  readOnly={true}
                ></textarea>
                <div className="footer">
                  <div className="dates">{task.date}</div>
                  <button
                    className="btn-del"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : tasks.map((task) => (
              <div className="add-task" key={task.id}>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                  value={task.title}
                  readOnly={true}
                ></textarea>
                <div className="footer">
                  <div className="dates">{task.date}</div>
                  <button
                    className="btn-del"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        <div className="add-task">
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="input review"
            maxLength={200}
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          ></textarea>
          <div className="footer">
            <div className="dates">Characters left: {countChars(newTask)}</div>
            <button className="btn-add" onClick={addTask}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
