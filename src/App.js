import Balance from "./components/Balance";
import History from "./components/History";
import Transaction from "./components/Transaction";

function App() {
  return (
    <main className="main-container">
      <h2>Expense Tracker</h2>
      <Balance />
      <History />
      <Transaction />
    </main>
  );
}

export default App;
