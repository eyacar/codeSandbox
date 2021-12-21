export default class FlightHelper {
  listOfAvailableAirports({ place, flights }) {
    let airportsAvilable = flights.reduce((acummulator, element) => {
      let airport = element[place];
      if (acummulator.includes(airport)) return [...acummulator];
      return [...acummulator, airport];
    }, []);
    return airportsAvilable;
  }

  minuteFormatter = (minute) => (minute >= 10 ? minute : "0" + minute);

  dateFormatter(dateString) {
    let date = new Date(dateString);
    let day = date.getDate();
    let mounth = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();

    return `${day}/${mounth}/${year} at ${hour}:${this.minuteFormatter(
      minute
    )}`;
  }

  flightDuration(departure, arrival) {
    let arrivalDate = new Date(arrival);
    let departureDate = new Date(departure);

    let millisecondsDuration = arrivalDate.getTime() - departureDate.getTime();

    let minutes = millisecondsDuration / 1000 / 60;

    let hourDuration = Math.floor(minutes / 60);
    let minuteDuration = minutes % 60;

    return `${hourDuration}:${this.minuteFormatter(minuteDuration)}`;
  }
}
