import React from "react";
import { useGlobalContext } from "../context";
import HistoryElement from "./HistoryElement";

const History = () => {
  const { state, clearHistory } = useGlobalContext();

  return (
    <section className="history-container">
      {state.items.length ? (
        <h2>History</h2>
      ) : (
        <h2>No transactions, please add one</h2>
      )}
      {state.items.map((item) => {
        return <HistoryElement key={item.index} {...item} />;
      })}
      {state.items.length ? (
        <button className="btn btn-red" onClick={clearHistory}>
          Clear history
        </button>
      ) : (
        <></>
      )}
    </section>
  );
};

export default History;
