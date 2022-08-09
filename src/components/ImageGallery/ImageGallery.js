import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Component } from 'react';
import { getImages } from '../../API/getImages';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';

export default class ImageGallery extends Component {
  state = {
    cards: [],
    totalPages: '',
    modalContent: '',
    description: '',
    loading: false,
    error: null,
    showModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const newRequest = this.props.request;
    const newPageNumber = this.props.pageNumber;
    if (newRequest !== prevProps.request) {
      this.setState({ cards: [], totalPages: '' });
      this.fetchImages();
    }
    if (newPageNumber > prevProps.pageNumber) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    this.setState({
      loading: true,
      error: false,
    });
    const { request, pageNumber } = this.props;
    try {
      const { hits, totalHits } = await getImages(request, pageNumber);
      const total = Math.ceil(totalHits / 12);
      this.setState(({ cards }) => {
        return { cards: [...cards, ...hits], totalPages: total };
      });
      if (totalHits === 0) {
        toast.error(`Nothing found, try again`, {
          theme: 'colored',
        });
      }
      if (totalHits !== 0 && pageNumber === 1) {
        toast.info(`Find ${totalHits}image/${total}pages`, {
          theme: 'colored',
        });
      }
      if (pageNumber > 1 && pageNumber === total) {
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
    const card = cards.find(({ id }) => id === cardId);
    this.setState({
      modalContent: card.largeImageURL,
      description: card.tags,
      showModal: true,
    });
  };
  render() {
    const { cards, loading, modalContent, description, showModal, totalPages } = this.state;
    const { setModalContent, toggleModal } = this;
    const { pageNumber, onLoadMoreInGallery } = this.props;
    const elements = cards.map(element => (
      <ImageGalleryItem key={element.id} {...element} onClickImage={setModalContent} />
    ));
    const buttonVision = cards.length > 0 && pageNumber < totalPages && !loading;
    return (
      <>
        <ul className={s.gallery}>{elements}</ul>
        {buttonVision && <Button onLoadMoreInButton={onLoadMoreInGallery} title="Load more" />}
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

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  onLoadMoreInGallery: PropTypes.func.isRequired,
};
