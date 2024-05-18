'use client';

import Link from 'next/link';
import Logo from '@components/ui/logo';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';

interface AboutProps {
  lang: string;
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ lang, social, className }) => {
  const { t } = useTranslation(lang, 'footer');

  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      <div className="flex flex-col text-center sm:ltr:text-left sm:rtl:text-right mx-auto sm:ltr:ml-0 sm:rtl:mr-0 pb-6 sm:pb-5">
        <Logo href={ROUTES.HOME} className="m-auto mb-3 lg:mb-5 sm:ltr:ml-0" />
        <Text variant="small" className="text-center text-xs mb-1">
          {t('text-about-footer1')}
        </Text>
        <Text variant="small" className="text-center text-xs">
          {t('text-about-footer2')}
        </Text>
      </div>

      {social && (
        <ul className="flex flex-wrap justify-center mx-auto sm:justify-center">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80 last:ltr:mr-0 md:ltr:mr-5 md:mx-0 ltr:mr-4 last:rtl:ml-0 rtl:ml-4 md:rtl:ml-5"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : '/#'} legacyBehavior>
                <a target="_blank" rel="noreferrer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={item.height}
                    width={item.width}
                    className="transform scale-85 md:scale-100"
                    style={{ width: 'auto' }}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetAbout;
