// useSamsungTVScanner.tsx
import { useState } from 'react';

const useSamsungTVScanner = () => {
  const [samsungTVs, setSamsungTVs] = useState<{ ip: string, name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const isSamsungTizenTV = async (ip: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://${ip}:8001/api/v2/`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        if (data.device && data.device.type === 'Samsung SmartTV') {
          return true;
        }
      }
    } catch (error) {
      // Ignore errors
    }
    return false;
  };

  const scanNetwork = async () => {
    setLoading(true);
    const subnet = '192.168.255'; 
    const promises = [];

    for (let i = 1; i <= 254; i++) {
      const ip = `${subnet}.${i}`;
      promises.push(
        isSamsungTizenTV(ip)
          .then(isTV => {
            if (isTV) {
              return { ip, name: 'Samsung Tizen TV' };
            }
            return null;
          })
          .catch(() => null)
      );
    }

    const results = await Promise.all(promises);
    setSamsungTVs(results.filter(result => result !== null) as { ip: string, name: string }[]);
    setLoading(false);
  };

  return { samsungTVs, loading, scanNetwork };
};

export default useSamsungTVScanner;
