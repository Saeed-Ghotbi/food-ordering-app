import { FAFlag } from '@components/icons/language/FAFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { USFlag } from '@components/icons/language/USFlag';
import siteLogo from 'public/assets/images/Logo.png';

export const siteSettings = {
  name: 'Ace Burger',
  description: 'Ace Burger.',
  author: {
    name: 'Ace Burger',
    websiteUrl: 'https://aceburger.com',
    address: '',
  },
  logo: {
    url: siteLogo,
    alt: 'Ace Burger',
    href: '/fa',
    width: 128,
    height: 30,
  },
  defaultLanguage: 'fa',
  currencyCode: 'USD',
  site_header: {
    menu: [
      // {
      //   id: 1,
      //   path: '/',
      //   label: 'menu-users',
      //   subMenu: [
      //     {
      //       id: 2,
      //       path: '/signin',
      //       label: 'menu-sign-in',
      //     },
      //   ],
      // },
      // {
      //   id: 1,
      //   path: '/my-account/account-settings',
      //   label: 'menu-my-account',
      // },
      {
        id: 3,
        path: '/about-us',
        label: 'menu-about-us',
      },

      {
        id: 6,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'عربى - AR',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag />,
      },
      {
        id: 'fa',
        name: 'فارسی - FA',
        value: 'fa',
        icon: <FAFlag />,
      },
    ],
    pagesMenu: [
      {
        id: 1,
        path: '/search',
        label: 'menu-best-deals',
      },
      {
        id: 2,
        path: '/about-us',
        label: 'menu-about-us',
      },
      {
        id: 3,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
    ],
  },
};
