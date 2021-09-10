import { Menu } from "antd";
import Link from "next/link";

import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "@/redux/actions/login";

export default function TopNav() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const { Item, SubMenu } = Menu;
  return (
    <Menu mode="horizontal">
      <Item icon={<AppstoreOutlined />} key="app">
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>
      {user && user.role.includes("Instructor") ? (
        <Item icon={<CarryOutOutlined />} key="create/course">
          <Link href="/courses/instructor">
            <a>Instructor</a>
          </Link>
        </Item>
      ) : (
        <Item icon={<TeamOutlined />} key="introctor">
          <Link href="/courses/instructor">
            <a>Become Instructor</a>
          </Link>
        </Item>
      )}
      {isAuthenticated && user ? (
        <>
          <SubMenu
            icon={<CoffeeOutlined />}
            className="ms-auto"
            title={user.name}
            key={user.name}
          >
            <Item icon={<UserOutlined />} key="profile">
              <Link href="/users">
                <a>Profile</a>
              </Link>
            </Item>
            <Item icon={<LogoutOutlined />} key="logout">
              <Link href="/">
                <a onClick={logoutHandler}>LogOut</a>
              </Link>
            </Item>
          </SubMenu>
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
