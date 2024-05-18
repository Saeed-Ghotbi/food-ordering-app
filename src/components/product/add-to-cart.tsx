import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  lang: string;
  data: any;
  variation?: any;
  disabled?: boolean;
  variant?: any;
}
const AddToCart = ({ lang, data, disabled, variant = 'mercury' }: Props) => {
  const { width } = useWindowSize();
  const { t } = useTranslation(lang, 'common');
  const { addItemToCart, removeItemFromCart, getItemFromCart, isInCart } =
    useCart();
  // const item = generateCartItem(data!);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
  ) => {
    e.stopPropagation();
    addItemToCart(data, 1);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(data.gcode);
  };
  const iconSize = width! > 480 ? '19' : '17';

  return !isInCart(data?.gcode) ? (
    variant === 'venus' ? (
      <button
        className="w-full grid grid-cols-[1fr,max-content] items-center bg-[#F4F6F8] rounded-[4px] mt-[10px] no-underline transition-all text-gray-600 hover:text-black font-medium"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled}
      >
        <span className="sm:flex text-[15px] sm:items-center sm:justify-center">
          {t('text-add-to-cart-btn')}
        </span>
        <span className="w-10 h-10 bg-[#E5E8EC] rounded-tr-[4px] rounded-br-[4px] flex items-center justify-center ml-auto">
          <PlusIcon width={iconSize} height={iconSize} opacity="1" />
        </span>
      </button>
    ) : (
      <button
        className="flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled}
      >
        <PlusIcon width={iconSize} height={iconSize} opacity="1" />
      </button>
    )
  ) : (
    <Counter
      value={getItemFromCart(data.gcode).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      className="w-full h-10"
      variant={variant}
      lang={lang}
    />
  );
};

export default AddToCart;
