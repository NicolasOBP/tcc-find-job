import { Menu } from "@headlessui/react";
import React from "react";

export default function Dropdown(props) {
  let i = 0;
  return (
    <div className="sm:col-span-1 ">
      <label className="block text-md font-bold leading-6 text-black-900">
        {props.label}
      </label>
      <div className="mt-2">
        <select
          className="block w-full rounded-md border-0 py-2 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-black-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={props.get}
          onChange={(ev) => props.set(ev.target.value)}
        >
          <option value={""}>Selecione</option>
          {props.dad.map((v) => (
            <option key={i++}>{v}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
export function DropBox(props) {
  let i = 0;

  function handleSelect(v) {
    props.set((old) => {
      const alreadyExists = old.includes(v);

      if (alreadyExists == true) {
        const index = old.findIndex((valor) => valor == v);
        old.splice(index, 1);
        return [...old];
      }
      return [...old, v];
    });
  }
  return (
    <Menu as="div" className="relative w-80">
      <Menu.Button className="relative rounded-lg font-bold border-2 border-gray-300 p-2 text-black-900 focus:outline-none">
        <span className="absolute -inset-1.5" />
        <span>{props.label}</span>
      </Menu.Button>
      <Menu.Items className="absolute h-40 right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none comentario">
        {props.dad.map((v) => (
          <div key={i++} className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={props.get.includes(v)}
              onChange={() => handleSelect(v)}
              className="w-4 h-4 ml-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {v}
            </label>
          </div>
        ))}
      </Menu.Items>
    </Menu>
  );
}
