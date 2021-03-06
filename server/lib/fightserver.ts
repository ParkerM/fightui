import * as http from 'http';
import express from 'express';
import {Application, Request, Response} from 'express-serve-static-core';
import proxy from 'http-proxy-middleware';
import path from 'path';
import serveStatic from 'serve-static';

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

    this.app.use(serveStatic(path.join(__dirname, '../../')));
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
