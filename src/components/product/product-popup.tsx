import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import ProductAttributes from '@components/product/product-attributes';
import { generateCartItem } from '@utils/generate-cart-item';
import usePrice, { formatPrice } from '@framework/product/use-price';
import { getVariations } from '@framework/utils/get-variations';
import { useTranslation } from 'src/app/i18n/client';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import SocialShareBox from '@components/ui/social-share-box';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { CheckBox } from '@components/ui/form/checkbox';
import { AdditionalService } from '@framework/types';

const breakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

export default function ProductPopup({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');
  const { data } = useModalState();
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [totalPriceAdditional, setTotalPriceAdditional] = useState<number>(0);
  const [additionalSelected, setAdditionalSelected] = useState<
    AdditionalService[]
  >([]);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);

  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.cost,
    baseAmount: data.cost,
  });
  const { gcode, name, description, categoryGcode } = data;
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${lang}${ROUTES.PRODUCT}/${name}`;
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  let selectedVariation: any = {};

  // const item = generateCartItem(data);
  // const outOfStock = isInCart(data.gcode) && !isInStock(data.gcode);
  function addToCart() {
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    addItemToCart(data, selectedQuantity);
    // @ts-ignore
    toast(t('text-added-bag'), {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function addToWishlist() {
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function calculateAdditionalWithPrice(price: string) {
    let priceorg = Number.parseInt(price.replace(',', ''));
    return formatPrice(priceorg + totalPriceAdditional, t('text-currency'));
  }
  // function ClickAdditional(
  //   e: ChangeEvent<HTMLInputElement>,
  //   item: AdditionalService,
  // ) {
  //   if (e.target.checked) {
  //     setTotalPriceAdditional(item.price + totalPriceAdditional);
  //     setAdditionalSelected([
  //       ...additionalSelected,
  //       { gcode: item.gcode, name: item.name, price: item.price },
  //     ]);
  //   } else {
  //     setTotalPriceAdditional(totalPriceAdditional - item.price);
  //     setAdditionalSelected(
  //       additionalSelected.filter((itemselct) => itemselct.gcode !== item.gcode),
  //     );
  //   }
  // }

  function navigateToProductPage() {
    closeModal();
    router.push(`/${lang}/${ROUTES.PRODUCT}/${name}`);
  }

  useEffect(() => setSelectedQuantity(1), [data.gcode]);

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-4 pt-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 md:pt-7 2xl:pt-10">
          <div className="items-start justify-between lg:flex">
            <div className="items-center justify-center mb-6 overflow-hidden xl:flex md:mb-8 lg:mb-0 lg:mx-auto">
              <div className="flex items-center justify-center w-auto">
                <Image
                  src={'/assets/images/products/' + gcode + '.jpg'}
                  alt={name!}
                  width={650}
                  height={590}
                  style={{ width: 'auto' }}
                />
              </div>
            </div>

            <div className="shrink-0 flex flex-col lg:ltr:pl-5 lg:rtl:pr-5 xl:ltr:pl-8 xl:rtl:pr-8 2xl:ltr:pl-10 2xl:rtl:pr-10 lg:w-[500px] xl:w-[550px] 2xl:w-[600px]">
              <div className="pb-5">
                <div
                  className="mb-2 md:mb-2.5 block -mt-1.5"
                  onClick={navigateToProductPage}
                  role="button"
                >
                  <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand">
                    {name}
                  </h2>
                </div>

                <Text variant="small">{description}</Text>
                {/* {additional && (
                  <div className="pt-4 xl:pt-6">
                    <Heading>{t('text-product-choose')}:</Heading>
                    <ul className="pt-1 xl:pt-2">
                      {additional?.map((item: any) => (
                        <li
                          className="flex justify-between p-[3px]"
                          key={`tag-${item.gcode}`}
                        >
                          <label className="cursor-pointer">
                            <input
                              type="checkbox"
                              value={item.gcode}
                              name={item.name.toLowerCase()}
                              onChange={(e) => ClickAdditional(e, item)}
                              className="w-5 h-5 text-yellow-100  transition duration-500 ease-in-out border border-gray-300 rounded cursor-pointer form-checkbox ml-2 hover:border-yellow-100 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-yellow-100 hover:checked:bg-yellow-100"
                            />
                            <span>{t(item.name)}</span>
                          </label>
                          <div>
                            {formatPrice(item.price, t('text-currency'))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}

                <div className="flex items-center mt-7">
                  <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                    {price}
                  </div>
                  {discount && (
                    <>
                      <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                        {basePrice}
                      </del>
                      <span className="inline-block rounded font-bold text-xs md:text-sm bg-brand-tree bg-opacity-20 text-brand-tree uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                        {discount} {t('text-off')}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="pb-2">
                {!isEmpty(selectedVariation) && (
                  <span className="text-sm font-medium text-yellow">
                    {selectedVariation?.is_disable ||
                    selectedVariation.quantity === 0
                      ? t('text-out-stock')
                      : `${
                          t('text-only') +
                          ' ' +
                          selectedVariation.quantity +
                          ' ' +
                          t('text-left-item')
                        }`}
                  </span>
                )}
              </div>

              <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                <Counter
                  variant="single"
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  lang={lang}
                />
                <Button
                  onClick={addToCart}
                  className="w-full px-1.5"
                  loading={addToCartLoader}
                >
                  <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
                  {t('text-add-to-cart')}
                </Button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="border"
                    onClick={addToWishlist}
                    loading={addToWishlistLoader}
                    className={`group hover:text-brand ${
                      favorite === true && 'text-brand'
                    }`}
                  >
                    {favorite === true ? (
                      <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
                    ) : (
                      <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                    )}

                    {t('text-wishlist')}
                  </Button>
                  <div className="relative group">
                    <Button
                      variant="border"
                      className={`w-full hover:text-brand ${
                        shareButtonStatus === true && 'text-brand'
                      }`}
                      onClick={handleChange}
                    >
                      <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                      {t('text-share')}
                    </Button>
                    <SocialShareBox
                      className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                        shareButtonStatus === true
                          ? 'visible opacity-100 top-full'
                          : 'opacity-0 invisible top-[130%]'
                      }`}
                      shareUrl={productUrl}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>
              {/* {tag && (
                <ul className="pt-5 xl:pt-6">
                  <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                    <LabelIcon className="ltr:mr-2 rtl:ml-2" /> {t('text-tags')}
                    :
                  </li>
                  {tag?.map((item: any) => (
                    <li className="inline-block p-[3px]" key={`tag-${item.gcode}`}>
                      <TagLabel data={item} />
                    </li>
                  ))}
                </ul>
              )} */}
            </div>
          </div>
        </div>
        <RelatedProductFeed
          product={data}
          carouselBreakpoint={breakpoints}
          className="mb-0.5 md:mb-2 lg:mb-3.5 xl:mb-4 2xl:mb-6"
          lang={lang}
        />
      </div>
    </div>
  );
}
