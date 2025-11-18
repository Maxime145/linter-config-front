import { colorsUtil } from './colors.util.js';

export const log = (message, color = 'reset') => {
  console.log(`${colorsUtil[color]}${message}${colorsUtil.reset}`);
};
