import Routes from 'types/enums/Routes';
import { IMenuRoute } from 'types/interfaces/route';

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
    title: "Documents",
    href: Routes.Documents,
  },
  {
    title: "Events",
    href: Routes.Events,
  },
];

export default doctorRoutes;
