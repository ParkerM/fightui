import {FightServer} from './fightserver';
import express from 'express';
import {IRouterHandler, IRouterMatcher, Request} from 'express-serve-static-core';
import * as proxy from 'http-proxy-middleware';
import Mock = jest.Mock;

const mockApp = {
  use: jest.fn<IRouterHandler<any> & IRouterMatcher<any>>(),
  get: jest.fn(),
  set: jest.fn(),
  listen: jest.fn(),
};

jest.mock('express', () => () => mockApp);



const mockProxy: Mock = jest.fn();
jest.mock('http-proxy-middleware', () => jest.fn(() => ({
  proxy: (config: proxy.Config) => mockProxy(config),

  // @ts-ignore
  proxy: (contextOrUri: string, config: proxy.Config) => mockProxy(config),
})));

describe('FightServer', () => {
  let server: FightServer;

  it('configures fightstore proxy on init', () => {
    const expectedConfig: proxy.Config = {
      target: 'https://fightstore.cfapps.io',
      secure: true,
      changeOrigin: true,
    };

    server = new FightServer();

    // expect(mockApp.use).toHaveBeenCalledWith('/api/fights', mockProxy);
    expect(mockApp.use).toHaveBeenCalledWith('/api/fights', expect.anything());
    const proxyFn = mockApp.use.mock.calls[0][1];

    const request = {
      originalUrl: 'localhost/api/howdy'
    } as Request;
    // const proxyRes = proxyFn(request);
    expect(proxy).toHaveBeenCalledWith(expectedConfig);
    expect(mockApp.get).toHaveBeenCalledWith('*', expect.anything());
  });
});
