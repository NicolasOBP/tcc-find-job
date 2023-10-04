import React from "react";
import { FaRegSadCry } from "react-icons/fa";

export default function Nvaga(props) {
  return (
    <div className="sm:flex sm:items-center">
      <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3 className="flex gap-x-2 text-base font-semibold text-gray-900">
          <FaRegSadCry size={25} />
          {props.title}
          <FaRegSadCry size={25} />
        </h3>
      </div>
    </div>
  );
}
