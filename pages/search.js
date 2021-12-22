import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FlightHelper from "../helpers/FlightHelper";
import StaticHelper from "../helpers/StaticHelper";
import ListOfCards from "./components/ListOfCards";
import epaCor from "../data/epa-cor.json";
import epaMdz from "../data/epa-mdz.json";

import css from "./style/search.module.css";

const flights = [...epaCor.flights, ...epaMdz.flights];

export default function Search() {
  const [isOrigin, setIsOrigin] = useState(null);
  const [title, setTitle] = useState("");
  const [availableAirport, setAvailableAirport] = useState(null);
  const [selectedAirport, setSelectedAirport] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const params = StaticHelper.getUrlParams("airportSortValue");

    const isValidParam = params === "origin" || params === "destination";

    if (!params || !isValidParam) return null;

    let isOrigin = router.query.airportSortValue?.includes("origin");

    // If query is not unidefined or null isOrigin is a boolean
    if (typeof isOrigin === "boolean") return setIsOrigin(isOrigin);

    // To prevent the undefined type from next-router query when page is reloaded.
    let paramsFromReload = params === "origin";
    setIsOrigin(paramsFromReload);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOrigin !== null && typeof isOrigin !== "undefined") {
      setTitle(isOrigin ? "origin" : "destination");
    }
  }, [isOrigin]);

  useEffect(() => {
    let availableAirport = new FlightHelper();
    if (title) {
      setAvailableAirport(
        availableAirport.listOfAvailableAirports({ place: title, flights })
      );
    }
  }, [title]);

  function handleItemSelection(isItemSelected) {
    setSelectedAirport(isItemSelected);
  }

  const availableAirportList = useMemo(() => {
    if (!availableAirport)
      return (
        <>
          <h1>
            There is not an avilable airport at this moment or you didn't
            specified the place of search
          </h1>
          <Link href="/">Go Home</Link>
        </>
      );

    return (
      <ListOfCards
        data={availableAirport}
        handleItemSelection={handleItemSelection}
      />
    );
  }, [availableAirport]);

  const link = useMemo(() => {
    if (title) {
      if (!selectedAirport)
        return (
          <p className={css.container__link}>You need to select an airport</p>
        );

      let airportCode = selectedAirport;
      return (
        <Link
          href={{
            pathname: "/flights",
            query: { airportCode }
          }}
        >
          {/*eslint-disable-next-line*/}
          <a className={css.container__link}>Start your journey!</a>
        </Link>
      );
    }
  }, [title, selectedAirport]);

  return (
    <main>
      <article className={css.container}>
        <h1 className={css.container__title}>Select your {title}</h1>
        <section>{availableAirportList}</section>
        {link}
      </article>
    </main>
  );
}
