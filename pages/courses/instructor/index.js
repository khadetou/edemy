import { useEffect } from "react";
import InstructorProtectedRoute from "@/components/routes/InstructorProtectedRoute";
import InstructorNav from "@/components/nav/InstructorNav";

export default function User() {
  return (
    <InstructorProtectedRoute>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h1 className=" font p-5 mb-4 text-center bg-primary text-white bg">
              Instructor Dashboard
            </h1>
            <h1>This is the The instructor dashboard</h1>
          </div>
        </div>
      </div>
    </InstructorProtectedRoute>
  );
}
