import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constatnt";
import { addGptMovieResult } from "../utils/gptSlice";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest five movies based on the query " +
      searchText.current.value +
      " Only provide the 5 movie names, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    console.log(gptQuery);

    // const gptResults = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: gptQuery }],
    // });

    // if (!gptResults.choices) {
    //   // TODO Error Handling
    // }

    // console.log(gptResults.choices?.[0]?.message?.content);
    // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    // const gptMovies = [
    //   "Hera Pheri",
    //   "Andaz Apna Apna",
    //   "Dhamaal",
    //   "Chupke Chupke",
    //   "Golmaal",
    // ];
    
    const gptMovies = [
      "Raaz",
      "1920",
      "Haunted 3D",
      "Krishna Cottage",
      "Creature 3D",
    ];

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    console.log("TMDB Results:", tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center ">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-4 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {" "}
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
