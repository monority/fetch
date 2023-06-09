import React, { Component } from "react";
import { Modal } from "./Modal";
import logo from "../img/logo.png";
import { Link } from 'react-router-dom/cjs/react-router-dom'

export default class MovieDetail extends Component {
  state = {
    movies: {},
  };

  async getMovies(id) {
    const data = await fetch(
      `https://elorri.fr/api/disney-plus/movie/${id}`
    ).then((response) => response.json());
    this.setState({
      movies: data,
    });
  }

  componentDidMount() {
    this.getMovies(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <Link to={`/`}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </Link>
        <iframe width="420" height="315" src={this.state.movies.video}></iframe>
        <p>{this.state.movies.description}</p>
        <p>{this.state.movies.company}</p>
      </div>
    );
  }
}
