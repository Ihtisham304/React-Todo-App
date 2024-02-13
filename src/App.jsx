import "./App.css";
import { useContext, useReducer, useState } from "react";
import AddTodo from "./Components/AddTodo";
import ListOFTodo from "./Components/ListOFTodo";
import TodosDispatchContext from "./context/todosDispatchContext";
import ReactSwitch from "react-switch";
import ModeContext from "./context/ModeContext";

function App() {
  const [editT, setEdit] = useState(null);
  const [tktodo, dispatch] = useReducer(todoReducer, []);
  const [mode, setMode] = useState("light");
  function editTodoList(id) {
    setEdit(tktodo.find((todo) => todo.id === id));
  }
  function todoReducer(tktodo, action) {
    switch (action.type) {
      case "ADD":
        return [...tktodo, { ...action.payload, id: tktodo.length + 1 }];
      case "DELETE":
        return tktodo.filter((todo) => todo.id !== action.payload);
      case "UPDATE":
        const index = tktodo.findIndex((t) => t.id === action.payload.id);
        const newTodo = [...tktodo];
        newTodo.splice(index, 1, action.payload);
        setEdit(null);
        return newTodo;
      default:
        return tktodo;
    }
  }

  return (
    <ModeContext.Provider value={mode}>
      <div className={`${mode}`}>
        <h1>Todo App</h1>
        <div className="switch">
          <label>{mode=== 'light'? 'LightMode ':'DarkMode '}</label>
          <ReactSwitch
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            checked={mode === "dark"}
          ></ReactSwitch>
        </div>
        <div className="container">
          <TodosDispatchContext.Provider value={dispatch}>
            <AddTodo editT={editT}></AddTodo>
            {tktodo.map((todo) => (
              <div className="list_con">
                <ListOFTodo
                  key={todo.id}
                  editTodoList={editTodoList}
                  todo={todo.todo}
                  id={todo.id}
                ></ListOFTodo>
              </div>
            ))}
          </TodosDispatchContext.Provider>
        </div>
      </div>
    </ModeContext.Provider>
  );
}

export default App;
