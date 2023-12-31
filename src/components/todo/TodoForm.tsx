import { useState } from "react";
import { useTodoCategory } from "../../context/TodoCategoryContext";
import { ACTION_TYPE } from "../../lib/types";
import { toast } from "react-toastify";

type Props = {};

const TodoForm = (props: Props) => {
  const { state, dispatch } = useTodoCategory();

  const [input, setInput] = useState("");
  const [categorySelect, setCategorySelect] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategorySelect(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input)
      return toast("Please fill in the input field", { theme: "light" });
    if (!categorySelect)
      return toast("Please select a category, if you have none create one", {
        theme: "light",
      });

    const inputData = {
      id: Math.random(),
      value: input,
      categoryId: +categorySelect,
      isChecked: false,
    };

    dispatch({ type: ACTION_TYPE.ADD_TODO, payload: inputData });

    toast("Successfully added a todo");
    setInput("");
    setCategorySelect("");
  };

  return (
    <form
      onSubmit={handleAddTodo}
      className="grid grid-cols-2 gap-y-5 mb-5 md:basis-11/12 md:mb-0 md:flex"
    >
      <input
        maxLength={25}
        value={input}
        type="text"
        className="pl-4 col-span-2 w-full rounded-md h-12 md:rounded-r-none md:rounded-l-md"
        placeholder="Enter a todo..."
        onChange={handleInputChange}
      />
      <label htmlFor="select" className="visually-hidden">
        Select a category
      </label>
      <select
        onChange={handleCategoryChange}
        id="select"
        value={categorySelect}
        className="h-12 cursor-pointer bg-white/50 px-2 rounded-l-md md:rounded-none"
      >
        <option value="" disabled>
          Category
        </option>
        {state.category.map((category) => (
          <option key={category.id} value={category.id}>
            {category.value}
          </option>
        ))}
      </select>
      <button aria-label="Add todo" type="submit" className="add-button">
        ADD
      </button>
    </form>
  );
};

export default TodoForm;
