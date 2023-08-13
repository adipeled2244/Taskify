import React, { useState } from "react";
 import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText) {
      setTodos([
        ...todos,
        { id: Date.now(), todo: newTodoText, isDone: false },
      ]);
      setNewTodoText("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let todoChangePlace;
    let activeList = todos;
    let completeList = completedTodos;

    // source Logic
    if (source.droppableId === "TodosList") {
      //copy element
      todoChangePlace = activeList[source.index];
      activeList.splice(source.index, 1);
    } else {
      todoChangePlace = completeList[source.index];
      completeList.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      //paste elemmt
      activeList.splice(destination.index, 0, todoChangePlace);
    } else {
      completeList.splice(destination.index, 0, todoChangePlace);
    }
    setCompletedTodos(completeList);
    setTodos(activeList);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <header>Taskify</header>
        <InputField
          newTodoText={newTodoText}
          setNewTodoText={setNewTodoText}
          handleAdd={handleAdd}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
