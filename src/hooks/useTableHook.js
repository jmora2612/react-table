import { useEffect, useMemo, useRef, useState } from "react";
import { fetchApi } from "../helpers/fetchApi";

export const useTableHook = () => {
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
    

    //con esto limpiamos el filtro de paises y devolvemos la tabla a su estado original
    //setFilter(null);

    //fileInputRef para limpiar el value de input usando su referencia
    // fileInputRef.current.value = "";
  };

  const setFunctionFilter = (value) => {
    setFilter(value);
  };

  //traer referencia del input
  let fileInputRef = useRef();

  const filterValue = useMemo(() => {
    return filters
      ? users.filter((el) =>
          el.location.country.toLowerCase().includes(filters.toLowerCase())
        )
      : users;
  }, [users, filters]);

  const sortCountry = useMemo(() => {
    return country
      ? filterValue.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filterValue;
  }, [filterValue, country]);

  const countrys = () => {
    setCountry((setState) => !setState);
  };

  return {
    users,
    usersData,
    deletes,
    onReset,
    sortCountry,
    countrys,
    setFunctionFilter,
    // fileInputRef
  };
};
