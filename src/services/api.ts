import axios, { AxiosInstance } from 'axios';

export const Server: { axiosInstance: AxiosInstance } = {
    axiosInstance: axios.create({
        baseURL: 'https://rickandmortyapi.com/api/',
        timeout: 20000,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }),
};

export const fetchCharacter = (params: {
    page?: number;
    name?: string;
    gender?: string;
    status?: string;
    id?: string;
}) => {
    const { id, ...restParams } = params;
    return Server.axiosInstance.get(`character${id ? `/${id}` : ''}`, {
        params: restParams,
    });
};

export const fetchEpisode = (params: { episodes: string[] }) => {
    return Server.axiosInstance.get(
        `episode${params.episodes ? `/${params.episodes.join(',')}` : ''}`
    );
};
