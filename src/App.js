
import React, { useState, useEffect } from "react";
import "./App.css";
import toast from 'react-hot-toast';

const App = () => {
  const [tab, setTab] = useState(1);

  const [todoItem, setTodoItem] = useState();
  const [editItem, setEditItem] = useState(null);

  const getItemsSaved = () => {
    const savedItem = JSON.parse(localStorage.getItem("items")) || [];
    return savedItem;
  };
  const getInProgressItemsSaved = () => {
    const inProSavedItem =
      JSON.parse(localStorage.getItem("inProgressItems")) || [];
    return inProSavedItem;
  };
  const getcompletedItemsSaved = () => {
    const inProSavedItem =
      JSON.parse(localStorage.getItem("completedItems")) || [];
    return inProSavedItem;
  };

  const [data, setData] = useState(getItemsSaved());
  const [inprogress, setInprogress] = useState(getInProgressItemsSaved());
  const [completed, setCompleted] = useState(getcompletedItemsSaved());
  const [toogleBtn, setToogleBtn] = useState(true);

  const tabList = {
    tabListTodo: 1,
    tabListInprogress: 2,
    tabListComplete: 3,
  };

  const addItems = () => {
    const item = {
      id: Math.random(),
      name: todoItem,
    };
    const addData = [...data];
    setData(addData);
    addData.push(item);
    toast.success('Item SuccessFully Added!')
    setTodoItem("");
  };

  const deleteItem = (id) => {
    const deleteTodo = data.filter((val) => val.id !== id);
    const deleteInProgress = inprogress.filter((val) => val.id !== id);
    const deleteComplete = completed.filter((val) => val.id !== id);
    setData(deleteTodo);
    setInprogress(deleteInProgress);
    setCompleted(deleteComplete);
    toast.success('Item SuccessFully Deleted!')
  };

  const UpdateItem = (id) => {
    const updateTodo = data.find((val) => val.id === id);
    const updateInput = prompt("Update Your Todo", updateTodo.name);
    setData(
      data.map((val) => {
        if (val.id === id) {
          return { ...val, name: updateInput };
        }
        return val;
      })
    );
    setEditItem(id);
    toast.success('Item SuccessFully Updated!')
  };

  const InProgressItem = (id) => {
    const swapToProgress = data.filter((val) => val.id !== id);
    setData(swapToProgress);
    const progessItem = data.find((val) => val.id === id);
    const proItem = [...inprogress];
    setInprogress(proItem);
    proItem.push(progessItem);
    toast.success('Item SuccessFully Added to InProgress!')
    console.log("proItem==>>", proItem);
    // alert(id);
  };

  const completedItem = (id) => {
    const swapToComplete = data.filter((val) => val.id !== id);
    setData(swapToComplete);
    const completeItem = data.find((val) => val.id === id);
    const compItem = [...completed];
    setCompleted(compItem);
    compItem.push(completeItem);
    toast.success('Item SuccessFully Completed!')
  };

  const progressCompletedItem = (id) => {
    const removeItem = inprogress.filter((val) => val.id !== id);
    setInprogress(removeItem);
    const addToCompleteItem = inprogress.find((val) => val.id === id);
    // setCompleted(addToCompleteItem);
    console.log(addToCompleteItem);
    console.log("completed", completed)
    completed.push(addToCompleteItem)
  }

  const deleteAll = () => {
    setData([]);
    toast.success('All Items SuccessFully Deleted!')
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(data));
    localStorage.setItem("inProgressItems", JSON.stringify(inprogress));
    localStorage.setItem("completedItems", JSON.stringify(completed));
  }, [data, inprogress]);

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div >
        <input
          value={todoItem}
          placeholder="Add Items..."
          type="text"
          className="input"
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <button className="btn_add" onClick={addItems}>
          {toogleBtn ? "Add item" : "Edit item"}
        </button>
      </div>

      <div className="btns">
        <button className="btn" onClick={() => setTab(tabList.tabListTodo)}>Todo</button>
        <button className="btn" onClick={() => setTab(tabList.tabListInprogress)}>
          InProgress
        </button>
        <button className="btn" onClick={() => setTab(tabList.tabListComplete)}>
          Completed
        </button>
      </div>
      <div>
        {tabList.tabListTodo === tab && (
          <>
            <div>
              {data.map((val) => {
                return (
                  <div key={val.id}>
                    <p>{val.name}</p>
                    <div className="listBtns">
                    <button className="btn" onClick={() => deleteItem(val.id)}>Delete</button>
                    <button className="btn" onClick={() => UpdateItem(val.id)}>Update</button>
                    <button className="btn" onClick={() => InProgressItem(val.id)}>
                      InProgress
                    </button>
                    <button className="btn" onClick={() => completedItem(val.id)}>
                      Completed
                    </button>
                    </div>
                  </div>
                );
              })}
              <button className="delete_btn"  onClick={deleteAll}>Delete All</button>
            </div>
          </>
        )}
      </div>
      <div>
        {tabList.tabListInprogress === tab && (
          <>
            {inprogress.map((val) => {
              return (
                <>
                  <div key={val.id}>
                    <p>{val.name}</p>
                   <div className="listBtns">
                   <button className="btn" onClick={() => deleteItem(val.id)}>Delete</button>
                    <button className="btn" onClick={() => progressCompletedItem(val.id)}>
                      Completed
                    </button>
                   </div>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
      <div>
        {tabList.tabListComplete === tab && (
          <>
            {completed.map((val) => {
              return (
                <>
                  <div key={val.id}>
                    <p>{val.name}</p>
                    <button className="btn" onClick={() => deleteItem(val.id)}>Delete</button>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
