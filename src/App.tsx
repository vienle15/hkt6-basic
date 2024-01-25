import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  type Task = {
    id: number;
    title: string;
    date: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search query
  const [searchResults, setSearchResults] = useState<Task[]>([]);

  const addTask = () => {
    if (newTask === "") {
      return;
    }

    const addToTask: Task = {
      id: Date.now(),
      title: newTask,
      date: new Date().toLocaleDateString(),
    };

    setTasks([...tasks, addToTask]);
    setNewTask(""); // Clear the input field after adding a task
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const countChars = (text: string) => {
    return 200 - text.length;
  };

  // Function to handle search
  const handleSearch = () => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredTasks);
  };

  return (
    <div className="App">
      <h2>REVIEW APP</h2>
      <input
        id="search-ip"
        type="text"
        placeholder="search here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the searchQuery state
      />
      <button onClick={handleSearch}>Search</button>{" "}
      {/* Button to trigger the search */}
      <br />
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
