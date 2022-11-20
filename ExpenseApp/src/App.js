import React, { useEffect, useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

const baseUrl = `http://127.0.0.1:3000/api`;

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [dataModified, setDataModified] = useState(false);
  const fetchExpenseHandler = async () => {
    try {
      const response = await fetch(`${baseUrl}/getExpenses`, {
        method: "GET",
      });
      const data = await response.json();
      const modifiedData = data.map((obj) => {
        obj.date = new Date(obj.date);
        obj.key = obj._id;
        return obj;
      });
      console.log(modifiedData);
      setExpenses(modifiedData);
      setDataModified(false);
    } catch (err) {
      alert(err);
    }
  };
  const addExpenseHandler = async (expense) => {
    console.log(expense);

    fetch(`${baseUrl}/createExpense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          throw new Error(data.message);
        }
        console.log(data);
        setDataModified(true);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchExpenseHandler();
  }, [dataModified]);

  if (expenses === "Error") console.log("Failed to fetch data from API");

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} fetchExpenses={fetchExpenseHandler} />
    </div>
  );
};

export default App;
