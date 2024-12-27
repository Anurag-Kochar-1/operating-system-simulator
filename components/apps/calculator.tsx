import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

type CalculatorState = {
  displayValue: string;
  previousValue: string;
  operation: string | null;
  clearDisplay: boolean;
};

export const CalculatorAppContent = () => {
  const [state, setState] = useState<CalculatorState>({
    displayValue: "0",
    previousValue: "",
    operation: null,
    clearDisplay: false,
  });
  const [error, setError] = useState<string>("");

  const clearError = () => setError("");

  const inputDigit = (digit: string) => {
    clearError();
    const { displayValue, clearDisplay } = state;

    if (clearDisplay) {
      setState({
        ...state,
        displayValue: digit,
        clearDisplay: false,
      });
    } else {
      setState({
        ...state,
        displayValue: displayValue === "0" ? digit : displayValue + digit,
      });
    }
  };

  const inputDecimal = () => {
    clearError();
    const { displayValue, clearDisplay } = state;

    if (clearDisplay) {
      setState({
        ...state,
        displayValue: "0.",
        clearDisplay: false,
      });
    } else if (displayValue.indexOf(".") === -1) {
      setState({
        ...state,
        displayValue: displayValue + ".",
      });
    }
  };

  const clear = () => {
    clearError();
    setState({
      displayValue: "0",
      previousValue: "",
      operation: null,
      clearDisplay: false,
    });
  };

  const handleOperation = (nextOperation: string) => {
    clearError();
    const { displayValue, previousValue, operation } = state;
    const inputValue = parseFloat(displayValue);

    if (previousValue === "") {
      setState({
        displayValue,
        previousValue: displayValue,
        operation: nextOperation,
        clearDisplay: true,
      });
    } else {
      const currentValue = parseFloat(previousValue);
      let newValue: number;

      try {
        switch (operation) {
          case "+":
            newValue = currentValue + inputValue;
            break;
          case "-":
            newValue = currentValue - inputValue;
            break;
          case "*":
            newValue = currentValue * inputValue;
            break;
          case "/":
            if (inputValue === 0) {
              throw new Error("Cannot divide by zero");
            }
            newValue = currentValue / inputValue;
            break;
          default:
            newValue = inputValue;
        }

        setState({
          displayValue: String(newValue),
          previousValue: String(newValue),
          operation: nextOperation,
          clearDisplay: true,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        clear();
      }
    }
  };

  const calculate = () => {
    if (state.operation) {
      handleOperation("=");
    }
  };

  const getOperationSymbol = () => {
    switch (state.operation) {
      case "+":
        return "+";
      case "-":
        return "−";
      case "*":
        return "×";
      case "/":
        return "÷";
      default:
        return "";
    }
  };

  return (
    <Card className="mx-auto w-full overflow-hidden rounded-2xl border-none bg-background">
      <CardContent className="p-2">
        {error && (
          <Alert variant="destructive" className="mb-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-1">
          <div className="h-6 pr-4 text-right text-muted-foreground">
            {state.previousValue &&
              `${state.previousValue} ${getOperationSymbol()}`}
          </div>

          <div className="mb-2 rounded-lg bg-background px-4 py-2">
            <div className="overflow-hidden text-right text-4xl font-light text-foreground">
              {state.displayValue}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1">
            <Button
              variant="secondary"
              className="h-14 bg-zinc-600 text-lg text-white hover:bg-zinc-500"
              onClick={clear}
            >
              AC
            </Button>
            <Button
              variant="secondary"
              className="h-14 bg-zinc-600 text-lg text-white hover:bg-zinc-500"
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  displayValue: String(parseFloat(prev.displayValue) * -1),
                }));
              }}
            >
              +/−
            </Button>
            <Button
              variant="secondary"
              className="h-14 bg-zinc-600 text-lg text-white hover:bg-zinc-500"
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  displayValue: String(parseFloat(prev.displayValue) / 100),
                }));
              }}
            >
              %
            </Button>
            <Button
              variant="secondary"
              className="h-14 bg-orange-500 text-lg text-white hover:bg-orange-400"
              onClick={() => handleOperation("/")}
            >
              ÷
            </Button>

            {/* Number pad and operations */}
            {[7, 8, 9].map((num) => (
              <Button
                key={num}
                variant="secondary"
                className="h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-600"
                onClick={() => inputDigit(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="secondary"
              className="h-14 bg-orange-500 text-lg text-white hover:bg-orange-400"
              onClick={() => handleOperation("*")}
            >
              ×
            </Button>

            {[4, 5, 6].map((num) => (
              <Button
                key={num}
                variant="secondary"
                className="h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-600"
                onClick={() => inputDigit(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="secondary"
              className="h-14 bg-orange-500 text-lg text-white hover:bg-orange-400"
              onClick={() => handleOperation("-")}
            >
              −
            </Button>

            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                variant="secondary"
                className="h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-600"
                onClick={() => inputDigit(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="secondary"
              className="h-14 bg-orange-500 text-lg text-white hover:bg-orange-400"
              onClick={() => handleOperation("+")}
            >
              +
            </Button>

            <Button
              variant="secondary"
              className="col-span-2 h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-600"
              onClick={() => inputDigit("0")}
            >
              0
            </Button>
            <Button
              variant="secondary"
              className="h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-600"
              onClick={inputDecimal}
            >
              .
            </Button>
            <Button
              variant="secondary"
              className="h-14 bg-orange-500 text-lg text-white hover:bg-orange-400"
              onClick={calculate}
            >
              =
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
