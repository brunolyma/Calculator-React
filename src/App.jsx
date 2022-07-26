import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [reset, setReset] = useState(false);

  const ops = ["/", "*", "+", "-", "."];
  console.log(calc);

  const updateCalc = (value) => {
    console.log(value);
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      console.log(ops.includes(value) && calc === "");
      console.log(ops.includes(value) && ops.includes(calc.slice(-1)));

      return;
    }
    setReset(false);
    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const calculate = () => {
    setReset(true);
    return setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (reset) {
      return [setResult(""), setCalc(""), setReset(false)];
    } else {
      setResult("");
    }

    const value = calc.slice(0, -1);
    setCalc(value);
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 0; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>
      );
    }

    return digits;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""} {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={deleteLast}>{reset ? "C" : "DEL"}</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
