import { useEffect, useState } from 'react';
import { site } from '../config/site';
import { getOpenStatus, type OpenStatus } from '../lib/hours';

/**
 * Isletmenin su anki acik/kapali durumu. Dakikada bir yenilenir, boylece
 * sayfa uzun sure acik kalsa da gosterge dogru kalir.
 */
export const useOpenStatus = (): OpenStatus => {
  const [status, setStatus] = useState<OpenStatus>(() => getOpenStatus(site.hours));

  useEffect(() => {
    const timer = window.setInterval(
      () => setStatus(getOpenStatus(site.hours)),
      60_000
    );
    return () => window.clearInterval(timer);
  }, []);

  return status;
};
