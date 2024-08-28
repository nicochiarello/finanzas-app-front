import { MdOutlineAccountBalance } from "react-icons/md";
import { PiContactlessPayment } from "react-icons/pi";
import { AiOutlineCarryOut } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { AiOutlineCreditCard } from "react-icons/ai";

export const sidebarItems = [
  {
    label: "Balance",
    href: "/",
    icon: MdOutlineAccountBalance,
  },
  {
    label: "Gastos Mensuales",
    href: "/gastos-mensuales",
    icon: PiContactlessPayment,
  },
  {
    label: "Servicios",
    href: "/servicios",
    icon: AiOutlineCarryOut,
  },
  {
    label: "Cuotas",
    href: "/cuotas",
    icon: RiBillLine,
  },
  {
    label: "Tarjetas",
    href: "/tarjetas",
    icon: AiOutlineCreditCard,
  },
];
