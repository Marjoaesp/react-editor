// typings/node-arp.d.ts
declare module 'node-arp' {
    function getMAC(ip: string, callback: (err: Error | null, mac: string) => void): void;
  
    export { getMAC };
  }
  