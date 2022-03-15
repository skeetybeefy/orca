import Routes from "types/enums/Routes";
import { IMenuRoute } from "types/interfaces/route";

const doctorRoutes: IMenuRoute[] = [
  {
    title: "Groups",
    href: Routes.Groups,
  },
  {
    title: "Files",
    href: Routes.Files,
  },
];

export default doctorRoutes;
