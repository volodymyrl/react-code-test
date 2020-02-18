import { useEffect } from "react";

const useEventListener = (type, cb, isEventAvailable) => {
  useEffect(() => {
    if (isEventAvailable) {
      window.addEventListener(type, cb);
    } else {
      window.removeEventListener(type, cb);
    }

    return () => {
      window.removeEventListener(type, cb);
    };
  }, [type, cb, isEventAvailable]);
};

export default useEventListener;
