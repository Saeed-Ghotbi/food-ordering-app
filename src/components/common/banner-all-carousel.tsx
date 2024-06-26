'use client';

import BannerCard from '@components/cards/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';

const breakpoints = {
  '1536': {
    slidesPerView: 5,
    spaceBetween: 14,
  },
  '1280': {
    slidesPerView: 4,
    spaceBetween: 12,
  },
  '1024': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '520': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

interface BannerProps {
  lang: string;
  data: any;
  className?: string;
  buttonSize?: 'default' | 'small';
}

const BannerAllCarousel: React.FC<BannerProps> = ({
  data,
  className = 'mb-6',
  buttonSize = 'default',
  lang,
}) => {
  return (
    <div className={className}>
      <Carousel
        autoplay={false}
        breakpoints={breakpoints}
        buttonSize={buttonSize}
        prevActivateId="all-banner-carousel-button-prev"
        nextActivateId="all-banner-carousel-button-next"
        lang={lang}
      >
        {data?.map((banner: any) => (
          <SwiperSlide key={`all-banner--key${banner.id}`}>
            <BannerCard banner={banner} effectActive={true} lang={lang} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerAllCarousel;
