import { Outlet } from "react-router-dom";

export function CoursesLayout() {
  return (
    <div>
      <h2>Courses</h2>

      <Outlet />
    </div>
  );
}
