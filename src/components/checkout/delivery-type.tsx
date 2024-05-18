import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import cn from 'classnames';
import { useTranslation } from 'src/app/i18n/client';
interface DeliveryType {
  id: number;
  value: string;
}
export default function DeliveryType({
  lang,
  getValue,
}: {
  lang: string;
  getValue: () => DeliveryType;
}) {
  const { t } = useTranslation(lang, 'common');
  const deliveryType = [
    { id: 1, value: t('text-delivery-type1') },
    { id: 2, value: t('text-delivery-type2') },
  ];
  const [deliveryTypes, setDeliveryTypes] = useState(deliveryType[1].id);

  const clickDeliveryType = (e: any) => {
    setDeliveryTypes(e);
    getValue;
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <RadioGroup
          value={deliveryTypes}
          onChange={() => {
            clickDeliveryType(deliveryTypes);
          }}
        >
          <RadioGroup.Label className="sr-only">
            {t('text-delivery-type')}
          </RadioGroup.Label>
          <div className="flex flex-wrap basis-10 gap-4 ">
            {deliveryType.map((tips) => (
              <RadioGroup.Option
                key={tips.id}
                value={tips.id}
                className={({ active, checked }) =>
                  cn(
                    'relative rounded-lg px-5 py-4 cursor-pointer focus:outline-none',
                    checked ? 'bg-brand text-white' : 'bg-gray-100',
                  )
                }
              >
                {({ active, checked }) => (
                  <div className="text-center">
                    <RadioGroup.Label
                      as="p"
                      className={`text-base font-semibold  ${
                        checked ? 'text-brand-light' : 'text-brand-dark'
                      }`}
                    >
                      {tips.value}
                    </RadioGroup.Label>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {/* End of date schedule */}
      </div>
    </div>
  );
}
