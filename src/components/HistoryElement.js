import React from "react";
import { useGlobalContext } from "../context";
import { FiDelete } from "react-icons/fi";

const HistoryElement = ({ income, text, amount, index }) => {
  const { deleteHistoryElement } = useGlobalContext();
  const [isShown, setIsShown] = React.useState(false);

  return (
    <div>
      <li className={`history-el ${income ? "gain" : "spend"}`}>
        <p>{text}</p>
        <p>{amount > 0 ? `+${amount}$` : `${amount}$`}</p>
        <div
          className="btn-delete"
          onMouseOver={() => {
            console.log("mouse over");
            setIsShown(true);
          }}
          onMouseLeave={() => {
            console.log("mouse leave");
            setIsShown(false);
          }}
        >
          <FiDelete
            onClick={() => {
              deleteHistoryElement(index);
            }}
          />
        </div>
      </li>
      {isShown ? <p className="del-el">click to delete this element</p> : <></>}
    </div>
  );
};

export default HistoryElement;
