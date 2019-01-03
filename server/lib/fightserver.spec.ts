import {FightServer} from './fightserver';
import * as express from 'express';
import * as core from 'express-serve-static-core';
import * as proxy from 'http-proxy-middleware';

const mockApp = {
  use: jest.fn<core.IRouterHandler<any> & core.IRouterMatcher<any>>(),
  get: jest.fn(),
  set: jest.fn(),
  listen: jest.fn(),
};

jest.mock('express', () => jest.fn(() => mockApp));
jest.spyOn(express, 'static').mockImplementation(console.log);
jest.mock('http-proxy-middleware', () => jest.fn(() => ({})));

describe('FightServer', () => {
  let server: FightServer;

  it('configures routes and proxies on init', () => {
    const expectedConfig: proxy.Config = {
      target: 'https://fightstore.cfapps.io',
      secure: true,
      changeOrigin: true,
    };

    server = new FightServer();

    expect(mockApp.use).toHaveBeenCalledWith('/api/fights', expect.anything());
    expect(proxy).toHaveBeenCalledWith(expectedConfig);
    expect(mockApp.get).toHaveBeenCalledWith('*', expect.anything());
  });
});
