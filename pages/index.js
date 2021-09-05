import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { CLEAR_ERROR } from "@/redux/types/type";

export default function HomePage() {
  const { error } = useSelector((state) => state.currentInstructor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error]);

  return (
    <>
      <h1 className=" font p-5 mb-4 text-center bg-primary text-white bg">
        Online Education MarketPlace
      </h1>
    </>
  );
}
