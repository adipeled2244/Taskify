import React, { FC, useState, useRef, useEffect } from "react";

import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./SingleTodo.css";
import {Draggable} from 'react-beautiful-dnd'
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index:number;
}
const SingleTodo: FC<Props> = ({ index,todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(todo.todo);  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id != id));
  };


  const handleEdit = (id: number) => {
    // console.log(id,e)
    // e.preventDefault();
    console.log(id);
    setTodos(
      todos.map((t) => (t.id === id ? { ...todo, todo: editContent } : t))
    );
    setEdit(false);
  };

  // focus in the input
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided,snapshot)=>(
          <form className={`todos_single ${snapshot.isDragging? 'drag':" "}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
          {edit ? (
            <input
              value={editContent}
              ref={inputRef}
              onChange={(e) => setEditContent(e.target.value)}
              className="todos_single--text"
            ></input>
          ) : todo.isDone ? (
            <s className="todos_single_text">{todo.todo}</s>
          ) : (
            <span className="todos_single_text">{todo.todo}</span>
          )}
    
          <div className="todos_single_icons">
            <span
              className="icon"
              onClick={() => {
                // && !todo.isDone
                if (!edit) {
                  ///edit==false and noe we go to edit process
                  console.log("adad");
                  setEdit(true);
                } ///edit==true==== edit done
                else {
                  handleEdit(todo.id);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>



        )
      }
    </Draggable>
  );
};

export default SingleTodo;
