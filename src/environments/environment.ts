/**
 *
 * @fileoverview environment
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

export const environment = {
  production: false,
  server: 'https://panel-web.jimbosorteos.com/api/',
  url: 'https://panel-web.jimbosorteos.com/',
  secureKey: Math.random().toString(32).substring(2, 32),
};
