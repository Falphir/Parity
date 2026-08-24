import * as z from "zod"

import {ConverterForm} from "@/app/components/converterForm"
import { Currency } from "./lib/types";

const SearchParamsSchema = z.object({
  from: z.string().regex(/^[A-Z]{3}$/).catch("EUR"),
  to: z.string().regex(/^[A-Z]{3}$/).catch("USD"),
  amount: z.coerce.number().positive().finite().catch(1),
});

const RateSchema = z.object({
  date: z.string(),
  base: z.string(),
  quote: z.string(),
  rate: z.number(),
});

const CurrenciesSchema = z.array(
  z.object({
    iso_code: z.string(),
    name: z.string(),
    symbol: z.string(),
  })
);



export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // 1. from / to / amount — parsed out of the URL
  const { from, to, amount } = SearchParamsSchema.parse(await searchParams);

  // 2. currencies — fetched, rarely changes
  const currenciesRes = await fetch("https://api.frankfurter.dev/v2/currencies", {
    next: { revalidate: 86400 },
  });
  if (!currenciesRes.ok) throw new Error(`Currencies: ${currenciesRes.status}`);

  const currencies: Currency[] = CurrenciesSchema.parse(await currenciesRes.json())
    .map((c) => ({ code: c.iso_code, name: c.name, symbol: c.symbol }))
    .sort((a, b) => a.code.localeCompare(b.code));
  
  // 3. the rate for the selected pair
  const rateRes = await fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`, {
    next: { revalidate: 3600 },
  });
  if (!rateRes.ok) throw new Error(`Rate: ${rateRes.status}`);
  const { rate } = RateSchema.parse(await rateRes.json());

  return (
    <main className="p-8">
      <h1 className="mb-6 text-2xl font-semibold">Parity</h1>
      <ConverterForm from={from} to={to} amount={amount} currencies={currencies} />
      <p className="mt-8 text-4xl">
        {(amount * rate).toFixed(2)} {to}
      </p>
      <p className="mt-1 text-sm text-gray-600">
        1 {from} = {rate} {to}
      </p>
    </main>
  );
}
