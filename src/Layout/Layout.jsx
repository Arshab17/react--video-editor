import { useState } from "react";
import Dashboard from "../Pages/Dashboard";
import Menu from "../Pages/Project";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Reports from "../Pages/Reports";
import Login from "../Pages/Login";

const Layout = () => {
  const { pathname } = useLocation();
  console.log("pathname:", pathname);
  return (
    <div className="flex h-screen overflow-y-hidden  ">
      {pathname !== "/" ? (
        <aside
          className="border p-10 bg-slate-400 flex flex-col justify-between w-64   max-h-screen    
       "
        >
          <div className="gap-y-8 h-full       flex flex-col">
            {[
              { page: "Dashboard", link: "/dashboard" },
              { page: "Reports", link: "/reports" },
              { page: "Project", link: "/project" },
            ].map((item) => {
              return (
                <Link
                  to={item.link}
                  className={`${
                    pathname === item.link ? "bg-red-700" : ""
                  } text-xl hover:text-Gainsboro  transition-all ease-linear duration-25 text-Fawn`}
                >
                  {item.page}
                </Link>
              );
            })}
          </div>
          <button className="bg-sky-400 rounded-xl px-4 py-2">Logout</button>
        </aside>
      ) : (
        ""
      )}

      <main className="w-full overflow-y-auto">
        {" "}
        <div className="relative p-10">
          <Routes>
            <Route path="/" element={<Login />} />{" "}
            <Route path="/dashboard" element={<Dashboard />} />{" "}
            <Route path="/reports" element={<Reports />} />{" "}
            <Route path="/project" element={<Menu />} />{" "}
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Layout;
