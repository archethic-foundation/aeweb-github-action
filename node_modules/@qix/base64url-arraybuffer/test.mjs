import {encode, decode} from './lib/base64url-arraybuffer.mjs';

const endArr = decode('Od2VA9OoTFhaplEjF6RzCVuFNXMbYGdh79VOr56IkUs');
const end = new Uint8Array(endArr);
console.log(end.length);
console.log(end);
