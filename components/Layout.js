import TopNav from "./TopNav";
import Meta from "./Meta";
export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <TopNav />
      <main>{children}</main>
    </>
  );
}
