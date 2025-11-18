import { colorsUtil } from 'src/utils/colors.util';

export const log = (message, color = 'reset') => {
  console.log(`${colorsUtil[color]}${message}${colorsUtil.reset}`);
};
