import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import StaticHelper from "../helpers/StaticHelper";
import Cards from "./components/Cards/Cards";
import Airports from "../data/airports.json";
import epaCor from "../data/epa-cor.json";
import epaMdz from "../data/epa-mdz.json";

const flights = [...epaCor.flights, ...epaMdz.flights];

export default function Flights() {
  const [hasUrlParams, setHasUrlParams] = useState(null);
  const [airportCode, setAirportCode] = useState(null);
  // const [selectedAirport, setSelectedAirport] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const paramCode = window && StaticHelper.getUrlParams("airportCode");

    setHasUrlParams(Boolean(paramCode));

    const airportCodeQuery = router.query.airportCode;

    const hasQuery = typeof airportCodeQuery === "string";

    // If query is not unidefined or null
    if (hasQuery) {
      setAirportCode(airportCodeQuery);
    } else {
      // To prevent the undefined type from next-router query when page is reloaded.
      setAirportCode(paramCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (airportCode) {
      let airports = Airports.airports;
      const isAValidParam = airports.some((e) => e.code === airportCode);
      setHasUrlParams(isAValidParam);
    } else {
      setHasUrlParams(false);
    }
  }, [airportCode]);

  const airportCity = useMemo(() => {
    if (!airportCode) return;
    let airports = Airports.airports;
    return airports.find(({ code }) => code === airportCode)?.city;
  }, [airportCode]);

  const listOfFlights = (filter, airportCode) => {
    const arrayFilter = {
      origin: flights.filter(({ origin }) => origin === airportCode),
      destination: flights.filter(
        ({ destination }) => destination === airportCode
      )
    };

    function flightData(data) {
      return {
        flightNumber: data.flightNo,

        departureDate: data.departureDate,
        arrivalDate: data.arrivalDate,
        pricesAfterTax: data.fares[0].prices.afterTax
      };
    }

    return (
      <ul>
        {arrayFilter[filter].map((e, i) => (
          <li key={i}>
            <Cards
              airportCode={airportCode === e.origin ? e.destination : e.origin}
              isFlightCard
              flightData={flightData(e)}
            />
          </li>
        ))}
      </ul>
    );
  };

  if (!hasUrlParams)
    return (
      <>
        <h1>
          First you must to choose a valid Airport and if it's the origin or the
          destination
        </h1>
        <Link href="/">Go Home</Link>
      </>
    );

  return (
    <main>
      <article>
        <h2>Choose your outbound flight to {airportCity}</h2>
        <section>{listOfFlights("destination", airportCode)}</section>
      </article>
      <article>
        <h2>Choose your inbound flight to {airportCity}</h2>
        <section>{listOfFlights("origin", airportCode)}</section>
      </article>
    </main>
  );
}
