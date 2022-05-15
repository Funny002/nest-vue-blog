export const hasCookie = (name: string): boolean => (new RegExp(`(^|;\\s)${name}=`)).test(document.cookie);

export const getCookieKeys = () => document.cookie.replace(/=\S*(;\s)?/g, '$1').split(' ');

export const getCookie = (name: string): string => decodeURIComponent((document.cookie.match(new RegExp(`(^|;\\s)${name}=([^;]*)`)) || [])[2] || '');

export const setCookie = (name: string, value: any, expires?: string | number | Date, path?: string, domain?: string, secure?: boolean): boolean => {
  path = path || '/';
  if (!name) return false;
  const data = [name + '=' + encodeURIComponent(value)];
  if (expires !== undefined) {
    if (expires.constructor === String) {
      data.push('expires=' + expires);
    } else if (expires.constructor === Date) {
      data.push('expires=' + expires.toUTCString());
    } else if (expires.constructor === Number) {
      if (expires !== Infinity) {
        data.push('max-age=' + expires.toString());
      } else {
        data.push('expires=' + 'Fri, 31 Dec 9999 23:59:59 GMT');
      }
    }
  }
  if (domain !== undefined) data.push('domain=' + domain);
  if (path !== undefined) data.push('path=' + path);
  if (secure !== undefined) data.push('secure');
  document.cookie = data.join('; ').trim();
  return true;
};

export const removeCookie = (name: string, path?: string, domain?: string): boolean => {
  if (!name || hasCookie(name)) return false;
  return setCookie(name, '', 'Thu, 01 Jan 1970 00:00:00 GMT', path, domain);
};
