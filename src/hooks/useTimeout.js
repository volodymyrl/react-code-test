/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export const useTimeout = (callback, timeout) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      callback();
    }, timeout);
    return () => {
      clearTimeout(timerId);
    };
  }, []);
};
