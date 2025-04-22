import { Outlet } from "react-router";

export default function LegalLayout() {
  return (
    <div>
      <header>
        <h1>Legal layout</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
