import React, { FC, useRef } from "react";
import "./inputField.css";

interface Props {
  newTodoText: string;
  setNewTodoText: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
const InputField: FC<Props> = ({ newTodoText, setNewTodoText, handleAdd }) => {
  const handleChange = (task: string) => {
    setNewTodoText(task);
  };

  return (
    <form onSubmit={(e)=>{
        handleAdd(e);
    }}>
      <input
        type="input"
        placeholder="Enter a task"
        className="input_box"
        value={newTodoText}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
