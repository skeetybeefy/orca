import Routes from "types/enums/Routes";
import { IMenuRoute } from "types/interfaces/route";

const doctorRoutes: IMenuRoute[] = [
  {
    title: "Groups",
    href: Routes.Groups,
  },
  {
    title: "Patients",
    href: Routes.Patients,
  },
  {
    title: "Files",
    href: Routes.Files,
  },
  {
    title: "File cards",
    href: Routes.FileCards,
  },
  {
    title: "Events",
    href: Routes.Events,
  },
];

export default doctorRoutes;
