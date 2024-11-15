import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from "../Servicios/tokenService"; 

export const horasApi = createApi({
  reducerPath: 'horasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7180/api/Ordenes',
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
    }),
  }),
});

export const { useObtenerHorasDisponiblesQuery } = horasApi;