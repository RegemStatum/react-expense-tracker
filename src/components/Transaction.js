import React from "react";
import { useGlobalContext } from "../context";

const Transaction = () => {
  const { handleSubmit, textContainer, amountContainer } = useGlobalContext();

  return (
    <section className="transaction-container">
      <h2>Transaction</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="transaction-form">
        <label htmlFor="text">Text</label>
        <input
          type="text"
          ref={textContainer}
          required
          placeholder="Enter text..."
        />
        <label htmlFor="text">Amount</label>
        <p>(negative - expense, positive - income)</p>
        <input
          type="number"
          ref={amountContainer}
          required
          placeholder="Enter amount..."
        />
        <button className="btn red-btn" type="submit">
          Add transaction
        </button>
      </form>
    </section>
  );
};

export default Transaction;
