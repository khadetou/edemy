import { useState, useEffect } from "react";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createInstructor } from "@/redux/actions/payment";
import { useRouter } from "next/router";
import { CLEAR_ERROR } from "@/redux/types/type";

export default function Instructor() {
  const { user, loading } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {
    link,
    loading: insLoading,
    error,
  } = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  const router = useRouter();

  const becomeInstructor = () => {
    dispatch(createInstructor());
  };
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/register");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
    if (link) {
      router.push(link);
    }
  }, [link, error, dispatch]);
  console.log(link);
  return (
    <>
      <h1 className="p-5 mb-4 text-center bg-primary text-white bg font">
        Register As Instructor
      </h1>
      <div className="conatainer">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Setup payout to publish courses on Edemy</h2>
              <p className="lead text-warning">
                Edemy partners with stripe to transfer earnings to your bank
                account
              </p>
              <Button
                className="mb-3 d-flex align-items-center justify-content-center"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
                onClick={becomeInstructor}
              >
                {insLoading ? "Processing..." : "Payout Setup"}
              </Button>

              <p>
                You will be redirected to stripe to complete onboarding process
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
