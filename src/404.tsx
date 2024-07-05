import { useRouteError } from "react-router-dom";

const Error404 = () => {
  const error: any = useRouteError();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default Error404