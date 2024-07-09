import Spinner from "./ui/Spinner";

const Loading = ({ fullSize }: { fullSize?: boolean }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullSize ? "h-full" : ""
      }`}
    >
      <Spinner />
    </div>
  );
};

export default Loading;
