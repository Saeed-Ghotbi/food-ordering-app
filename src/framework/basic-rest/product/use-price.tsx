import { useMemo } from 'react';
import { useLang } from '@contexts/lang/lang.Context';
import { useTranslation } from 'src/app/i18n/client';

export function formatPrice(amount: number, currency: string) {
  let p = amount.toString().slice(0, amount.toString().length - 1);
  return p.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency;
}

export function formatVariantPrice(
  {
    amount,
    baseAmount,
  }: {
    baseAmount: number;
    amount: number;
  },
  currency: string,
) {
  const hasDiscount = baseAmount > amount;
  const formatDiscount = new Intl.NumberFormat('en', { style: 'percent' });
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null;

  const price = formatPrice(amount, currency);
  const basePrice = hasDiscount
    ? formatPrice(baseAmount, currency).replace(' ریال', '')
    : null;

  return { price, basePrice, discount };
}

export default function usePrice(
  data?: {
    amount: number;
    baseAmount?: number;
  } | null,
) {
  const { amount, baseAmount } = data ?? {};
  const lang = useLang();
  const { t } = useTranslation(lang, 'common');
  const currency = t('text-currency');
  const value = useMemo(() => {
    if (typeof amount !== 'number') return '';

    return baseAmount
      ? formatVariantPrice({ amount, baseAmount }, currency)
      : formatPrice(amount, currency);
  }, [amount, baseAmount]);

  return typeof value === 'string'
    ? { price: value, basePrice: null, discount: null }
    : value;
}
