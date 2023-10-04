import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState, useContext } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo2 from "../imgs/findjobcopia.png";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Cadcurriculo from "./cadCurriculo";
import Modal1 from "./modals";
import { auth } from "../firebase/config";
import { Dados } from "../context/context";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiCloseCircleLine } from "react-icons/ri";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const navigation = [
    { name: "Cadastre-se", href: "/selecao-usu", current: true },
    {
      name: "Já tem um cadastro, Logue aqui!",
      href: "/",
      current: false,
    },
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-white border border-gray-300 rounded-xl shadow-xl"
    >
      {({ open }) => (
        <>
          <div className="mx-auto p-1 sm:px-6 lg:px-10">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden p-5">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-blue-950 hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir menu principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-10 rounded"
                    src={Logo2}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-blue-900 text-white"
                            : "text-blue-900 hover:bg-blue-900 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-blue-950 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
