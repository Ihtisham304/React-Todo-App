import React, { useContext, useEffect, useState } from "react";
import TodosDispatchContext from "../context/todosDispatchContext";
import "./AddTodo.css";
import ModeContext from "../context/ModeContext";

const initState = {
  id: 0,
  todo: "",
};

function AddTodo({ editT }) {
  const [todo, setTodo] = useState(initState);
  const dispatch = useContext(TodosDispatchContext);
  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (editT) {
      setTodo(editT);
    }
  }, [editT]);
  const handleAdd = (e) => {
    e.preventDefault();
    if (editT) {
      dispatch({ type: "UPDATE", payload: todo });
      setTodo(initState);
    } else {
      dispatch({ type: "ADD", payload: todo });
      setTodo(initState);
    }
  };
  const mode = useContext(ModeContext);
  return (
    <div className="formCon">
      <div className="formd">
        <form>
          <div className="input">
            <input className={`${mode}`}
              type="text"
              name="todo"
              onChange={handleChange}
              placeholder="Enter To Do"
              value={todo.todo}
              required
            />
          </div>
          <div className="btn">
            <button className={`${mode}`} onClick={handleAdd}>
              {editT ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
