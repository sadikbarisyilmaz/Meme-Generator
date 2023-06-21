"use client";
import { useContext, useState } from "react";
import {
  Label,
  Radio,
  RangeSlider,
  Select,
  TextInput,
  Button,
  Spinner,
} from "flowbite-react";
import { MemeContext } from "./context/memeContext";
import { exportComponentAsJPEG } from "react-component-export-image";
import React, { useRef } from "react";

export default function Home() {
  const componentRef = useRef();
  let Draggable = require("react-draggable");
  let DraggableCore = Draggable.DraggableCore;
  const { randomMeme, getRandomMeme, memes } = useContext(MemeContext);

  const [memeValues, setMemeValues] = useState({
    topText: "Top Text",
    bottomText: "Bottom Text",
    caps: "uppercase",
    color: "white",
    shadow: "1px 1px 17px rgba(0,0,0,0.83)",
    size: 2,
    font: "serif",
  });

  const resetHandler = () => {
    setMemeValues({
      topText: "Top Text",
      bottomText: "Bottom Text",
      caps: "uppercase",
      color: "white",
      shadow: "1px 1px 17px rgba(0,0,0,0.83)",
      size: 2,
      font: "Sans",
    });
  };

  const onChangeHandler = (e) => {
    setMemeValues({ ...memeValues, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div
        id="content"
        className="grid lg:grid-cols-2 gap-4 max-w-screen-lg p-8 border-2  justify-center drop-shadow-xl"
      >
        <div className=" flex flex-col gap-20 p-10">
          <div className="text-center grid gap-2">
            <h1 className="text-3xl">Welcome to Meme Generator !</h1>
            <p>
              Click{" "}
              <button className="text-blue-400" onClick={getRandomMeme}>
                Here
              </button>{" "}
              to get a random meme template!
            </p>
          </div>
          {randomMeme ? (
            <div ref={componentRef} className="relative">
              {randomMeme && <img src={randomMeme.url} alt="" />}
              {memeValues.topText && (
                <Draggable>
                  <p
                    className={`font-extrabold  ${memeValues.caps}`}
                    style={{
                      fontFamily: `${memeValues.font}`,
                      textShadow: `${memeValues.shadow}`,
                      color: `${memeValues.color}`,
                      fontSize: `${memeValues.size}rem`,
                    }}
                    id="top"
                  >
                    {memeValues.topText}
                  </p>
                </Draggable>
              )}
              {memeValues.bottomText && (
                <Draggable>
                  <p
                    id="bottom"
                    className={`font-extrabold  ${memeValues.caps}`}
                    style={{
                      fontFamily: `${memeValues.font}`,
                      textShadow: `${memeValues.shadow}`,
                      color: `${memeValues.color}`,
                      fontSize: `${memeValues.size}rem`,
                    }}
                  >
                    {memeValues.bottomText}
                  </p>
                </Draggable>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              {" "}
              <Spinner
                aria-label="Info spinner example"
                color="info"
                size="xl"
              />
            </div>
          )}
          <Button
            color="light"
            onClick={() => exportComponentAsJPEG(componentRef)}
          >
            Export As JPEG
          </Button>
        </div>

        <div className="lg:border-l-2 border-t-2 lg:border-t-0 p-8 grid gap-4">
          <div className="">
            <div className="mb-2">
              <div className="mb-1 block">
                <Label htmlFor="topText" value="Top Text" />
              </div>
              <TextInput
                type="text"
                id="topText"
                name="topText"
                value={memeValues.topText}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <div className="mb-1 block">
                <Label htmlFor="bottomText" value="Bottom Text" />
              </div>
              <TextInput
                type="text"
                id="bottomText"
                name="bottomText"
                value={memeValues.bottomText}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              id="radioCaps"
              name="caps"
              value={memeValues.caps}
            >
              <legend className="mb-4">Caps or No Caps</legend>
              <div className="flex items-center gap-2">
                <Radio
                  id="caps"
                  name="caps"
                  value="uppercase"
                  onChange={onChangeHandler}
                  defaultChecked
                />
                <Label htmlFor="noCaps">Caps</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="noCaps"
                  name="caps"
                  value=""
                  onChange={onChangeHandler}
                />
                <Label htmlFor="germany">No Caps</Label>
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              id="radioColor"
              name="color"
              value={memeValues.color}
              onChange={onChangeHandler}
            >
              <legend className="mb-4">Text Color</legend>
              <div className="flex items-center gap-2">
                <Radio id="white" name="color" value="white" defaultChecked />
                <Label htmlFor="white">White</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="black" name="color" value="black" />
                <Label htmlFor="black">Black</Label>
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              id="radio"
              name="shadow"
              value={memeValues.shadow}
              onChange={onChangeHandler}
            >
              <legend className="mb-4">Text Shadow</legend>
              <div className="flex items-center gap-2">
                <Radio
                  id="shadow"
                  name="shadow"
                  value="1px 1px 17px rgba(0,0,0,0.83)"
                  defaultChecked
                />
                <Label htmlFor="shadow">Shadow</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="shadow" name="shadow" value="none" />
                <Label htmlFor="shadow">No Shadow</Label>
              </div>
            </fieldset>
          </div>
          <div>
            <div className="">
              <Label htmlFor="size" value="Text Size" />
            </div>
            <RangeSlider
              id="size"
              name="size"
              min="1"
              max="3"
              step="1"
              value={memeValues.size}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <div className="" id="select">
              <div className="mb-1 block">
                <Label htmlFor="fonts" value="Select Font" />
              </div>
              <Select
                id="fonts"
                name="font"
                value={memeValues.font}
                onChange={onChangeHandler}
              >
                <option value="cursive">Sans</option>
                <option value="serif">Serif</option>
                <option value="system-ui">System</option>
              </Select>
            </div>
          </div>
          <Button onClick={resetHandler} color="light">
            Reset
          </Button>
        </div>
      </div>
    </main>
  );
}
