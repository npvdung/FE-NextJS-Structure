import config from '@/configs/axios/axios';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useOffice = () => {
  const fetchOffice = async () => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BE_DOMAIN_URL}/secure/office`, config(localStorage.getItem('accesstoken') || '{}'))
      .then((res) => res?.data)
      .then((res) => {
        return {
          dataOf: res?.data,
        };
      })
      .catch((err) => console.log(err));
  };

  return useQuery(['office'], () => fetchOffice());
};
