import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export function Input3(props) {
  const isValid = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(props.get);

  return (
    <div className="sm:col-span-3">
      <label className="block text-md font-bold leading-6 text-black-900">
        {props.nomeLabel}
      </label>
      <div className="mt-2">
        <input
          disabled={props.disa}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={props.get}
          onChange={(ev) => props.set(ev.target.value)}
          type={props.tipo}
          placeholder={props.placeh}
        />
      </div>
      {props.nomeLabel == "Nome Completo" ? (
        props.get ? (
          !isValid ? (
            <p className="text-red-500">Não pode conter números</p>
          ) : (
            <></>
          )
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
export function Input2(props) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="sm:col-span-2">
      <label className="block text-md font-bold leading-6 text-black-900">
        {props.nomeLabel}
      </label>
      <div className="flex items-center mt-2">
        <input
          disabled={props.disa}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={props.get}
          onChange={(ev) => props.set(ev.target.value)}
          type={showPass ? "text" : props.tipo}
          placeholder={props.placeh}
        />
        {props.tipo == "password" ? (
          showPass ? (
            <AiFillEyeInvisible onClick={() => setShowPass(false)} size={30} />
          ) : (
            <AiFillEye onClick={() => setShowPass(true)} size={30} />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export function Input1({ set, nomeLabel, disa, placeh, tipo, get, ...rest }) {
  return (
    <div className="sm:col-span-1">
      <label className="block text-md font-bold leading-6 text-black-900">
        {nomeLabel}
      </label>
      <div className="mt-2">
        <input
          disabled={disa}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={get}
          onChange={(ev) => set(ev.target.value)}
          type={tipo}
          placeholder={placeh}
          {...rest}
        />
      </div>
    </div>
  );
}
