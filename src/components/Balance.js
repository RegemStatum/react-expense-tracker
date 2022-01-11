import React from "react";
import { useGlobalContext } from "../context";

const Balance = () => {
  const { state } = useGlobalContext();

  return (
    <section className="balance-container">
      <h3>Your Balance</h3>
      <p className="balance">{state.balance}$</p>
      <div className="income-expense-container">
        <div className="income">
          <p>income</p>
          <p>+{state.totalIncome}$</p>
        </div>
        <div className="expense">
          <p>expense</p>
          <p>{state.totalExpense}$</p>
        </div>
      </div>
    </section>
  );
};

export default Balance;
