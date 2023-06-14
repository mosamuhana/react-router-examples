import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { NavigateOptions } from 'react-router-dom';
import { parse as decodeUrl, stringify as encodeUrl } from 'jsurl';

//type SetValue<T> = (newQuery: T, options?: NavigateOptions) => void;

/**
 * This custom hook is a wrapper around `useSearchParams()` that parses and
 * serializes the search param value using the JSURL library, which permits any
 * JavaScript value to be safely URL-encoded.
 *
 * It's a good example of how React hooks offer a great deal of flexibility when
 * you compose them together!
 *
 * TODO: rethink the generic type here, users can put whatever they want in the
 * URL, probably best to use runtime validation with a type predicate:
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
export function useQueryParam<T = any>(key: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key);

  const value = useMemo<T | undefined>(() => decodeUrl(paramValue), [paramValue]);

  const setValue = useCallback(
    (newValue: T, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, encodeUrl(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue] as const;
}
