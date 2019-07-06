import {FightServer} from './fightserver';
import * as express from 'express';
import * as core from 'express-serve-static-core';
import * as proxy from 'http-proxy-middleware';
import * as serveStatic from 'serve-static';
import path from 'path';

const mockApp = {
  use: jest.fn<core.IRouterHandler<any> & core.IRouterMatcher<any>, any[]>(),
  get: jest.fn(),
  set: jest.fn(),
  listen: jest.fn(),
};

jest.mock('express', () => jest.fn(() => mockApp));
jest.mock('http-proxy-middleware', () => jest.fn(() => ({})));
jest.mock('serve-static', () => jest.fn());

describe('FightServer', () => {
  let server: FightServer;

  describe('on class init', () => {
    it('configures default static route', () => {
      const pathSpy = jest.spyOn(path, 'join');

      server = new FightServer();

      expect(pathSpy).toHaveBeenCalledWith(__dirname, '../../');
      expect(serveStatic).toHaveBeenCalledWith(path.join(__dirname, '../../'));
      expect(mockApp.get).toHaveBeenCalledWith('*', expect.anything());
    });

    it('configures fightstore proxy', () => {
      const expectedConfig: proxy.Config = {
        target: 'https://fightstore.cfapps.io',
        secure: true,
        changeOrigin: true,
      };

      server = new FightServer();

      expect(mockApp.use).toHaveBeenCalledWith('/api/fights', expect.anything());
      expect(proxy).toHaveBeenCalledWith(expectedConfig);
    });
  });

  describe('on server start', () => {
    it('uses given port and callback', () => {
      server = new FightServer();

      const expectedPort = '47474';
      const cbFn = jest.fn();
      server.start(expectedPort, cbFn.mockImplementation);

      expect(mockApp.listen).toHaveBeenCalledWith(expectedPort, cbFn.mockImplementation);
    });
  });
});
