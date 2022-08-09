import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import { Component } from 'react';
import { getImages } from '../API/getImages';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';

export default class ImageGallery extends Component {
  state = {
    cards: [],
    page: 1,
    totalPages: '',
    request: '',
    modalContent: '',
    description: '',
    loading: false,
    error: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const newRequest = this.props.request;
    const prevPage = prevState.page;
    const { page } = this.state;
    console.log('page: ', page);
    if (prevRequest !== newRequest) {
      this.setState({ cards: [], totalPages: '', page: 1 });
      console.log('page: ', page);
      this.fetchImages();
      return;
    }
    if (page > prevPage) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    this.setState({
      loading: true,
      error: false,
    });
    const { page } = this.state;
    const { request } = this.props;
    console.log(request);
    try {
      const { hits, totalHits } = await getImages(request, page);
      const total = Math.ceil(totalHits / 12);
      this.setState(({ cards }) => {
        return { cards: [...cards, ...hits], totalPages: total };
      });
      console.log('page before (page === 1): ', page);
      if (totalHits === 0) {
        toast.error(`Nothing found, try again`, {
          theme: 'colored',
        });
      }
      if (page === 1) {
        toast.info(`Find ${totalHits}image/${total}pages`, {
          theme: 'colored',
        });
      }
      if (page > 1 && page === total) {
        toast.warn(`This is last page. Make new search`, {
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error('Something wrong, try again later!', {
        theme: 'colored',
      });
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalContent = cardId => {
    const { cards } = this.state;
    console.log(cardId);
    const card = cards.find(({ id }) => id === cardId);
    this.setState({
      modalContent: card.largeImageURL,
      description: card.tags,
      showModal: true,
    });
  };
  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };
  render() {
    const { cards, loading, page, modalContent, description, showModal, totalPages } = this.state;
    const { setModalContent, onLoadMore, toggleModal } = this;
    const elements = cards.map(element => (
      <ImageGalleryItem key={element.id} {...element} onClickImage={setModalContent} />
    ));
    const buttonVision = cards.length > 0 && page < totalPages && !loading;
    return (
      <>
        <ul className={s.gallery}>{elements}</ul>
        {buttonVision && <Button onClickBtn={onLoadMore} title="Load more" />}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalContent} alt={description} />
          </Modal>
        )}
        {loading && <Spinner />}
      </>
    );
  }
}
