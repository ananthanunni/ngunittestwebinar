import { HttpUtils } from './httpUtils';

describe('HttpUtils tests', () => {
  // TODO: Add a unit test to handle api path without leading slash
  it('should not add extra slash if input alredy has a slash', () => {
    expect(HttpUtils.toApiUrl('/someendpoint/someapi')).toBe(
      `${HttpUtils.baseUrl}/someendpoint/someapi`
    );
  });

  // TODO: Add a unit test to handle api path WITH leading slash
  it('should not add extra slash if input alredy has a slash', () => {
    expect(HttpUtils.toApiUrl('someendpoint/someapi')).toBe(
      `${HttpUtils.baseUrl}/someendpoint/someapi`
    );
  });
});
