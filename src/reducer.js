const reducer = (state, action) => {
  if (action.type === "FORM_SUBMIT") {
    const { text, amount } = action.payload;
    if (amount === "0") {
      return {
        ...state,
      };
    } else {
      let newState = {
        ...state,
        item: {
          ...state.item,
          text,
          amount: +amount,
          index: new Date().getTime().toString(),
        },
      };

      if (amount > 0) {
        newState.item.income = true;
        newState.totalIncome = newState.totalIncome + parseInt(amount);
      } else {
        newState.item.income = false;
        newState.totalExpense = newState.totalExpense + parseInt(amount);
      }

      newState.items = [...state.items, newState.item];
      newState.balance = newState.totalIncome + newState.totalExpense;
      return newState;
    }
  }
  if (action.type === "CLEAR_HISTORY") {
    return {
      ...state,
      item: {
        income: true,
        text: "",
        amount: 0,
        index: null,
      },
      items: [],
      totalExpense: 0,
      totalIncome: 0,
      balance: 0,
    };
  }
  if (action.type === "DELETE_HISTORY_ELEMENT") {
    const newItems = state.items.filter(
      (item) => item.index !== action.payload
    );
    let newBalance = state.balance;
    let newTotalIncome = state.totalIncome;
    let newTotalExpense = state.totalExpense;
    const deleteItemIndex = state.items.findIndex(
      (item) => item.index === action.payload
    );

    // console.log("action.payload : ", action.payload);
    // console.log("item to delete : ", state.items[deleteItemIndex]);
    // console.log("isIncome : ", state.items[deleteItemIndex].income);

    if (state.items[deleteItemIndex].income) {
      newTotalIncome = state.items.reduce((totalIncome, item) => {
        if (item.index !== action.payload && item.income) {
          return (totalIncome += item.amount);
        } else {
          return (totalIncome += 0);
        }
      }, 0);
      // console.log("newTotalIncome : ", newTotalIncome);
      newBalance = newTotalIncome + state.totalExpense;
      // console.log("newBalance : ", newBalance);
    } else {
      newTotalExpense = state.items.reduce((totalExpense, item) => {
        if (item.index !== action.payload && !item.income) {
          return (totalExpense += item.amount);
        } else {
          return (totalExpense += 0);
        }
      }, 0);
      newBalance = state.totalIncome + newTotalExpense;
    }

    return {
      ...state,
      items: newItems,
      totalExpense: newTotalExpense,
      totalIncome: newTotalIncome,
      balance: newBalance,
    };
  }

  throw new Error("no such action type");
};

export default reducer;
