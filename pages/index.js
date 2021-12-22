import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import css from "./style/index.module.css";

export default function Home() {
  const refAirportSortValue = useRef();
  const [airportSortValue, setAirportSortValue] = useState(null);

  useEffect(() => {
    if (refAirportSortValue.current.value) {
      setAirportSortValue(refAirportSortValue.current.value);
    }
  }, []);

  function handleChang() {
    let value = refAirportSortValue.current.value;
    setAirportSortValue(value);
  }

  const link = useMemo(() => {
    if (airportSortValue)
      return (
        <Link
          href={{
            pathname: "/search",
            query: { airportSortValue }
          }}
        >
          {/*eslint-disable-next-line*/}
          <a className={css.container__link}>Search</a>
        </Link>
      );
  }, [airportSortValue]);

  return (
    <main className={css.container}>
      <h1>Home Page</h1>
      <article>
        <section>
          <h2>Promotions</h2>
        </section>
        <section>
          {link}
          <br />
          <br />
          <label>By</label>
          <select
            ref={refAirportSortValue}
            onChange={handleChang}
            className={css.container__input}
          >
            <option value="origin" defaultValue>
              Origin
            </option>
            <option value="destination">Destination</option>
          </select>
        </section>
      </article>
    </main>
  );
}
