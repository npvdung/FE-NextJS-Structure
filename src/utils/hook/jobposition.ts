import axios from 'axios';
import { useQuery } from 'react-query';
import config from '@/configs/axios/axios';

export const useJobPosition = () => {
    const fetchJobPosition = async () => {
        return axios
            .get(
                `${process.env.NEXT_PUBLIC_BE_DOMAIN_URL}/secure/jobposition`,
                config(localStorage.getItem('accesstoken') || '{}' ),
            )
            .then((res) => res?.data)
            .then((res) => {
                return {
                    dataJobPosition: res?.data,
                };
            })
            .catch((err) => console.log(err));
    };

    return useQuery(['jobposition'], () => fetchJobPosition());
};
