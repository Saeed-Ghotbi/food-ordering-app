'use client';

import ProductsCarousel from '@components/product/products-carousel';
import { useProcucts } from '@contexts/product/product.Context';
import { useRelatedProductsQuery } from '@framework/product/get-related-product';
import { Product } from '@framework/types';
import { LIMITS } from '@framework/utils/limits';
import { useTranslation } from 'src/app/i18n/client';

interface RelatedProductsProps {
  lang: string;
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
  product: Product;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  lang,
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
  product,
}) => {
  const { t } = useTranslation(lang, 'common');

  const { isFetching: isLoading, error, SuggestionProduct } = useProcucts();

  const data = SuggestionProduct(product.categoryGcode!);
  return (
    data &&
    data.map((section: any, inx: number) => {
      return (
        <ProductsCarousel
          key={'ProductsCarousel-' + inx}
          sectionHeading={t(section.title).replace('{title}', product.name)}
          categorySlug={'?category=' + section.id}
          className={className + 'mt-2'}
          products={section.data}
          loading={isLoading}
          error={error?.message}
          limit={section.data.length > 7 ? 7 : section.data.length}
          uniqueKey={uniqueKey}
          carouselBreakpoint={carouselBreakpoint}
          lang={lang}
        />
      );
    })
  );
};

export default RelatedProductFeed;
