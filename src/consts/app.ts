import { Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import { Color } from '../styles/Color';

export const MAIN_FONT = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-main',
  preload: true,
  fallback: ['sans-serif'],
});
export const APP_NAME = 'Emrys';
export const APP_DESCRIPTION = 'Bridge seamlessly between chains';
export const APP_URL = 'emrys.xyz';
export const BRAND_COLOR = Color.primary['500'];
export const BACKGROUND_COLOR = Color.primary['500'];
export const BACKGROUND_IMAGE = 'url(/backgrounds/main.svg)';
