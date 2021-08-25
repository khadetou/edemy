import Link from "next/link";
export default function UserNav() {
  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link href="/user">
        <a className="nav-link active">Dashboard</a>
      </Link>
    </div>
  );
}
