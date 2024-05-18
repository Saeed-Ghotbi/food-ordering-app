import { useState, type FC } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useProductsQuery } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import useQueryParam from '@utils/use-query-params';
import { useProcucts } from '@contexts/product/product.Context';

interface ProductGridProps {
  lang: string;
  className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = '', lang }) => {
  const { t } = useTranslation(lang, 'common');
  const [page, setPage] = useState<number>(1);

  const pathname = usePathname();
  const { getParams, query } = useQueryParam(pathname ?? '/');
  const newQuery: any = getParams(
    // @ts-ignore
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
  );

  // const {
  //   isFetching: isLoading,
  //   data,
  //   error,
  // } = useProductsQuery({
  //   // @ts-ignore
  //   newQuery,
  // });

  const {
    getAllProducts,
    error,
    isFetching: isLoading,
    hasNextPage,
  } = useProcucts();

  newQuery.page = page;

  const data = getAllProducts(newQuery);

  function fetchNextPage(page: number) {
    setPage(page);
  }
  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className,
        )}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.map((product: Product) => {
            return (
              <ProductCardAlpine
                key={`product--key-${product.gcode}`}
                product={product}
                lang={lang}
              />
            );
          })
        )}
        {/* end of error state */}
      </div>
      {hasNextPage && (
        <div className="pt-8 text-center xl:pt-10">
          <Button onClick={() => fetchNextPage(page + 1)}>
            {t('button-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};
