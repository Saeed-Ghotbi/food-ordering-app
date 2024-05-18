import ManagedModal from '@components/common/modal/managed-modal';
import { ManagedUIContext } from '@contexts/ui.context';
import { Inter, Manrope, Vazirmatn } from 'next/font/google';
import { dir } from 'i18next';
import localFont from 'next/font/local';
import { languages } from '../i18n/settings';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { Metadata } from 'next';
import ToasterProvider from 'src/app/provider/toaster-provider';
import Providers from 'src/app/provider/provider';
import { LangSystemProvider } from '@contexts/lang/lang.Context';
// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import './globals.css';
import '@assets/css/rc-drawer.css';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});
const vazirmatnArabia = Vazirmatn({
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-vaziri',
});
export const metadata: Metadata = {
  title: {
    template: 'Ace Burger',
    default: 'َAce Burger',
  },
};
const vazirmatn = localFont({
  src: [
    {
      path: '../../../public/font/Vazirmatn-FD-NL-ExtraLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/font/Vazirmatn-FD-NL-Light.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/font/Vazirmatn-FD-NL-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/font/Vazirmatn-FD-NL-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/font/Vazirmatn-FD-NL-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});
export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang={lang} dir={dir(lang)}>
      <body
        className={`${
          lang == 'en'
            ? inter.variable + ' ' + manrope.variable
            : lang == 'fa'
            ? vazirmatn.className
            : vazirmatnArabia.className
        }`}
      >
        <Providers>
          <LangSystemProvider lang={lang}>
            <ManagedUIContext>
              {children}
              <ManagedModal lang={lang} />
              <ManagedDrawer lang={lang} />
              <ToasterProvider />
            </ManagedUIContext>
          </LangSystemProvider>
        </Providers>
      </body>
    </html>
  );
}
