import { Menu } from "antd";
import Link from "next/link";

import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "@/redux/actions/login";

export default function TopNav() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const { Item } = Menu;
  return (
    <Menu mode="horizontal">
      <Item icon={<AppstoreOutlined />} key="app">
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>
      {isAuthenticated && isAuthenticated ? (
        <>
          <Item icon={<UserOutlined />} key="profile">
            <Link href="/login">
              <a>Profile</a>
            </Link>
          </Item>
          <Item icon={<LogoutOutlined />} key="logout">
            <Link href="/">
              <a onClick={logoutHandler}>LogOut</a>
            </Link>
          </Item>
        </>
      ) : (
        <>
          <Item icon={<LoginOutlined />} key="login">
            <Link href="/login">
              <a>LogIn</a>
            </Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="register">
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      )}
    </Menu>
  );
}
