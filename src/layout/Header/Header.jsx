import { NavLink } from 'react-router-dom';
import routes from '../../servises/routes';
import css from './Header.module.css';

const menu = [
  { id: 'home', name: 'home', route: routes.HOME },
  { id: 'movies', name: 'movies', route: routes.MOVIES },
];

export const Header = () => {
  return (
    <header className={css.header}>
      <nav className={css.navbar}>
        <ul className={css.navList}>
          {menu &&
            menu.map(({ id, name, route }) => (
              <li key={id}>
                <NavLink
                  to={route}
                  className={({ isActive }) =>
                    `${isActive && css.activeLink} ${css.navLink}`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
};
