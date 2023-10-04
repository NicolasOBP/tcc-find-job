import React from "react";

export default function Videoscurri(props) {
  return (
    <div className="flex mb-4 border-2 border-gray-600 rounded-xl p-4">
      <div>
        <iframe
          width="560"
          height="315"
          src={props.url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className="flex justify-center items-center p-6">
        <h2 className="text-xl">{props.texto}</h2>
      </div>
    </div>
  );
}
