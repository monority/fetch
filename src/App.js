import Movie from "./components/Movie";
import "./sass/main.scss";
import { Component } from "react";
import { Button } from "./components/Button";
import companies from "./components/companies";
import logo from "./img/logo.png";
import { Carousel } from "antd";

export default class App extends Component {
  state = {
    movies: [],
    suggestmovies: [],
    showItem: 6,
    showSuggest: 3,
    companies,
  };

  async getMovies() {
    const data = await fetch("https://elorri.fr/api/disney-plus/movies").then(
      (response) => response.json()
    );
    this.setState({
      movies: data,
    });
  }

  async getSuggestMovies() {
    const data = await fetch("https://elorri.fr/api/disney-plus/suggest").then(
      (response) => response.json()
    );
    this.setState({
      suggestmovies: data,
    });
  }

  componentDidMount() {
    this.getMovies();
    this.getSuggestMovies();
  }
  Carrousel = () => {
    const onChange = (currentSlide) => {
      console.log(currentSlide);
    };
  };

  render() {
    const listMovies = this.state.movies
      .slice(0, this.state.showItem)
      .map((item, index) => {
        return (
          <Movie
            key={item.id}
            id={item.id}
            img={item.poster}
            description={this.description}
          />
        );
      });

    const listSuggest = this.state.suggestmovies
      .slice(0, this.state.showSuggest)
      .map((item, index) => {
        return <Movie key={item.id} id={item.id} img={item.cover} />;
      });

    const listCompanies = this.state.companies.map((item) => {
      return (
        <Button
          key={item.id}
          name={item.company}
          className="btn"
          sourcename={item.logo}
        ></Button>
      );
    });

    const listHighlight = this.state.suggestmovies.slice(0,5).map((item, index) => {
      return (
        
      <img src={item.cover}/>)
    });

    return (
      <div>
        <nav>
          <div className="container">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </div>
        </nav>
        <section id="carrousel">
          <div className="container">
            <Carousel afterChange={this.Carrousel()}>{listHighlight}</Carousel>
          </div>
        </section>
        <section id="companybtn">
          <div className="container">
            <div className="wrappers">{listCompanies}</div>
          </div>
        </section>

        <section id="new">
          <div className="container">
            <h1>Nouveautés</h1>
            <div className="wrappers">{listMovies}</div>
          </div>
        </section>
        <section id="suggest">
          <div className="container">
            <h1>Suggestions</h1>
            <div className="wrappers">{listSuggest}</div>
          </div>
        </section>
      </div>
    );
  }
}
