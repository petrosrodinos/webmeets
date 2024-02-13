import { FC, useState } from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import Slider from "react-slick";
import MeetPlaceholder from "../../../../public/meet-placeholder.jpg";

interface CarouselProps {
  images: string[];
  dots?: boolean;
  arrows?: boolean;
  fade?: boolean;
  infinite?: boolean;
  autoplay?: boolean;
  speed?: number;
  autoplaySpeed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
}

const Carousel: FC<CarouselProps> = ({
  dots = true,
  arrows = false,
  fade = true,
  infinite = true,
  autoplay = false,
  speed = 500,
  autoplaySpeed = 5000,
  slidesToShow = 1,
  slidesToScroll = 1,
  images,
}) => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <Box position={"relative"} height={"max-content"} width={"full"} overflow={"hidden"}>
      {images.length > 1 && (
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            slider?.slickPrev();
          }}
        >
          <MdArrowBackIosNew size="20px" />
        </IconButton>
      )}
      {images.length > 1 && (
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            slider?.slickNext();
          }}
        >
          <MdArrowForwardIos size="20px" />
        </IconButton>
      )}
      <Slider
        dots={dots}
        arrows={arrows}
        fade={fade}
        infinite={infinite}
        autoplay={autoplay}
        speed={speed}
        autoplaySpeed={autoplaySpeed}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        ref={(slider: any) => setSlider(slider)}
      >
        {images.length == 0 && (
          <Box
            height="210px"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
          >
            <img
              style={{ height: "100%", objectFit: "cover" }}
              alt="meet-placeholder-image"
              src={MeetPlaceholder}
            />
          </Box>
        )}

        {images.length >= 1 &&
          images.map((image: string, index: number) => (
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
