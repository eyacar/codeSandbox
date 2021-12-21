import { useMemo } from "react";
import PropTypes from "prop-types";
import FlightCard from "./components/FlightCard";
import Airports from "../../../data/airports.json";
import Airplane from "../../../asset/airplane.jpeg";
import Trip from "../../../asset/trip.jpeg";

const AirportCard = ({
  airportCode,
  handleSelection = () => {},
  isFlightCard,
  flightData
}) => {
  const location = useMemo(() => {
    if (!airportCode) return "We didn't  have the location";
    let airports = Airports.airports;

    let airport = airports.find(({ code }) => code === airportCode);

    return airport.location;
  }, [airportCode]);

  const imgSrc = useMemo(() => (isFlightCard ? Trip.src : Airplane.src), [
    isFlightCard
  ]);

  return (
    <div
      onClick={() =>
        handleSelection(
          isFlightCard ? isFlightCard.flightNumber || 0 : airportCode
        )
      }
    >
      <img src={imgSrc} alt="Airplane" width="200" height="200" />
      <h1>Airport Code: {airportCode}</h1>
      <h1>Location: {location}</h1>
      {isFlightCard && <FlightCard flightData={flightData} />}
    </div>
  );
};

AirportCard.propTypes = {
  airportCode: PropTypes.string.isRequired, // Code of the airport
  handleSelection: PropTypes.func, // A handler for selection
  isFlightCard: PropTypes.bool,
  flightData: PropTypes.shape({
    flightNumber: PropTypes.number,
    departureDate: PropTypes.string,
    arrivalDate: PropTypes.string,
    pricesAfterTax: PropTypes.number
  })
};

export default AirportCard;
