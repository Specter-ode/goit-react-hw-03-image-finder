// import s from '/ImageGallery.module.css';
import { Component } from 'react';
import { searchImages } from '../API/searchImages';

export default class ImageGallery extends Component {
  state = {
    cards: [],
    loading: false,
    error: null,
    page: 1,
    request: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const newRequest = this.props.request;
    const prevPage = prevState.page;
    const { page } = this.state;
    if (page > prevPage || prevRequest !== newRequest) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    this.setState({
      loading: true,
    });
    const { page } = this.state;
    const { request } = this.props;
    console.log(request);
    try {
      const data = await searchImages(request, page);
      this.setState(({ cards }) => {
        console.log(data.hits);
        return {
          cards: [...cards, ...data.hits],
        };
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({ loading: false });
    }
  }
  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  changeSearchValue = ({ searchValueInApp }) => {
    this.setState({
      request: searchValueInApp,
    });
  };
  render() {
    const { cards } = this.state;
    return (
      <ul>
        {cards.map(({ id, webformatURL }) => (
          <li key={id}>
            <img src={webformatURL} alt="name" />
          </li>
        ))}
        <li>
          <p>{this.props.request}</p>
        </li>
      </ul>
    );
  }
}
