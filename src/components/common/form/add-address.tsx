import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import Map from '@components/ui/map';
import { useTranslation } from 'src/app/i18n/client';

interface ContactFormValues {
  title: string;
  default: boolean;
  lat: number;
  lng: number;
  formatted_address?: string;
}

const AddAddressForm: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang);
  const { data } = useModalState();

  const { closeModal } = useModalAction();

  function onSubmit(values: ContactFormValues, e: any) {
    console.log(values, 'Add Address');
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      title: data || data?.title ? data?.title : '',
      default: data || data?.default ? data?.default : '',
      formatted_address:
        data || data?.address?.formatted_address
          ? data?.address?.formatted_address
          : '',
    },
  });

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-add-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label={t('text-delivery-address-title')}
            {...register('title', { required: 'Title Required' })}
            error={errors.title?.message}
            lang={lang}
          />
        </div>
        <div className="grid grid-cols-1 mb-6 gap-7">
          <Map
            lat={0}
            lng={0}
            height={'420px'} // lat={data?.address?.lat || 1.295831}
            // lng={data?.address?.lng || 103.76261}
            // height={'420px'}
            // zoom={15}
            // showInfoWindow={false}
            // mapCurrentPosition={(value: string) =>
            //   setValue('formatted_address', value)
            // }
          />
          <TextArea
            label={t('text-delivery-address-full')}
            {...register('formatted_address', {
              required: 'forms:address-required',
            })}
            error={errors.formatted_address?.message}
            className="text-brand-dark"
            variant="solid"
            lang={lang}
          />
        </div>
        <div className="flex justify-end w-full">
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
