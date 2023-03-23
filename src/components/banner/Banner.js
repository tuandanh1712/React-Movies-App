import React from "react";
import useSWR from "swr";
import { fetcher } from "../../apiConfig/config";
import { SwiperSlide, Swiper } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  //// nếu dùng bằng useState và useEffect
  // const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   async function feactData() {
  //     const data = await axios.get(
  //       `https://api.themoviedb.org/3/movie/upcoming?api_key=2608931a2aacaecfaf86030bb19c4e9e`
  //     );
  //     if (data && data.data.results) setMovies(data.data.results);
  //     console.log("data", data.data);
  //   }
  //   feactData();
  // }, []);
  // console.log("Banner", movies);

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=2608931a2aacaecfaf86030bb19c4e9e`,
    fetcher
  );
  const movies = data?.results || [];
  console.log("data banne", movies);
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.key}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { title, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative  ">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`http://image.tmdb.org/t/p/original/${poster_path}`}
        className="w-full h-full object-cover rounded-lg "
        alt=""
      ></img>
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)}>Watch Now</Button>
      </div>
    </div>
  );
}

export default Banner;
