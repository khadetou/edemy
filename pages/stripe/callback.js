import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";

export default function Callback() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  // useEffect(()=>{
  //     if(user){
  //         dispatch();
  //     }
  // }, [user]);
  return (
    <>
      <SyncOutlined
        spin
        className="text-primary  d-flex display-1 justify-content-center p-5"
      />
    </>
  );
}
