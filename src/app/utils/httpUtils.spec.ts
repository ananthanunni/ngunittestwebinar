import { HttpUtils } from './httpUtils';

describe('HttpUtils tests', () => {
  const expectedUrl = `${HttpUtils.baseUrl}/test/api`;

  it('should handle urls with a slash prefixed url', () => {
    expect(HttpUtils.toApiUrl('/test/api')).toBe(expectedUrl);
  });

  it('should handle urls without a slash prefixed url', () => {
    expect(HttpUtils.toApiUrl('test/api')).toBe(expectedUrl);
  });
});
