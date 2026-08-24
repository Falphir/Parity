import Form from 'next/form'
import React from 'react'
import { Currency } from '../lib/types';

type ConverterFormProps = {
    from: string;
    to: string;
    amount: number;
    currencies: Currency[];
};

export function ConverterForm({ from, to, amount, currencies }: ConverterFormProps) {
    return (
        <Form action="/" className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">Amount</span>
            <input
            name="amount"
            type="number"
            step="any"
            min="0"
            defaultValue={amount}
            required
            className="tabular w-36 rounded-md border border-border px-3 py-2 outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
            />
        </label>

        <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">From</span>
            <select name="from" defaultValue={from} className="w-56 rounded-md border border-border bg-background px-3 py-2 outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30">
            {currencies.map(({ code, name, symbol }) => (
                <option key={code} value={code}>
                    {code} {symbol} — {name}
                </option>
                ))}
            </select>
        </label>

        <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">To</span>
            <select name="to" defaultValue={to} className="w-56 rounded-md border border-border bg-background px-3 py-2 outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30">
            {currencies.map(({ code, name, symbol }) => (
                <option key={code} value={code}>
                    {code} {symbol} — {name}
                </option>
                ))}
            </select>
        </label>

        <button
            type="submit"
            className="rounded-md border border-accent bg-accent px-5 py-2 font-medium text-[#101a2b] transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
            Convert
        </button>
        </Form>
    )
}
