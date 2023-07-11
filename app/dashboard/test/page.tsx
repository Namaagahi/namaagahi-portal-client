"use client"
import React, { useState } from "react";

const Test = () => {
  const [textbox1Value, setTextbox1Value] = useState("");

  function handleTextbox1Change(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(event.target.value.replace(/,/g, '')); // remove commas from input value
    const formattedValue = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(newValue);
    setTextbox1Value(formattedValue);
  }

  function convertToNumber(value: string): number | null {
    const cleanedValue = value.replace(/,/g, ''); // remove commas from input value
    const parsedValue = Number(cleanedValue);

    if (isNaN(parsedValue)) {
      return null; // return null if the value is not a valid number
    }

    return parsedValue;
  }

  function handleSubmit() {
    const numberValue = convertToNumber(textbox1Value);
    if (numberValue !== null) {
      // send numberValue to server
      console.log("Number value:", numberValue);
    } else {
      // handle error: textbox1Value is not a valid number
      console.log("Error: Invalid number value");
    }
  }

  return (
    <div>
      <h1>ماشین حساب</h1>
      <div className="w-1/4 h-1/4">
        <input className="form-input" type="text" value={textbox1Value} onChange={handleTextbox1Change} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Test