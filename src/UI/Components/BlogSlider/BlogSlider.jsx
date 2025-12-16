import React from "react";
import "./BlogSlider.css";
import BlogCard from "./BlogCard";
import { useBlog } from "../../../context/BlogsContext/blogsContext";
import BlogCardShimmer from "./BlogCardShimmer/BlogCardShimmer";
import { useRouter } from "next/navigation";
import SwiperSlider from "@/UI/Sliders/SwiperSlider/SwiperSlider";
import { getDatePart } from "@/utils/midlewares";

const BlogSlider = () => {
  const router = useRouter();
  const { blogs } = useBlog();

  const handleNavigateToSingleBlog = (item) => {
    router.push(`/single-blog/${item.slug}`, { state: item });
  };


  return (
    <div className="blogs-main-container">
      <h3>
        Exciting Blogs Created By <span>Furniture Depots</span>
      </h3>
      
      <div className="blogs-slider-main-container">
        {blogs && blogs?.length > 0 ? (
          <SwiperSlider
            slidesData={blogs}
            renderSlide={(item) => (
              <BlogCard
                key={item._id}
                navigateToSingleBlog={() => handleNavigateToSingleBlog(item)}
                img={item?.image?.image_url}
                category={item?.category?.name}
                title={item?.title}
                createdBy={item?.author}
                readTime={item.readTime}
                totalViews={item.totalViews}
                comments="4 comments"
                date={getDatePart(item.publishedDate, 'date')}
                month={getDatePart(item.publishedDate, 'month')}
                start="this is short description section of blogs"
              />
            )}
            showDots={true}
            showArrows={false}
            spaceBetween={0}
            breakpoints={{
              0: { slidesPerView: 1 },
              500: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          />
        ) : (
          <div className="blog-card-shimmer-container">
            {Array.from({ length: 3 }).map((_, index) => (
              <BlogCardShimmer />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSlider;
