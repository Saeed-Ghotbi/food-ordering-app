import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import Counter from '@components/ui/counter';
import { useTranslation } from 'src/app/i18n/client';

type CartItemProps = {
  item: any;
  lang: string;
};

const CartItem: React.FC<CartItemProps> = ({ lang, item }) => {
  const { isInStock, addItemToCart, removeItemFromCart, clearItemFromCart } =
    useCart();
  const { t } = useTranslation(lang, 'common');

  const { price: totalPrice } = usePrice({
    amount: item?.itemTotal,
  });
  // const outOfStock = !isInStock(item.id);
  return (
    <div
      className={`group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          src={'/assets/images/products/' + item.gcode + '.jpg'}
          width={100}
          height={100}
          loading="eager"
          alt={item.name || 'Product Image'}
          style={{ width: 'auto' }}
          className="object-cover bg-fill-thumbnail"
        />
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.gcode)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="w-full">
        <div className="ltr:pl-3 rtl:pr-3 md:ltr:pl-4 md:rtl:pr-4">
          <Link
            href={`/${lang}${ROUTES.PRODUCT}/${item?.name}`}
            className="leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
          >
            {item?.name}
          </Link>
          <div className="rtl:float-left ltr:float-right font-semibold text-sm md:text-base text-brand-dark leading-5">
            {totalPrice}
          </div>
          <div className="text-13px sm:text-sm text-brand-dark block">
            {item.unit} X {item.quantity}
          </div>

          <div className="text-xs text-brand-muted">
            {/* {item.additionalSelected?.map(
              (add: any, index: number) =>
                t(add.name) +
                (index == item.additionalSelected.length - 1 ? '' : '، '),
            )} */}
          </div>

          <Counter
            value={item.quantity}
            className="mt-1"
            onIncrement={() => addItemToCart(item, 1)}
            onDecrement={() => removeItemFromCart(item.gcode)}
            variant="cart"
            // disabled={outOfStock}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
