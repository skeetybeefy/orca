import Routes from "types/enums/Routes";
import { IMenuRoute } from "types/interfaces/route";

const doctorRoutes: IMenuRoute[] = [
  {
    title: "Группы",
    href: Routes.Groups,
  },
  {
    title: "Файлы",
    href: Routes.Files,
  },
];

export default doctorRoutes;
