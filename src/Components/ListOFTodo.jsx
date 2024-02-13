import React, { useContext } from "react";
import TodosDispatchContext from "../context/todosDispatchContext";
import "./ListTodo.css";
import ModeContext from "../context/ModeContext";

function ListOFTodo({ todo, editTodoList, id }) {
  const dispatch = useContext(TodosDispatchContext);
  const mode = useContext(ModeContext);
  return (
    <ol>
      <li>
        {todo}{" "}
        <span>
          <button  onClick={() => editTodoList(id)}><i class="fas fa-edit"></i></button>
          <button  onClick={() => dispatch({ type: "DELETE", payload: id })}>
          <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </span>
      </li>
    </ol>
  );
}

export default ListOFTodo;
