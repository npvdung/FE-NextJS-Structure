import axios from 'axios';
import { useQuery } from 'react-query';
import config from '@/configs/axios/axios';

export const useStatus = () => {
    const fetchStatus = async () => {
        return axios
            .get(
                `${process.env.NEXT_PUBLIC_BE_DOMAIN_URL}/secure/status`,
                config(localStorage.getItem('accesstoken') || '{}' ),
            )
            .then((res) => res?.data)
            .then((res) => {
                return {
                    dataStatus: res?.data,
                };
            })
            .catch((err) => console.log(err));
    };

    return useQuery(['status'], () => fetchStatus());
};
