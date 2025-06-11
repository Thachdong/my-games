import { TPagination } from 'game_caro_package/types';
import { useCallback, useState } from 'react';

export const usePagination = <T>() => {
  const [items, setItems] = useState<T[]>([]);
  const [meta, setMeta] = useState<TPagination<T>['meta']>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = useCallback(
    async (fetchFunction: () => Promise<TPagination<T> | null>) => {
      setLoading(true);
      try {
        const result = await fetchFunction();
        if (!result) throw new Error('Error occurred while fetching items');

        setItems((prev) => [...prev, ...result.data]);
        setMeta(result.meta);

        const { total, limit, page } = result.meta;
        setHasMore(page * limit < total);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { items, fetchItems, meta, loading, setItems, hasMore };
};
