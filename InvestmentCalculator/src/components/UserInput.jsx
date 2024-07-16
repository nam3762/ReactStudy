import { useState } from "react";

export default function UserInput({ values, onChangeValues }) {
  const [inputValues, setInputValues] = useState(values);

  // inputValues는 객체임
  // event.target.value는 int임
  // 따라서, 이를 객체로 변환해서 저장해줘야함

  function handleChange(event) {
    const { name, value } = event.target;

    if (parseFloat(value) < 0) return alert("Cannot enter number less than 0");

    setInputValues((prevValues) => {
      let currentValues = { ...prevValues, [name]: parseFloat(value) };
      onChangeValues(currentValues);
      return currentValues;
    });
  }

  return (
    <div id="user-input">
      <div className="input-group">
        <label for="initialInvestment">
          INITIAL INVESTMENT
          <input
            type="number"
            name="initialInvestment"
            value={inputValues.initialInvestment}
            required
            onChange={handleChange}
          ></input>
        </label>
        <label for="annualInvestment">
          ANNUAL INVESTMENT
          <input
            type="number"
            name="annualInvestment"
            value={inputValues.annualInvestment}
            required
            onChange={handleChange}
          ></input>
        </label>
        <label for="expectedReturn">
          EXPECTED RETURN
          <input
            type="number"
            name="expectedReturn"
            value={inputValues.expectedReturn}
            required
            onChange={handleChange}
          ></input>
        </label>
        <label for="duration">
          DURATION
          <input
            type="number"
            name="duration"
            value={inputValues.duration}
            required
            onChange={handleChange}
          ></input>
        </label>
      </div>
    </div>
  );
}
