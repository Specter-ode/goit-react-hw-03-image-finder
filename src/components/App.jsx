import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './Container/Container';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
export default class App extends Component {
  state = {
    searchValueInApp: '',
  };

  handleForm = searchValueInApp => {
    this.setState({ searchValueInApp });
    console.log(searchValueInApp);
  };
  render() {
    return (
      <Container>
        <SearchBar onClickSubmit={this.handleForm} />
        <ImageGallery request={this.state.searchValueInApp} />
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}
