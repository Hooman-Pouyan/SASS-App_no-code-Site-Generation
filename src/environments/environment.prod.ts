import {getWindow} from "ssr-window";

let URL = getWindow().location.origin;
let ADMIN_URL: string = "";

if (URL.includes('http://')) {
  ADMIN_URL = URL.replace('http://', 'https://panel.');
}
else if (URL.includes('https://')) {
  ADMIN_URL = URL.replace('https://', 'https://panel.');
}

export const environment = {
  production: true,
  API_URL: URL,
  ADMIN_API_URL: ADMIN_URL,
};
