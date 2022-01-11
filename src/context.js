import React, { useContext, useReducer, useRef, useEffect } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const getLocalStorage = () => {
  let expenseInfo = localStorage.getItem("expense_info");
  if (expenseInfo) {
    return JSON.parse(expenseInfo);
  } else {
    return { items: [], totalExpense: 0, totalIncome: 0, balance: 0 };
  }
};

const defaultState = {
  item: {
    income: true,
    text: "",
    amount: 0,
    index: null,
  },
  items: getLocalStorage().items,
  totalExpense: getLocalStorage().totalExpense,
  totalIncome: getLocalStorage().totalIncome,
  balance: getLocalStorage().balance,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const textContainer = useRef();
  const amountContainer = useRef();

  useEffect(() => {
    const obj = {
      items: state.items,
      totalExpense: state.totalExpense,
      totalIncome: state.totalIncome,
      balance: state.balance,
    };
    localStorage.setItem("expense_info", JSON.stringify(obj));
  }, [state.items, state.totalIncome, state.totalExpense, state.balance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let text = textContainer.current.value;
    let amount = amountContainer.current.value;
    dispatch({ type: "FORM_SUBMIT", payload: { text, amount } });

    textContainer.current.value = null;
    amountContainer.current.value = null;
  };

  const deleteHistoryElement = (id) => {
    dispatch({ type: "DELETE_HISTORY_ELEMENT", payload: id });
  };

  const clearHistory = () => {
    dispatch({ type: "CLEAR_HISTORY" });
  };

  return (
    <AppContext.Provider
      value={{
        handleSubmit,
        clearHistory,
        deleteHistoryElement,
        textContainer,
        amountContainer,
        state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// my custom context hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};
