export class HttpUtils {
  static baseUrl = 'https://localhost:5001/api';

  static toApiUrl(url: string): string {
    return `${HttpUtils.baseUrl}/${url.startsWith('/') ? url.substr(1) : url}`;
  }
}
