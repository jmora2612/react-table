import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { fetchApi } from "./helpers/fetchApi";
import { UsersList } from "./components/UsersList";
export const App = () => {
  const [users, setUsers] = useState([]);
  const first = useRef();
  const [filters, setFilter] = useState(null);
  const [country, setCountry] = useState(false);

  const usersData = async () => {
    const data = await fetchApi();
    first.current = data;
    setUsers(data);
  };

  const deletes = (email) => {
    const filter = users.filter((el) => el.email !== email);
    setUsers(filter);
  };

  const onReset = () => {
    setUsers(first.current);
  };

  const filterValue = useMemo(() => {
    console.log("filterValue");
    return filters
      ? users.filter((el) =>
          el.location.country.toLowerCase().includes(filters.toLowerCase())
        )
      : users;
  }, [users, filters]);

  const sortCountry = useMemo(() => {
    console.log("sortCountry", );
    return country
      ? filterValue.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filterValue;
  }, [filterValue, country]);

  const countrys = () => {
    setCountry((setState) => !setState);
  };

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
            onChange={(event) => setFilter(event.target.value)}
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
            {sortCountry?.map((el) => (
              <UsersList key={el?.email} users={el} deletes={deletes} />
            ))}
          </table>
        </main>
      </div>
    </>
  );
};
