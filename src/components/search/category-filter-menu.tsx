import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import {
  IoIosArrowDown,
  IoIosArrowDropleft,
  IoIosArrowDropleftCircle,
  IoIosArrowDropright,
  IoIosArrowDroprightCircle,
  IoIosArrowUp,
} from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'src/app/i18n/client';
import { FaCheck } from 'react-icons/fa';
import useQueryParam from '@utils/use-query-params';
import { Category } from '@framework/types';

function checkIsActive(state: string, item: string) {
  if (state == item) {
    return true;
  }
  return false;
}
function CategoryFilterMenuItem({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  lang,
}: any) {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string>('');

  const isActive = checkIsActive(formState, item.gcode);
  const { name, gcode, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  const hasQueryKey = searchParams?.get('category');

  useEffect(() => {
    updateQueryparams('category', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    window.scrollTo({ top: 550, left: 0, behavior: 'smooth' });
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey ?? '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function onClick(e: React.MouseEvent) {
    setFormState(gcode);
    displaySidebar && closeSidebar();
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex justify-between items-center transition text-sm md:text-15px',
          { 'bg-fill-base': isActive },
          className,
        )}
      >
        <button className="flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group">
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4 2xl:ltr:mr-3 2xl:rtl:ml-3 3xl:ltr:mr-4 3xl:rtl:ml-4">
              <Image
                src={'/assets/images/category/icon/' + icon + '.png'}
                alt={name || t('text-category-thumbnail')}
                width={40}
                height={40}
                style={{ width: 'auto' }}
              />
            </div>
          )}
          <span className="text-brand-dark capitalize py-0.5">{name}</span>

          <span className="ltr:ml-auto rtl:mr-auto">
            {lang == 'en' ? (
              <IoIosArrowDroprightCircle className="text-base text-brand-dark text-opacity-40" />
            ) : (
              <IoIosArrowDropleftCircle className="text-base text-brand-dark text-opacity-40" />
            )}
          </span>
        </button>
      </li>
    </>
  );
}

function CategoryFilterMenu({ items, className, lang }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: Category) => (
        <CategoryFilterMenuItem
          key={`${item.icon}-key-${item.gcode}`}
          item={item}
          lang={lang}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
