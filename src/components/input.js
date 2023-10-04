import React from "react";

export function Input3(props) {
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
    </div>
  );
}
export function Input2(props) {
  return (
    <div className="sm:col-span-2">
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
