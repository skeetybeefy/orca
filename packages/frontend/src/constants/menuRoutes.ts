import Routes from "types/enums/Routes";
import { IMenuRoute } from "types/interfaces/route";

const menuRoutes: IMenuRoute[] = [
  {
    title: "Главная",
    href: Routes.Home,
  },
  {
    title: "О нас",
    href: Routes.About,
  },
  {
    title: "Кабинет",
    href: Routes.Dashboard,
  },
];

export default menuRoutes;
