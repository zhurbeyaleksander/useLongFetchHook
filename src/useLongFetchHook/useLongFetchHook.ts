import React, { useState, useEffect, useCallback } from "react";

export const useHelperPromiseFunc = (longFetchSeconds = 3) => {
  const [isCounting, setIsCounting] = useState(false);
  const [secondsFromStart, setSecondsFromStart] = useState(0);
  const [isLongFetch, setIsLongFetch] = useState(false);
  const [status, setStatus] = useState({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  const checkIsLongFetch = useCallback(
    (curSecond: number) => {
      if (curSecond === longFetchSeconds) {
        setIsLongFetch(true);
      }
    },
    [longFetchSeconds]
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      isCounting && checkIsLongFetch(secondsFromStart + 1);
      isCounting && setSecondsFromStart((prevState) => prevState + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isCounting, checkIsLongFetch, secondsFromStart]);

  const longFetchHelper = useCallback(
    (promise: Promise<any>) => {
      setIsCounting(true);
      const newStatus = { ...status, isLoading: true };
      setStatus(newStatus);

      promise
        .then((res) => {
          return res;
        })
        .catch((error) => {
          const newStatus = { ...status, isLoading: false, error };
          setStatus(newStatus);
          return newStatus;
        })
        .finally(() => {
          const newStatus = { ...status, isLoading: false };
          setStatus(newStatus);
          setIsCounting(false);
          setIsLongFetch(false);
          setSecondsFromStart(0);
        });
    },
    [status]
  );

  return { status, longFetchHelper, secondsFromStart, isLongFetch };
};
