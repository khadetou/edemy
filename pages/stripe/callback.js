import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";
import { stripeStatus } from "@/redux/actions/payment";

export default function Callback() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { success, loading } = useSelector((state) => state.payment);
  console.log(success);
  useEffect(() => {
    if (user) {
      dispatch(stripeStatus());
    }
  }, [user]);
  return (
    <>
      <SyncOutlined
        spin
        className="text-primary  d-flex display-1 justify-content-center p-5"
      />
    </>
  );
}
