"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface News {
  id: string;
  title: string;
  content: string;
  image: string;
  Comments: [];
}

export const newsApi = createApi({
  reducerPath: "newsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    getNews: builder.query<News[], null>({
      query: () => "/news",
    }),
    getNewsById: builder.query<News, string>({
      query: (id) => `/news/${id}`,
    }),
  }),
});

export const { useGetNewsQuery, useGetNewsByIdQuery } = newsApi;
