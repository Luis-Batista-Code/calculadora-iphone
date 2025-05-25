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
      // Troca o sinal do número no display
      if (display.startsWith("-")) {
        setDisplay(display.slice(1));
      } else {
        setDisplay("-" + display);
      }
      return;
    }

    if (label === "%") {
      // Calcula porcentagem do número atual
      try {
        const num = eval(display.replace(/×/g, "*").replace(/÷/g, "/"));
        setDisplay((num / 100).toString());
      } catch {
        setDisplay("Erro");
      }
      return;
    }

    if (label === "=") {
      // Quando clicar igual, calcula a expressão
      try {
        const expression = display.replace(/×/g, "*").replace(/÷/g, "/");
        // Usar eval com cuidado! Aqui é só exemplo simples.
        const result = eval(expression);
        setDisplay(result.toString());
      } catch {
        setDisplay("Erro");
      }
      return;
    }

    // Se display é zero e não clicou em ponto, substitui o zero
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
