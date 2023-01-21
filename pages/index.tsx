import { fetcher } from "../utils/fetcher";
import useSWR from "swr";

const IndexPage = () => {
  const circumference = 30 * 2 * Math.PI;
  const API = process.env.NEXT_PUBLIC_VERCEL_API;
  const { data, error } = useSWR(`${API}/query/arbitrum/blocks`, fetcher, {
    refreshInterval: 3000,
  });

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="loader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col items-center py-20">
        <p className="text-white	 text-5xl font-medium pt-10 pb-5">
          EVM Indexer
        </p>
        <p className="text-white text-2xl font-normal">Chains Indexed</p>
        <article className="mt-10 rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-1">
          <div className="rounded-[10px] bg-white p-1 sm:p-6 flex flex-col">
            <h3 className="mt-0.5 text-center text-lg font-medium ">
              Arbitrum
            </h3>
            <img src="/static/chains/arbitrum-logo.svg" className="h-20" />
            <div className="my-4 flex">
              <span className="whitespace-nowrap rounded-full bg-purple-100 mx-5 px-5 md:px-8 py-0.5 text-xs md:text-base	text-purple-500">
                Last Chain Blocks
                <p className="whitespace-nowrap rounded-full bg-purple-100 text-sm md:text-base text-center text-purple-700">
                  {data.currentBlocks}
                </p>
              </span>
              <span className="whitespace-nowrap rounded-full bg-purple-100 mx-5 px-5  md:px-8 py-0.5 text-xs md:text-base text-purple-500">
                Indexed Blocks
                <p className="whitespace-nowrap rounded-full bg-purple-100 text-sm md:text-base text-center text-purple-700">
                  {data.blocks}
                </p>
              </span>
            </div>
            <div className="flex justify-center">
              <div className="inline-flex items-center justify-center ">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    className="text-gray-300"
                    stroke-width="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                  />
                  <circle
                    className="text-blue-600"
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference - (data.progress / 100) * circumference
                    }
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                  />
                </svg>
                <span className="absolute text-sm text-blue-600">
                  {data.progress}%
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default IndexPage;
