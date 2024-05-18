import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';

import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import { useTranslation } from 'src/app/i18n/client';
import { describe } from 'node:test';
import { Gochi_Hand } from 'next/font/google';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  lang: string;
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;

  const { t } = useTranslation(lang, 'common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  // const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  // if (Number(quantity) < 1 || outOfStock) {
  //   return (
  //     <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
  //       {t('text-out-stock')}
  //     </span>
  //   );
  // }

  if (product_type === 'variable') {
    return (
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <Eye width={iconSize} height={iconSize} opacity="1" />
      </button>
    );
  }
  return <AddToCart data={data} variant="mercury" lang={lang} />;
}
const ProductCardAlpine: React.FC<ProductProps> = ({
  product,
  className,
  lang,
}) => {
  const { gcode, name, description } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang, 'common');
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.cost,
    baseAmount: product?.cost,
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className,
      )}
      onClick={handlePopupView}
      title={name}
    >
      <div className="relative shrink-0">
        <div className="overflow-hidden mx-auto w-full sm:w-[180px] h-[180px] md:w-[200px] md:h-[200px] transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={'/assets/images/products/' + gcode + '.jpg'}
            alt={name || 'Product Image'}
            quality={100}
            priority
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="object-cover bg-fill-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[11px] md:text-xs font-bold text-brand-dark uppercase inline-block bg-yellow-200 rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-on-sale')}
            </span>
          )}
          <div className={`block product-count-button-position`}>
            <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-4 lg:pb-5 lg:pt-1.5 h-full">
        <div className="mb-1 lg:mb-1.5 -mx-1">
          <h2 className=" text-brand-dark font-semibold text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5 mt-1">
            {name}
          </h2>
        </div>
        {description && (
          <div className="mb-1 lg:mb-1.5 -mx-1">
            <span className="inline-block text-xs  text-brand-muted">
              {description}
            </span>
          </div>
        )}
        <div className="text-left">
          {discount && (
            <span className="rounded font-bold text-xs md:text-12px bg-yellow-200 text-brand-dark uppercase px-2 py-1 rtl:float-right">
              {discount}
            </span>
          )}
          <span className="font-semibold text-sm lg:text-15px text-brand-dark ltr:float-right">
            {price}
          </span>
        </div>
        <div className="text-left rtl:ml-10 ltr:text-right ltr:mr-10">
          {basePrice && (
            <del className="text-sm text-brand-dark text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
        {/* <div className="mt-auto text-13px sm:text-sm">{unit}</div> */}
      </div>
    </article>
  );
};

export default ProductCardAlpine;
