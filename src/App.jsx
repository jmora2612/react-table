import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import { UsersList } from "./components/UsersList";
import { useTableHook } from "./hooks/useTableHook";
export const App = () => {
  const {
    users,
    usersData,
    deletes,
    onReset,
    sortCountry,
    countrys,
    setFunctionFilter,
    // fileInputRef
  } = useTableHook();

  useEffect(() => {
    usersData(users);
  }, []);

  return (
    <>
      <h1>Prueba tecnica</h1>
      <div className="App">
        <header>
          <button onClick={countrys} style={{ marginRight: "10px" }}>
            Ordenar por pais
          </button>
          <button onClick={onReset} style={{ marginRight: "10px" }}>
            Restaurar estado inicial
          </button>
          <input
          // ref={fileInputRef}
            onChange={(event) => setFunctionFilter(event.value)}
            type="text"
            placeholder="Filtrar por pais"
          />
        </header>
        <main>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Foto</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Pais</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            {sortCountry.length > 0 ? (
              sortCountry?.map((el) => (
                <UsersList key={el?.email} users={el} deletes={deletes} />
              ))
            ) : (
              <tbody>
              <tr>
                <td colSpan="5">No existe registro</td>
              </tr>
              </tbody>
            )}
          </table>
        </main>
      </div>
    </>
  );
};
