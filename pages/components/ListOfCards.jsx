import { useState, Fragment } from "react";
import Cards from "./Cards/Cards";
import PropTypes from "prop-types";

import css from "./style/listOfCards.module.css";

const ListOfCards = ({
  data,
  handleItemSelection,
  isFlightCard = false,
  airportCode
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  function handleSelection(value) {
    setSelectedItem(value);
    handleItemSelection && handleItemSelection(value);
  }

  function flightData(data) {
    return {
      flightNumber: data.flightNo,
      departureDate: data.departureDate,
      arrivalDate: data.arrivalDate,
      pricesAfterTax: data.fares[0].prices.afterTax
    };
  }

  function realAirportCode(element) {
    if (!isFlightCard) return element;

    /* 
    For cases where we have a flight list the Airport Code need to be de oposite of de Airport selected.
    For example if you selected an origin Airport the list of flights it's going to be of destination.
    */

    return airportCode === element.origin
      ? element.destination
      : element.origin;
  }

  const unSelectButton = (itemSelected) => {
    if (
      (selectedItem === itemSelected && !isFlightCard) ||
      (selectedItem === itemSelected.flightNo && isFlightCard)
    )
      return (
        <button
          onClick={() => handleSelection(null)}
          className={css.container__button}
        >
          Undo Selection
        </button>
      );
    else return null;
  };

  const selectedClass = (itemSelected) => {
    if (
      (selectedItem === itemSelected && !isFlightCard) ||
      (selectedItem === itemSelected.flightNo && isFlightCard)
    )
      return css["container__item--selected"];
    return css.container__item;
  };

  return (
    <ul className={css.container}>
      {data.map((element, i) => (
        <Fragment key={i}>
          <li className={selectedClass(element)}>
            <Cards
              airportCode={realAirportCode(element)}
              handleSelection={handleSelection}
              isFlightCard={isFlightCard}
              flightData={isFlightCard ? flightData(element) : null}
            />
          </li>
          {unSelectButton(element)}
        </Fragment>
      ))}
    </ul>
  );
};

ListOfCards.propTypes = {
  data: PropTypes.array, // It's can be an Array of Airport code or an Array of Flight depending of wich list we are (Flight || Airport)
  handleItemSelection: PropTypes.func, // For parent handler
  isFlightCard: PropTypes.bool,
  airportCode: PropTypes.string // For the cases of a Flight list we need the airport code to compare and show the other destination of the flight
};

export default ListOfCards;
