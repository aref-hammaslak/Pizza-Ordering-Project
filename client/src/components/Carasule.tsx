import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/bundle";

type SwiperProps = {
  images: string[],
}


const Carasule = ({images}:SwiperProps) => {
  const swiperModules = [Navigation, Pagination, Scrollbar, A11y, Autoplay];

  const swiperElemets = images.map(
    (image: string, index:number) => {
      return (
        <SwiperSlide id={index+ ''}>
          <div className=" overflow-hidden rounded-md">
            <img
              className="w-full  overflow-hidden object-cover "
              src={image}
            />
          </div>
        </SwiperSlide>
      );
    }
  );



  return (
    <Swiper
      modules={swiperModules}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay
      pagination={{ clickable: true }}
    >
      {swiperElemets}
    </Swiper>
  );
};

export default Carasule;
