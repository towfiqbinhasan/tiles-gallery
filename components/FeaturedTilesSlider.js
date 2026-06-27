"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TileCard from "@/components/TileCard";

export default function FeaturedTilesSlider({ tiles }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="pb-12"
    >
      {tiles.map((tile) => (
        <SwiperSlide key={tile.id}>
          <TileCard tile={tile} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
