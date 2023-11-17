'use client';

import { FC, useState } from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';
import Slider from 'react-slick';

interface CarouselProps {
  images: string[];
}

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel: FC<CarouselProps> = () => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const images = [
    'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    'https://images.unsplash.com/photo-1438183972690-6d4658e3290e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2274&q=80',
    'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
  ];

  const top = useBreakpointValue({ base: '90%', md: '20%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  return (
    <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <MdArrowBackIosNew size="20px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <MdArrowForwardIos size="20px" />
      </IconButton>
      <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
        {images.map((image: string, index: number) => (
          <Box
            key={index}
            height="210px"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${image})`}
          ></Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
