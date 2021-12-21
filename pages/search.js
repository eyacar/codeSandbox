import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FlightHelper from "../helpers/FlightHelper";
import StaticHelper from "../helpers/StaticHelper";
import Cards from "./components/Cards/Cards";
import epaCor from "../data/epa-cor.json";
import epaMdz from "../data/epa-mdz.json";

const flights = [...epaCor.flights, ...epaMdz.flights];

export default function Search() {
  const [isOrigin, setIsOrigin] = useState(null);
  const [title, setTitle] = useState("");
  const [availableAirport, setAvailableAirport] = useState(null);
  const [selectedAirport, setSelectedAirport] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const params = StaticHelper.getUrlParams("airportSortValue");

    if (!params) return null;

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

  function handleSelection(code) {
    setSelectedAirport(code);
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
      <ul>
        {availableAirport.map((code, i) => (
          <li key={i}>
            {selectedAirport === code && "holaaaaaaaaa"}
            <Cards airportCode={code} handleSelection={handleSelection} />
          </li>
        ))}
      </ul>
    );
  }, [availableAirport, selectedAirport]);

  const link = useMemo(() => {
    if (title) {
      if (!selectedAirport)
        return (
          /*eslint-disable-next-line*/
          <a>You need to select an airport</a>
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
          <a>Start your journey!</a>
        </Link>
      );
    }
  }, [title, selectedAirport]);

  return (
    <main>
      <article>
        <h1>Select your {title}</h1>
        <section>{availableAirportList}</section>
        {link}
      </article>
    </main>
  );
}
