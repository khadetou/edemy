import Link from "next/link";
export default function InstructorNav() {
  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link href="/">
        <a className="nav-link active">Create Course</a>
      </Link>
      <Link href="/">
        <a className="nav-link">Student</a>
      </Link>
    </div>
  );
}
