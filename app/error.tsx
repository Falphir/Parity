"use client";

import { useEffect } from "react";

export default function Error({
        error,
        reset,
    }: {
        error: Error & { digest?: string };
        reset: () => void;
    }) {
        useEffect(() => {
            console.error(error);
        }, [error]);

    return (
        <div className="p-8">
        <h2 className="text-lg font-semibold">Could not load rates</h2>
        <p className="mt-2 text-sm text-gray-600">
            The exchange rate service did not respond as expected.
        </p>
        <button
            onClick={reset}
            className="mt-4 rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
            Try again
        </button>
        </div>
    );

}