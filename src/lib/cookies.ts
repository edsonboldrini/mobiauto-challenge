import { parse } from 'cookie';
import { parseCookies as parseRequestCookies } from 'nookies';

export { setCookie, destroyCookie } from 'nookies';

export const BASE_COOKIE_OPTIONS = {
  path: '/',
  domain: process.env.COOKIE_DOMAIN,
};

const cookieStringFromSetCookie = (cookies: string[] = []) => cookies.map((cookie) => {
  const [keyValuePart] = cookie.split(';');
  return keyValuePart;
}).join('; ');

const parseResponseCookies = (ctx: any, options: any) => {
  let responseCookies: { [key: string]: string } = {};
  if (ctx?.res) {
    const cookie = cookieStringFromSetCookie(ctx.res.getHeader('Set-Cookie'));
    responseCookies = parse(cookie, options);
  }

  return responseCookies;
};

export const getCookie = (ctx: any, name: string, options: any) => {
  // Parse cookies in response header in case we dispatch requests to endpoints
  // that require authentication (i.e. sessionToken) in the same request as the
  // one that's setting the cookie. In that case the cookie will not be available
  // in the requestCookies as it has not been returned from the client in the
  // cookie header.
  const responseCookies = parseResponseCookies(ctx, options);

  const requestCookies = parseRequestCookies(ctx);
  return responseCookies[name] || requestCookies[name];
};