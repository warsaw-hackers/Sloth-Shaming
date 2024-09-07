"use client";

interface IPage {
  params: { id: string };
}

const Page: React.FC<IPage> = ({ params }) => {
  return <div>{params.id}</div>;
};
export default Page;
