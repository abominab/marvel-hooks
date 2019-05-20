import Link from "next/link";

const menuOptions = ["Characters", "Comics", "Events"];

const MenuBar = () => {
  return (
    <header className="navBar">
      <div className="topBar marvel-text">
        <Link href="/">
          <h1>
            <a>Marvel Hooked on Next.js</a>
          </h1>
        </Link>
        <a href="https://reactjs.org/docs/hooks-faq.html" target="_blank">
          <img
            src="http://purefishing.scene7.com/is/image/purefishing/Berkley_Fusion19_Treble_1x_Hooks_1_0_2017_alt1"
            height="60px"
          />
        </a>
      </div>
      <ul>
        {menuOptions.map(option => (
          <li>
            <Link href={`/${option.toLowerCase()}`}>
              <a>{option}</a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        header {
          background-image: linear-gradient(var(--marvel-red) 70%, white);
          padding: 8px 8px 16px;
        }

        .topBar {
          color: white;
          display: flex;
          justify-content: space-between;
          font-size: 1.5rem;
        }

        header ul {
          display: flex;
          font-size: 1.5rem;
          justify-content: space-around;
          list-style-type: none;
        }

        header a {
          color: white;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default MenuBar;
