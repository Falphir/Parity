import * as z from "zod"

const RateSchema = z.object({
  date: z.string(),
  base: z.string(),
  quote: z.string(),
  rate: z.number()
});

export default async function Home() {
  const response = await fetch("https://api.frankfurter.dev/v2/rates?quotes=USD,GBP,CHF,JPY", {
    next: { revalidate: 3600 }, 
  });
  if (!response.ok) throw new Error(`Frankfurter returned ${response.status}`);

  const json = await response.json();  
  const rates = z.array(RateSchema).parse(json);

  return (
    <div>
      <h1>Rates</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Base</th>
            <th>Quote</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => 
          <tr key={rate.quote}>
              <td>{rate.date}</td>
              <td>{rate.base}</td>
              <td>{rate.quote}</td>
              <td>{rate.rate}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
