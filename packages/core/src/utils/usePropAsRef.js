import { useRef, useEffect } from "react";

export default function usePropAsRef(payload) {
  const nodePayload = useRef(null);

  useEffect(() => {
    nodePayload.current = payload;
  }, [payload]);

  return nodePayload;
}
