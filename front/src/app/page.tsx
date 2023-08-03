"use client";

import { useGetNewsQuery } from "@/redux/services/newsApi";
import Link from "next/link";
import Loading from "@/components/loading";

function page() {
  const { data, error, isLoading, isFetching } = useGetNewsQuery(null);

  if (isLoading || isFetching) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <>
      <div className="p-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((news) => (
          <Link
            href="/details/[id]"
            as={`/details/${news.id}`}
            key={news.id}
            className="text-decoration-none">
            <div className="bg-white rounded-lg shadow-lg cursor-pointer">
              <img
                src={news.image}
                alt="img"
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <div className="p-6">
                <h1 className="text-xl font-semibold text-gray-800 mb-2">
                  {news.title}
                </h1>
                <p className="text-gray-600">{news.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default page;
