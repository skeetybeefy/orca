import Routes from "types/enums/Routes";
import { IMenuRoute } from "types/interfaces/route";

const menuRoutes: IMenuRoute[] = [
  {
    title: "Home",
    href: Routes.Home,
  },
  {
    title: "About",
    href: Routes.About,
  },
  {
    title: "News",
    href: Routes.News,
  },
];

export default menuRoutes;
