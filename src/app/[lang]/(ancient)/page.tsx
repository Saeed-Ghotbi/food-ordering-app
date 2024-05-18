import Container from '@components/ui/container';
import { heroSevenBanner } from '@framework/static/banner';
import BannerCard from '@components/cards/banner-card';
import CategoryWithProducts from '@components/common/category-with-products';
import dynamic from 'next/dynamic';
import Footer from '@layouts/footer/footer';
import { Metadata } from 'next';
const CartSidebar = dynamic(() => import('@components/cart/cart-sidebar'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Ace Burger',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <Container className="flex gap-x-7 mx-auto max-w-[1920px] relative" clean>
        <div className="w-full 2xl:w-[calc(100%-428px)] 3xl:w-[calc(100%-478px)] px-4 md:px-6 lg:px-8 ltr:2xl:pl-10 rtl:2xl:pr-10 ltr:2xl:pr-0 rtl:2xl:pl-0">
          <BannerCard
            banner={heroSevenBanner}
            effectActive={true}
            lang={lang}
          />
          <CategoryWithProducts lang={lang} className="mt-8" />

          <Footer variant="medium" lang={lang} />
        </div>
        <div className="hidden 2xl:block 2xl:w-[400px] 3xl:w-[450px] h-[calc(100vh-80px)] shrink-0 fixed bg-white 2xl:ltr:right-0 2xl:rtl:left-0 4xl:ltr:left-[calc(50%+512px)] 4xl:rtl:right-[calc(50%+512px)] border border-gray-100 top-20">
          <CartSidebar lang={lang} />
        </div>
      </Container>
    </>
  );
}
