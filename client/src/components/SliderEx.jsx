import React from "react";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./slideEx.css";
import {slideImages} from "../data";

SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);

const SliderEx = () => {
    return (
        <div className="main-swiper">
            <Swiper
                effect={"coverflow"}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                className="mySwiper"
                aria-label="Image Slider"
            >
                {/* using array */}
                {slideImages.map((img, i) => {
                    return (
                        <SwiperSlide key={i} aria-label="Image Slider">
                            <img src={img.img} alt={img.desc} />
                        </SwiperSlide>
                    );
                })}

            </Swiper>
        </div>
    );
};

export default SliderEx;