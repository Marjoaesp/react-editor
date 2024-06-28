declare module 'ping.js' {
    export default class Ping {
      constructor();
      ping(url: string): Promise<void>;
    }
  }