import { Book } from "@/components/core/book";

const BookPreview = () => {
  return (
    <Book
      color="#0f172a"
      cover={
        <img
          src="/images/deathnote-cover.jpg"
          alt="manga cover"
          className="w-full h-full object-cover"
        />
      }
      backOfCover={
        <img
          src="/images/deathnote-page-1.jpg"
          alt="manga page 1"
          className="w-full h-full object-cover"
        />
      }
      content={
        <img
          src="/images/deathnote-page-2.jpg"
          alt="manga page 2"
          className="w-full h-full object-cover"
        />
      }
    />
  );
};

export default BookPreview;
