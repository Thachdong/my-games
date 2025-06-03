import { TPagination } from "game_caro_package/types";
import React, { useCallback } from "react";

export const usePagination = <T>() => {
  const [items, setItems] = React.useState<T[]>([]);
  const [meta, setMeta] = React.useState<TPagination<T>["meta"]>();
  const [loading, setLoading] = React.useState(false);

  const fetchItems = useCallback(async (fetchFunction: () => Promise<TPagination<T> | void>) => {
    setLoading(true);

    try {
      const result = await fetchFunction();

      if (!result) {
        throw new Error('Error occurred while fetching items');
      }

      const { data, meta } = result;

      setItems((prev) => [...prev, ...data]);

      setMeta({ ...meta});
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { items, fetchItems, meta, loading };
}
