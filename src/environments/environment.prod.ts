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
  production: true,
  server: 'http://127.0.0.1:8000/api/',
  url: 'http://127.0.0.1:8000/',
  secureKey: Math.random().toString(32).substring(2, 32),
};
