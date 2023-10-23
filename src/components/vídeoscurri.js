import React from "react";

export default function Videoscurri(props) {
  return (
    <div className="flex justify-center flex-wrap mb-4 border-2 border-gray-600 rounded-xl p-4">
    
    
        <iframe
          width="460rem"
          height="215rem"
          src={props.url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          className="grid justify-items-center"
        ></iframe>
      
    
      <div className="flex justify-center items-center p-6">
        <h2 className="text-xl">{props.texto}</h2>
      </div>
    </div>
  );
}
