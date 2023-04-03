import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from "swiper";
import {Error} from '../components';


import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


const TopChartCard = ({song, index}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg curor-pointer mb-2">
      {song.title}
    </div>
  )
}


const TopPlay = () => {

  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state) =>
    state.player
  );
  
  const {data, error} = useGetTopChartsQuery();
  const divRef = useRef(null);

  if(error) return <Error />

  useEffect(() => {
    divRef.current.scrollIntoView({behavior : 'smooth'})
  })

  console.log(data)

  const handlePauseClick = () =>{
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, index}));
    dispatch(playPause(true))
  }

  return (<div ref={divRef} className='xl:ml-6 ml-0 xl:mb:0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
  <div className="w-full flex flex-col">
    <div className="flex flex-row justify-between">
      <h2 className="text-white font-bold text-2xl">
        Top Charts
      </h2>
      <Link to='/top-charts'>
        <p className="text-gray-300 text-base cursor-pointer ">See more</p>
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        {[1,2].map((song, i) => (
          <TopChartCard
            key={song.key} 
            song={song}
            index={i}
          /> 
        ))}
      </div>     
    </div>
  </div>
  </div>)
};

export default TopPlay;
