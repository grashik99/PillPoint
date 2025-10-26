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
    <div className="contain mim-h-[20vh] lg:min-h-[70vh]">
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {banners
          ?.filter((banner) => banner.approval)
          .map((banner) => (
            <SwiperSlide
              key={banner._id}
              className="overflow-hidden"
            >
              <div className="block w-full h-full relative rounded-sm">
                <img
                  src={banner.imgUrl}
                  alt={banner.itemName}
                  className="w-full max-h-[80vh] object-cover rounded-sm"
                />
                <Link to={`/product/${banner._id}`} className="md:p-4 absolute bottom-0 md:bottom-10 bg-white/90 w-full shadow-2xl text-center ">
                  <h2 className="text-lg font-bold text-black">{banner.itemName}</h2>
                  <p className="text-sm text-blue-400">{banner.company}</p>
                  <p className="text-md font-semibold mt-1 text-black
                  ">
                    Tk {banner.perUnitPrice}{" "}
                    {banner.discount && banner.discount !== "0" && (
                      <span className="text-yellow-400 ml-2">
                        ({banner.discount}% OFF)
                      </span>
                    )}
                  </p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>

  );
};

export default Banner;
