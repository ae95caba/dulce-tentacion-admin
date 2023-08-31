import React from "react";

import logo from "../assets/react.svg";
const tabsArr = ["Nosotros", "Unite", "Galeria"];

export default function Header() {
  return (
    <section id="header">
      <a className="logo" href="">
        <img src={logo} alt="" />
      </a>
      <nav>
        <ul>
          {tabsArr.map((tab) => (
            <li>
              <a href="#">{tab}</a>
            </li>
          ))}
        </ul>
      </nav>

      <input type="checkbox" id="checkbox" />

      <Sidebar />
      <label className="burger-menu" htmlFor="checkbox"></label>
    </section>
  );
}

function Sidebar() {
  return (
    <aside>
      <ul>
        {tabsArr.map((tab) => (
          <li>
            <a href="#">{tab}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
