import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
// import SearchForm from './SearchForm/SearchForm';
// import SearchBar from './SearchBar/SearchBar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
class App extends Component {
  state = {
    cards: [],
    fieldFilter: '',
  };
  // componentDidMount() {
  //   const cards = localStorage.getItem('my-cards');
  //   const parsedcards = JSON.parse(cards);
  //   if (parsedcards) {
  //     this.setState({ cards: parsedcards });
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   const { cards } = this.state;
  //   if (cards !== prevState.cards) {
  //     localStorage.setItem('my-cards', JSON.stringify(cards));
  //   }
  // }
  // addNewContact = newContactData => {
  //   const { name } = newContactData;
  //   const { cards } = this.state;
  //   if (
  //     cards.find(
  //       contactFromPhonebook =>
  //         contactFromPhonebook.name.toLowerCase() === name.toLowerCase()
  //     )
  //   ) {
  //     alert(`${name} is already in cards`);
  //     return;
  //   } else if (name === '') {
  //     alert('Please enter your name');
  //     return;
  //   }
  //   const contact = { ...newContactData, id: nanoid() };
  //   this.setState(prevState => ({
  //     cards: [contact, ...prevState.cards],
  //   }));
  // };
  // deleteContact = contactId => {
  //   this.setState(prevState => ({
  //     cards: prevState.cards.filter(contact => contact.id !== contactId),
  //   }));
  // };
  // getVisiblecards = () => {
  //   const { fieldFilter, cards } = this.state;
  //   const normalizedFilter = fieldFilter.toLowerCase().trim();
  //   return cards.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };
  // changeFilter = e => {
  //   this.setState({ fieldFilter: e.target.value });
  // };

  render() {
    // const { cards } = this.state;
    return (
      <div>
        <Container></Container>
      </div>
    );
  }
}

export default App;

{
  /* <SearchBar>
<SearchForm />
</SearchBar>

<ImageGallery>
<ImageGalleryItem />

<LoadMoreBtn />

</ImageGallery> */
}
