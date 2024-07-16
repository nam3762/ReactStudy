import { formatter } from "../util/investment";

export default function UserOutput({ calculatedResult }) {
  return (
    <div id="result">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest(Year)</th>
            <th>Total interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {calculatedResult.map((result, index) => (
            <tr key={index}>
              <td>{result.year}</td>
              <td>{formatter.format(result.valueEndOfYear)}</td>
              <td>{formatter.format(result.annualInvestment)}</td>
              <td>{formatter.format(result.interest)}</td>
              <td>
                {formatter.format(result.valueEndOfYear - result.interest)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
