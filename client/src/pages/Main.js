import React, { Component } from "react";
import "../css/main.css";
import Card from "../components/Card/card";
import Nav from "../components/Nav/nav";
import FillerImages from "../components/FillerImages/filler_card_images";
import EventModal from "../components/EventModal/eventModal";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      error: null,
      isLoaded: false,
      items: [],
      latLocation: 0,
      lngLocation: 0,
      value: "",
      selectedCardName: "",
      selectedCardLocation: "",
      selecteCardRating: ""
    };
  }

  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const geoUrl =
      "https://www.googleapis.com/geolocation/v1/geolocate?key=" +
      process.env.REACT_APP_GOOGLE_API_KEY;
    fetch(geoUrl, {
      method: "POST"
    })
      .then(res => res.json())
      .then(results => {
        console.log(results);
        this.setState({
          latLocation: results.location.lat,
          lngLocation: results.location.lng
        });
        const url =
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=25000&type=" +
          this.state.value +
          "&key=" +
          process.env.REACT_APP_GOOGLE_API_KEY +
          "&location=" +
          this.state.latLocation +
          "," +
          this.state.lngLocation;
        this.state.value
          ? fetch(proxyurl + url)
              .then(res => res.json())
              .then(
                results => {
                  this.setState({
                    isLoaded: true,
                    items: results.results
                  });
                },
                error => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )
          : console.log("api not loaded");
      });
  }

  thePlan = e => {
    this.setState({
      value: e.target.value
    });
    this.componentDidMount();
  };

  dollarFunc = jakesHappieness => {
    switch (jakesHappieness) {
      case 1:
        return "$";
      case 2:
        return "$$";
      case 3:
        return "$$$";
      case 4:
        return "$$$$";
      case 5:
        return "$$$$$";
      default:
        return "No price range to display";
    }
  };

  createEvent = event => {
    const currentCard = this.state.items.filter(
      item => item.id === event.target.id
    );
    this.setState(
      {
        selectedCardName: currentCard[0].name,
        selecteCardRating: currentCard[0].rating,
        selectedCardLocation: currentCard[0].vicinity
      },
      () => console.log(this.state)
    );
  };

  saveFave = event => {
    event.preventDefault();
    const currentCard = this.state.items.filter(
      item => item.id === event.target.id
    );
    const user = JSON.parse(window.localStorage.getItem("user"));
    const data = {
      name: currentCard[0].name,
      location: currentCard[0].vicinity,
      userId: user.id
    };
    console.log(data);
    axios
      .post(`/api/saved_places`, data)
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  toggleBurger = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  };

  storageClear = () => {
    localStorage.clear();
  };

  render() {
    const burgerClass = this.state.collapsed ? "active-burger" : "";
    const showUl = this.state.collapsed ? "showUl" : "";
    const userName = JSON.parse(window.localStorage.getItem("user"));

    return (
      <div className="mainBody">
        <Nav
          toggleBurger={this.toggleBurger}
          burgerClass={burgerClass}
          showUl={showUl}
          storageClear={this.storageClear}
        >
          <a className="btn" href="/main">
            Search
          </a>
          <a className="btn" href="/profile">
            Profile
          </a>
          <a className="btn" href="/" onClick={this.storageClear}>
            Sign Out
          </a>
        </Nav>
        <main className="main-page-container">
          <div className="header-search-container">
            <h2>Welcome {userName.userName}!</h2>
            <p>Search for locations near you</p>
            <div className="searchDiv">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  What's the plan?
                </button>
                <div
                  className="dropdown-menu searchDropdown"
                  aria-labelledby="dropdownMenu2"
                >
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="amusement_park"
                  >
                    Amusement Park
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="aquarium"
                  >
                    Aquarium
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="bakery"
                  >
                    Bakery
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="bar"
                  >
                    Bar
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="bowling_alley"
                  >
                    Bowling Alley
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="cafe"
                  >
                    Cafe
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="casino"
                  >
                    Casino
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="shopping_mall"
                  >
                    Mall
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="movie_theater"
                  >
                    Movie Theater
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="museum"
                  >
                    Museum
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="night_club"
                  >
                    Night Club
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="parking"
                  >
                    Parking
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="restaurant"
                  >
                    Restaurant
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="tourist_attraction"
                  >
                    Popular For Tourists
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.thePlan}
                    type="button"
                    value="zoo"
                  >
                    Zoo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-container">
            {this.state.value ? (
              this.state.items.map(item => (
                <Card
                  name={item.name}
                  rating={item.rating}
                  price={this.dollarFunc(item.price_level)}
                  location={item.vicinity}
                  id={item.id}
                  handleFave={event => this.saveFave(event)}
                  createEvent={event => this.createEvent(event)}
                />
              ))
            ) : (
              <FillerImages />
            )}
          </div>
          <EventModal />
        </main>
      </div>
    );
  }
}
export default Main;
