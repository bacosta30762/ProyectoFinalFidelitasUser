import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from "../Servicios/tokenService"; 

export const horasApi = createApi({
  reducerPath: 'horasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/Ordenes`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    obtenerHorasDisponibles: builder.query({
      query: ({ servicioId, dia }) => `horas-disponibles?servicioId=${servicioId}&dia=${dia}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useObtenerHorasDisponiblesQuery } = horasApi;