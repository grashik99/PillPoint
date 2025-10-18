import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import useAuthInfo from "../../../hooks/useAuthInfo";
import { Link } from "react-router";

const Banner = () => {
  const { banners } = useAuthInfo();

  return (
<div className="w-full py-8 bg-gray-100">
  <Swiper
    slidesPerView={3}                 
    spaceBetween={30}
    freeMode={true}                    
    pagination={{ clickable: true }}   
    modules={[FreeMode, Pagination, Autoplay]}
    autoplay={{ delay: 2000, disableOnInteraction: false }}
    loop={true}
    className="mySwiper"
  >
    {banners
      ?.filter((banner) => banner.approval)
      .map((banner) => (
        <SwiperSlide 
          key={banner._id}
          className="rounded-lg overflow-hidden shadow-lg bg-base-200"
        >
          <Link to="/shop" className="block w-full h-full">
            <img
              src={banner.imgUrl}
              alt={banner.itemName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{banner.itemName}</h2>
              <p className="text-sm text-blue-400">{banner.company}</p>
              <p className="text-md font-semibold mt-1">
                Tk {banner.perUnitPrice}{" "}
                {banner.discount && banner.discount !== "0" && (
                  <span className="text-yellow-400 ml-2">
                    ({banner.discount}% OFF)
                  </span>
                )}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
  </Swiper>
</div>

  );
};

export default Banner;
