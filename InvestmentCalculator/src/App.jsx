import { useState } from "react";
import { calculateInvestmentResults } from "./util/investment";
import UserInput from "./components/UserInput";
import UserOutput from "./components/UserOutput";

const INITIAL_VALUES = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0,
};

const CALCULATED_VALUES = [
  {
    year: 0,
    interest: 0,
    valueEndOfYear: 0,
    annualInvestment: 0,
  },
];

function App() {
  const [calculatedValues, setCalculatedValues] = useState(CALCULATED_VALUES);

  function handleCalculatedValues(userValues) {
    setCalculatedValues(() => calculateInvestmentResults(userValues));
  }

  console.log(calculatedValues);

  return (
    <main>
      <UserInput
        values={INITIAL_VALUES}
        onChangeValues={handleCalculatedValues}
      />
      <UserOutput calculatedResult={calculatedValues} />
    </main>
  );
}

export default App;
