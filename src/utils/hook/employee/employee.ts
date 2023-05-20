import axios from 'axios';
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import config from '../../../configs/axios/axios';
import getAccessToken from '@/utils/firebase/getActiveaAccessToken'

export const useEmployeeList = (page: number, perPage: number) => {
    // let pagePagination = page || 1;
    const fetchEmployee = async (page, perPage) => {
        return axios
            .get(
                `${process.env.NEXT_PUBLIC_BE_DOMAIN_URL}/secure/employee?perPage=${perPage}&page=${page}`,
                config(localStorage.getItem('accesstoken')),
            )
            .then((res) => res?.data)
            .then((res) => {
                return {
                    data: res?.data,
                    total: res?.total,
                    current: res?.current,
                    pageSize: res?.sizePage,
                };
            })
            .catch((err) => console.log(err));
    };

    return useQuery(['employeeList', page, perPage], () => fetchEmployee(page, perPage), {
        cacheTime: 3600000,
        // refetchOnWindowFocus: false,
        staleTime: 300000,
        // refetchInterval: 5000,
    });
    // return getlistQuery;
};
