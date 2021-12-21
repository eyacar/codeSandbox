import FlightHelper from "../../../../helpers/FlightHelper";

const FlightCard = ({ flightData }) => {
  const {
    flightNumber,
    departureDate = new Date().toString(),
    arrivalDate = new Date().toString(),
    pricesAfterTax = 0
  } = flightData;

  const helper = new FlightHelper();

  return (
    <>
      <h1>Flight N°: {flightNumber || "No Data"}</h1>
      <h1>Departure: {helper.dateFormatter(departureDate)}</h1>
      <h1>Arrival: {helper.dateFormatter(arrivalDate)}</h1>
      <h1>Duration: {helper.flightDuration(departureDate, arrivalDate)}</h1>
      <h1>Price after Taxes: {pricesAfterTax}</h1>
    </>
  );
};

export default FlightCard;
