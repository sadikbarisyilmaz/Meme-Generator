import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const MemeContext = React.createContext();

function MemeProvider({ children }) {
  const [memes, setMemes] = useState([]);
  const [randomMeme, setRandomMeme] = useState();
  const getMemes = async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const data = await res.json();
    const memes = await data.data.memes;
    setRandomMeme(
      memes.filter((meme) => meme.box_count === 2)[
        Math.floor(Math.random() * 66)
      ]
    );
    return memes;
  };

  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["memes"], queryFn: getMemes });

  const getRandomMeme = () => {
    setRandomMeme(
      query.data.filter((meme) => meme.box_count === 2)[
        Math.floor(Math.random() * 66)
      ]
    );
  };

  return (
    <MemeContext.Provider
      value={{ memes, setMemes, randomMeme, setRandomMeme, getRandomMeme }}
    >
      {children}
    </MemeContext.Provider>
  );
}

export { MemeContext, MemeProvider };
