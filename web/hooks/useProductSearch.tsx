import { useEffect, useMemo, useState } from "react";

type ProductSearchResult = {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
};

type ProductSearchState = {
  query: string;
  setQuery: (value: string) => void;
  results: ProductSearchResult[];
  isLoading: boolean;
  hasMatch: boolean;
  message: string;
};

export function useHeaderProductSearch(): ProductSearchState {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("No match found.");

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      setMessage("No match found.");
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/products?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        const data = (await response.json()) as {
          results?: ProductSearchResult[];
        };
        const nextResults = data.results ?? [];
        setResults(nextResults);
        setMessage(nextResults.length ? "" : "No match found.");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setResults([]);
          setMessage("No match found.");
        }
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query]);

  const hasMatch = useMemo(() => results.length > 0, [results]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    hasMatch,
    message,
  };
}
