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

export default function NavbarC(props) {
  const [modalCu, setModalCu] = useState(false);

  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");
  const [showBtn, setShowBtn] = useState(true);

  const { setSelecFilter, selecFilter, dados, filter } = useContext(Dados);

  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/home", current: true },
    { name: "Vagas Aplicadas", href: "/vagas-aplicadas", current: false },
    {
      name: "Não sabe montar um currículo? Clique aqui!!",
      href: "/montar-currículo",
      current: false,
    },
    { name: "Cadastrar/Atualizar currículo", href: "#", current: false },
  ];

  async function logout() {
    localStorage.removeItem("user");
    await auth.signOut();

    setContModal("Deslogado com sucesso");
    setShowBtn(false);
    setModal(true);

    setTimeout(() => {
      setModal(false);
      navigate("/");
    }, 1500);
  }

  return (
    <Disclosure
      as="nav"
      className="bg-white border border-gray-300 m-4 rounded-xl shadow-xl"
    >
      {({ open }) => (
        <>
          <Cadcurriculo open={modalCu} setM={setModalCu} />
          <Modal1
            btn={showBtn}
            cont={conteModal}
            open={modal}
            setM={setModal}
          />
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
                    {navigation.map((item) =>
                      item.name == "Cadastrar/Atualizar currículo" ? (
                        <button
                          onClick={() => setModalCu(true)}
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-blue-900 text-white"
                              : "text-blue-900 hover:bg-blue-900 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </button>
                      ) : (
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
                      )
                    )}
                  </div>
                </div>
              </div>

              {props.perf ? (
                <div className="relative ml-3">
                  <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span
                      onClick={() => navigate("/perfil-candidato")}
                      className="absolute -inset-1.5"
                    />
                    {dados.perfilimg ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={dados.perfilimg}
                        alt=""
                      />
                    ) : (
                      <IoPersonCircleSharp className="h-9 w-9 text-gray-500" />
                    )}
                  </button>
                </div>
              ) : props.svaga ? (
                <div className="flex absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-between">
                  <button
                    onClick={() => navigate("/perfil-candidato")}
                    className="rounded-lg p-1 font-semibold text-md text-purple border border-2 border-blue-950 shadow-md"
                  >
                    Voltar
                  </button>
                </div>
              ) : props.logout ? (
                <div className="flex absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-between">
                  <button
                    className="rounded-lg bg-red-500 p-1 font-semibold text-md text-white shadow-md"
                    onClick={logout}
                  >
                    Encerrar sessão
                  </button>
                </div>
              ) : (
                <div className="flex absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-between">
                  {/* dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="relative flex rounded-xl font-bold border-2 border-blue-900 p-2 text-blue-900 focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <span>Filtrar</span>
                      <BsSearch className="h-6 w-6 ml-1" />
                    </Menu.Button>

                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {filter.length ? (
                        filter.map((v) => (
                          <Menu.Item>
                            {({ active }) => (
                              <option
                                onClick={() => setSelecFilter(v)}
                                style={{ cursor: "pointer" }}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {v}
                              </option>
                            )}
                          </Menu.Item>
                        ))
                      ) : (
                        <h1>Não há filtros</h1>
                      )}
                    </Menu.Items>
                  </Menu>
                  {selecFilter == "" ? (
                    <></>
                  ) : (
                    <RiCloseCircleLine
                      onClick={() => setSelecFilter("")}
                      className="w-10 h-10 text-red-600"
                      style={{ cursor: "pointer" }}
                    />
                  )}

                  <div className="relative ml-3">
                    <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span
                        onClick={() => navigate("/perfil-candidato")}
                        className="absolute -inset-1.5"
                      />
                      {dados.perfilimg ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={dados.perfilimg}
                          alt=""
                        />
                      ) : (
                        <IoPersonCircleSharp className="h-9 w-9 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              )}
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
