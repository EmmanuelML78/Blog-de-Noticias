"use client";

import { useRouter } from "next/router";
import Detail from "@/components/details";

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Article Detail</h1>
      {id && <Detail articleId={id as string} />}
    </div>
  );
};

export default DetailPage;
