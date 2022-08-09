import s from './App.module.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    searchValueInApp: '',
    page: 1,
  };

  handleFormSubmit = searchValueInApp => {
    this.setState({ searchValueInApp, page: 1 });
  };

  onLoadMoreInApp = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };
  render() {
    const { searchValueInApp, page } = this.state;
    return (
      <div className={s.app}>
        <SearchBar onClickSubmit={this.handleFormSubmit} />
        <ImageGallery
          request={searchValueInApp}
          pageNumber={page}
          onLoadMoreInGallery={this.onLoadMoreInApp}
        />
        <ToastContainer autoClose={2500} hideProgressBar />
      </div>
    );
  }
}
