import express from 'express';
import * as http from 'http';
import path from 'path';
import proxy from 'http-proxy-middleware';
import {Application, Request, Response} from 'express-serve-static-core';

export class FightServer {
  private readonly fightStoreProxy: proxy.Proxy;

  private app: Application;

  constructor() {
    this.app = express();
    this.fightStoreProxy = proxy(FightServer.fightStoreProxyConfig);

    this.configureServer();
  }

  private configureServer() {
    // @ts-ignore
    this.app.use('/api/fights', this.fightStoreProxy);
    this.app.use(express.static(path.join(__dirname, '../../')));

    this.app.get('*', (req: Request, res: Response) => res.sendFile('index.html'));
  }

  public start(port: number | string, cb?: Function): http.Server {
    this.app.set('port', port);
    return this.app.listen(port, cb);
  }

  private static get fightStoreProxyConfig(): proxy.Config {
    return {
      target: 'https://fightstore.cfapps.io',
      secure: true,
      changeOrigin: true,
    };
  }
}
