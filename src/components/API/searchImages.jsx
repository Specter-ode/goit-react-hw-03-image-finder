import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '28531485-c2ddecdafcd3c65a85d6ac636',
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
