import { useState, useEffect } from "react";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export default function Instructor() {
  const { user, loading } = useSelector((state) => state.user);

  const becomeInstructor = () => {
    console.log("Become instructor");
  };
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
                {loading ? "Processing..." : "Payout Setup"}
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
