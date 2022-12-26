import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (callback: () => {}, dependencies: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, dependencies);
}

export default useDidMountEffect;