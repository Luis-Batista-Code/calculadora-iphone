import React, { useState } from "react";
import "./calculator.css";

const buttons = [
  { label: "C", type: "special" },
  { label: "+/-", type: "special" },
  { label: "%", type: "special" },
  { label: "÷", type: "operator" },

  { label: "7", type: "number" },
  { label: "8", type: "number" },
  { label: "9", type: "number" },
  { label: "×", type: "operator" },

  { label: "4", type: "number" },
  { label: "5", type: "number" },
  { label: "6", type: "number" },
  { label: "-", type: "operator" },

  { label: "1", type: "number" },
  { label: "2", type: "number" },
  { label: "3", type: "number" },
  { label: "+", type: "operator" },

  { label: "0", type: "number", isZero: true },
  { label: ".", type: "number" },
  { label: "=", type: "operator" },
];

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");

  const handleClick = (label: string) => {
    if (label === "C") {
      setDisplay("0");
      return;
    }
  
    if (label === "+/-") {
      if (display.startsWith("-")) {
        setDisplay(display.slice(1));
      } else {
        setDisplay("-" + display);
      }
      return;
    }
  
    if (label === "%") {
      try {
        const num = eval(display.replace(/×/g, "*").replace(/÷/g, "/"));
        const percentage = num / 100;
        setDisplay(percentage.toFixed(2));
      } catch {
        setDisplay("Erro");
      }
      return;
    }
  
    if (label === "=") {
      try {
        const expression = display.replace(/×/g, "*").replace(/÷/g, "/");
        const result = eval(expression);
  
        if (typeof result === "number") {
          // Limita a 2 casas decimais se for número decimal
          const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(2);
          setDisplay(formatted);
        } else {
          setDisplay(result.toString());
        }
      } catch {
        setDisplay("Erro");
      }
      return;
    }
  
    if (display === "0" && label !== ".") {
      setDisplay(label);
    } else {
      setDisplay(display + label);
    }
  };
  
  return (
    <div className="calculator">
      <div className="screen">
        <div className="display">{display}</div>
        <div className="buttons">
          {buttons.map(({ label, type, isZero }) => (
            <button
              key={label}
              className={`button ${type} ${isZero ? "zero" : ""}`}
              onClick={() => handleClick(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
