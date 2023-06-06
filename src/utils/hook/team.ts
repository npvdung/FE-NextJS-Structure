import axios from 'axios';
import { useQuery } from 'react-query';
import config from '@/configs/axios/axios';

export const useTeam = () => {
    const fetchTeam = async () => {
        return axios
            .get(
                `${process.env.NEXT_PUBLIC_BE_DOMAIN_URL}/secure/team`,
                config(localStorage.getItem('accesstoken') || '{}' ),
            )
            .then((res) => res?.data)
            .then((res) => {
                return {
                    dataTeam: res?.data,
                };
            })
            .catch((err) => console.log(err));
    };

    return useQuery(['team'], () => fetchTeam());
};
