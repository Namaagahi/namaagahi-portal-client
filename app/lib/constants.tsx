import {
  MdDashboardCustomize,
  MdWorkspacesFilled,
  MdPermMedia,
} from "react-icons/md";
import { FaBus, FaSubway, FaBroadcastTower } from "react-icons/fa";
import { SiBillboard, SiInstructure } from "react-icons/si";
import { MenuItemsObj } from "./interfaces";
import { HiUsers } from "react-icons/hi2";
import { IoGrid } from "react-icons/io5";
import { IoPrintSharp } from "react-icons/io5";

import { BsFillBoxFill, BsFillPinMapFill } from "react-icons/bs";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { RiComputerLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

import { FaSellsy } from "react-icons/fa";
import { FaFileArchive } from "react-icons/fa";
import { BiCode } from "react-icons/bi";
import {
  AiFillDollarCircle,
  AiFillWechat,
  AiOutlinePullRequest,
  AiTwotoneProject,
} from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { GrPlan } from "react-icons/gr";
import { GiPackedPlanks } from "react-icons/gi";
import { PiPencilLine } from "react-icons/pi";

// REGEXES =======================================================
export const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
export const DASH_REGEX = /^\/dashboard(\/)?$/;
export const USERS_REGEX = /^\/dashboard\/users(\/)?$/;
export const variableCostNames2 = [
  "برق",
  "پایش",
  "بیمه",
  "نگهداری",
  "سایر",
  "رنگ آمیزی",
];

// SINGLE BOX PAGE =======================================================
export const boxStructureHeadings = [
  "ردیف",
  "کد سامانه",
  "نوع سازه",
  "مسیر",
  "آدرس",
  "تاریخ شروع",
  "تاریخ پایان",
  "طول دوره",
  "تیپ",
  "وجه",
  "طول",
  "عرض",
  "متراژ چاپ",
  "متراژ واقعی",
  "تمام شده متر مربع",
  "تمام شده روزانه",
  "تمام شده ماهیانه",
  "تمام شده دوره",
]
  .concat(variableCostNames2)
  .concat([
    "جمع هزینه سربار روزانه",
    "هزینه روزانه کل",
    "هزینه ماهیانه کل",
    "هزینه دوره کل",
  ]);

export const plannedStructureHeadings = [
  "کد سامانه",
  "شماره پلن",
  "نام مشتری",
  "مسیر",
  "قیمت فروش دوره",
  "تاریخ شروع پلن",
  "تاریخ پایان پلن",
];
export const structureRevenueHeadings = [
  "کد سامانه",
  "مسیر",
  "بهای تمام شده",
  "مجموع فروش دوره",
  "سود / زیان",
];
export const boxRevenueHeadings = [
  "بهای تمام شده باکس",
  "مجموع فروش باکس",
  "سود / زیان تجمیعی",
];

// STRUCTURES PAGE =======================================================
export const structuresTableHeadings = [
  "کاربر ایجاد کننده",
  "کد سامانه",
  "منطقه",
  "مسیر",
  "نشانی",
  "وضعیت",
  "باکس",
  "عملیات",
  "تاریخ ایجاد",
  "تاریخ به روزرسانی",
];

// BILLBOARD PAGE =======================================================
export const billboardPagePropsObject = [
  {
    id: 1,
    title: "باکس",
    main: "همه باکس ها",
    mainLink: "/dashboard/billboard/boxes",
    subTitle: "باکس جدید",
    subTitleLink: "/dashboard/billboard/boxes/createbox",
  },
  {
    id: 2,
    title: "پلن",
    main: "همه پلن ها",
    main2: "پلن های من",
    mainLink: "/dashboard/billboard/plans",
    main2Link: "/dashboard/billboard/plans/myplans",
    subTitle: "پلن جدید",
    subTitleLink: "/dashboard/billboard/plans/createplan",
  },
  {
    id: 3,
    title: "سازه",
    main: "همه سازه ها",
    main2: "سازه های من",
    mainLink: "/dashboard/billboard/structures",
    main2Link: "/dashboard/billboard/structures/mystructures",
    subTitle: "سازه جدید",
    subTitleLink: "/dashboard/billboard/structures/createstructure",
  },
  {
    id: 4,
    title: "مشتری",
    main: "مشتریان اولیه ",
    main2: "مشتریان نهایی",
    mainLink: "/dashboard/billboard/initial-customers",
    main2Link: "/dashboard/billboard/final-customers",
  },
];

// USERS PAGE =======================================================
export const usersTableHeadings = [
  "آواتار",
  "نام",
  "نام کاربری",
  "سطح دسترسی",
  "عملیات",
  "وضعیت",
];

// MAIN LAYOUT =======================================================
export const menuItems: MenuItemsObj[] = [
  {
    name: "داشبورد",
    path: "/dashboard",
    icon: <IoGrid size={20} />,
  },
  {
    name: "کاربران",
    path: "/dashboard/users",
    icon: <HiUsers size={20} />,
  },
  {
    name: "چت روم ها",
    path: "/dashboard/chatrooms",
    icon: <AiFillWechat size={20} />,
  },
  {
    name: "IT",
    path: "/dashboard/IT",
    icon: <RiComputerLine size={20} />,
  },
  {
    name: "نقشه",
    path: "/dashboard/map",
    icon: <BsFillPinMapFill size={20} />,
  },
];

export const projectList = [
  {
    name: "امور مشتریان",
    icon: <AiTwotoneProject size={20} />,
    menus: [
      {
        name: "درخواست پروپوزال",
        icon: <AiOutlinePullRequest size={20} />,
        path: "/dashboard/proposal",
      },
      {
        name: "مشتری اولیه",
        icon: <FaPersonCirclePlus size={20} />,
        path: "/dashboard/billboard/initial-customers",
      },
      {
        name: "شناسه کار",
        path: "/dashboard/project-codes",
        icon: <BiCode size={20} />,
      },
      {
        name: "مشتریان قطعی",
        icon: <IoIosPeople size={20} />,
        path: "/dashboard/billboard/final-customers",
      },
    ],
  },
];

export const billboardSettingsList = [
  {
    name: "تنظیمات ",
    icon: <MdPermMedia size={20} />,
    menus: [
      {
        name: "باکس",
        icon: <BsFillBoxFill size={20} />,
        path: "/dashboard/billboard/boxes",
        children: [
          { name: "تعریف باکس", url: "/dashboard/billboard/boxes/createbox" },
          { name: "باکس ها", url: "/dashboard/billboard/boxes" },
          { name: "آرشیو", url: "/dashboard/billboard/boxes/archived" },
        ],
      },
      // {
      //   name: "تعریف باکس",
      //   icon: <BsFillBoxFill size={20} />,
      //   path: "/dashboard/billboard/boxes",
      // },
      {
        name: "تعریف سازه",
        icon: <SiInstructure size={20} />,
        path: "/dashboard/billboard/structures",
      },
      // {
      //   name: "آرشیو",
      //   icon: <FaFileArchive size={20} />,
      //   path: "/dashboard/billboard/boxes/archived",
      // },
    ],
  },
];

export const billboardSellList = [
  {
    name: "پذیرش",
    icon: <FaSellsy size={20} />,
    menus: [
      {
        name: "پلن",
        icon: <GiPackedPlanks size={20} />,
        path: "/dashboard/billboard/plans",
      },

      {
        name: "پروژه",
        icon: <AiTwotoneProject size={20} />,
        path: "/dashboard/billboard/plans/myplans",
      },
      {
        name: "آرشیو",
        icon: <FaFileArchive size={20} />,
        path: "/dashboard/billboard/plans/archieve",
      },
      {
        name: "پروپوزال ها",
        icon: <AiOutlinePullRequest size={20} />,
        path: "/dashboard/proposal",
      },
    ],
  },
];
export const billboardFinancialList = [
  {
    name: "مالی",
    icon: <PiPencilLine size={20} />,
    menus: [
      {
        name: "امور قراردادها",
        icon: <AiFillDollarCircle size={20} />,
        path: "/dashboard/billboard/contracts",
      },
    ],
  },
];

export const reports = [
  {
    name: "گزارشات",
    icon: <TbReportAnalytics size={20} />,
    menus: [
      {
        name: "سازه های خالی",
        icon: <SiInstructure size={20} />,
        path: "/dashboard/billboard/structures/availables",
      },
    ],
  },
];

export const billboardPrint = [
  {
    name: "چاپ و نصب",
    icon: <IoPrintSharp size={20} />,
    menus: [],
  },
];

export const billboardMenuList = [
  {
    name: "بیلبورد",
    icon: <MdPermMedia size={20} />,
    menus: [
      {
        name: "بیلبورد",
        icon: <SiBillboard size={20} />,
        path: "/dashboard/billboard",
      },
      {
        name: "اتوبوس",
        icon: <FaBus size={20} />,
        path: "/dashboard/bus",
      },
      {
        name: "مترو",
        icon: <FaSubway size={20} />,
        path: "/dashboard/subway",
      },
      {
        name: "صدا و سیما",
        icon: <FaBroadcastTower size={20} />,
        path: "/dashboard/irib",
      },
      {
        name: "نماوا",
        icon: <MdWorkspacesFilled size={20} />,
        path: "/dashboard/namava",
      },
    ],
  },
];

// export const billboardPagePropsObject = [
//   {
//       id: 1,
//       title: 'باکس',
//       main:'همه باکس ها',
//       mainLink:'/dashboard/billboard/boxes',
//       subTitle:'باکس جدید',
//       subTitleLink:'/dashboard/billboard/boxes/createbox'
//   },
//   {
//       id: 2,
//       title: 'پلن',
//       main:'همه پلن ها',
//       main2: 'پلن های من',
//       mainLink:'/dashboard/billboard/plans',
//       main2Link:'/dashboard/billboard/plans/myplans',
//       subTitle:'پلن جدید',
//       subTitleLink:'/dashboard/billboard/plans/createplan'
//   },
//   {
//       id: 3,
//       title: 'سازه',
//       main:'همه سازه ها',
//       main2:'سازه های من',
//       mainLink:'/dashboard/billboard/structures',
//       main2Link:'/dashboard/billboard/structures/mystructures',
//       subTitle:'سازه جدید',
//       subTitleLink:'/dashboard/billboard/structures/createstructure',
//   },
//   {
//       id: 4,
//       title: 'مشتری',
//       main:'مشتریان اولیه ',
//       main2:'مشتریان نهایی',
//       mainLink:'/dashboard/billboard/initial-customers',
//       main2Link:'/dashboard/billboard/final-customers',
//   },
// ]

// NEW BOX =======================================================
export const newBoxDefaultValues = {
  boxId: `box_${
    new Date().getTime() + String(Math.random()).replace(".", "").slice(0, 6)
  }`,
  name: "",
  projectNumber: "",
  brand: "",
  startDate: new Date().getTime(),
  endDate: new Date().getTime(),
  structures: [
    {
      structureId: "",
      marks: {
        name: "",
        markOptions: {
          style: "",
          face: "",
          length: "",
          width: "",
          printSize: "",
          docSize: "",
        },
      },
      costs: {
        fixedCosts: {
          squareCost: "",
        },
        variableCosts: [
          {
            name: "",
            figures: {
              monthlyCost: "",
            },
          },
        ],
      },
      monthlyBaseFee: "",
    },
  ],
};

// NEW BOX - STRUCTURESFORMSECTION =======================================================
export const typeNames = [
  { id: "عرشه پل سواره رو", name: "عرشه پل سواره رو" },
  { id: "پل عابر پیاده", name: "پل عابر پیاده" },
  { id: "بیلبورد", name: "بیلبورد" },
];
export const styles = [
  { id: "افقی", name: "افقی" },
  { id: "عمودی", name: "عمودی" },
];
export const faces = [
  { id: "شمالی", name: "شمالی" },
  { id: "جنوبی", name: "جنوبی" },
  { id: "غربی", name: "غربی" },
  { id: "شرقی", name: "شرقی" },
];
export const boxMarks = ["مزایده ای", "کوتاه مدت", "بلندمدت"];
export const boxMarksObject = {
  "مزایده ای": "owner",
  "کوتاه مدت": "buyShort",
  "بلند مدت": "buyLong",
};

export const boxStructureFormValues = {
  structureId: "",
  duration: {
    diff: 0,
    startDate: new Date().getTime() / 1000,
    endDate: new Date().getTime() / 1000,
  },
  marks: {
    name: "",
    markOptions: {
      style: "",
      face: "",
      length: "",
      width: "",
      printSize: "",
      docSize: "",
    },
  },
  costs: {
    fixedCosts: {
      squareCost: "",
    },
    variableCosts: [
      {
        name: "",
        figures: {
          monthlyCost: "",
        },
      },
    ],
  },
  monthlyBaseFee: "",
};

// NEW BOX - VARIABLECOSTSFORMSECTION =======================================================
export const variableCostNames = [
  "برق",
  "پایش",
  "بیمه",
  "نگهداری",
  "سایر",
  "رنگ آمیزی",
];

export const structureVariableCostsFormValues = {
  name: "",
  figures: {
    monthlyCost: "",
  },
};

// NEW PLAN =======================================================
export const newPlanDefaultValues = {
  initialCustomerId: "",
  brand: "",
  mark: "",
  structures: [
    {
      structureId: "",
      structureRecord: {},
      duration: {
        sellStart: new Date().getTime() / 1000,
        sellEnd: new Date().getTime() / 1000,
      },
      monthlyFee: "",
      monthlyFeeWithDiscount: "",
      discountFee: "",
    },
  ],
  totalPackagePrice: "",
};

export const planStructureFormValues: any = {
  structureId: "",
  structureRecord: "",
  duration: {
    sellStart: null,
    sellEnd: null,
  },
  monthlyFee: "",
  monthlyFeeWithDiscount: "",
  discountFee: "",
};

// PLANS =======================================================
export const plansPagePropsObject = [
  {
    id: 1,
    title: "پلنهای پیشنهادی",
    main: "مشاهده پلنهای پیشنهادی",
    mainLink: "/dashboard/billboard/plans/suggested",
  },
  {
    id: 2,
    title: "پلنهای تایید شده",
    main: "مشاهده پلنهای تایید شده",
    mainLink: "/dashboard/billboard/plans/done",
  },
  {
    id: 2,
    title: "پلنهای رد شده",
    main: "مشاهده پلنهای رد شده",
    mainLink: "/dashboard/billboard/plans/rejected",
  },
];

// SINGLE PLAN =======================================================
export const plansTableHeadings = [
  "ردیف",
  "کاربر ایجاد کننده",
  "نام پلن",
  "نام مشتری",
  "برند",
  "تعداد سازه",
  "عملیات",
  "وضعیت",
  "تاریخ ایجاد",
  "تاریخ به روزرسانی",
  " ",
];

// INITIAL CUSTOMER =======================================================
export const initialCustomerTableHeadings = [
  "کاربر ایجاد کننده",
  "نام مشتری",
  "عملیات",
  "تاریخ ایجاد",
  "تاریخ به روزرسانی",
];

// NEW FINAL CUSTOMER =======================================================
export const newFinalCustomerDefaultValues = {
  name: "",
  contractType: "official",
  customerType: "legal",
  agent: [
    {
      agentName: "",
      post: "",
    },
  ],
  nationalId: "",
  ecoCode: "",
  regNum: "",
  address: "",
  postalCode: "",
  phone: "",
};

export const finalCustomerAgentFormValues = {
  agentName: "",
  post: "",
};

// PROJECT CODE =======================================================
export const codeMap: { [key: string]: string } = {
  BB: "بیلبورد",
  MTR: "مترو",
  BUS: "اتوبوس",
  NMV: "نماوا",
  STR: "استرابورد",
  BRB: "برایت بورد",
};

export const newProjectCodeDefaultValues = {
  media: "",
  year: "",
  finalCustomerId: "",
  brand: "",
  desc: "",
};

export const mediaTypes = [
  { id: "BB", name: "بیلبورد" },
  { id: "MTR", name: "مترو" },
  { id: "BUS", name: "اتوبوس" },
  { id: "NMV", name: "نماوا" },
  { id: "STR", name: "استرابورد" },
  { id: "BRB", name: "برایت بورد" },
];

export const years = [
  { id: 1402, name: "1402" },
  { id: 1403, name: "1403" },
  { id: 1404, name: "1404" },
  { id: 1405, name: "1405" },
];

export const jalaliMonths = [
  { id: "01", name: "فروردین" },
  { id: "02", name: "اردیبهشت" },
  { id: "03", name: "خرداد" },
  { id: "04", name: "تیر" },
  { id: "05", name: "مرداد" },
  { id: "06", name: "شهریور" },
  { id: "07", name: "مهر" },
  { id: "08", name: "آبان" },
  { id: "09", name: "آذر" },
  { id: "10", name: "دی" },
  { id: "11", name: "بهمن" },
  { id: "12", name: "اسفند" },
];

export const newProposalDefaultValues = {
  subject: "",
  initialCustomerId: "",
  startDate: new Date().getTime() / 1000,
  endDate: new Date().getTime() / 1000,
  priority: "",
  status: "",
  type: "",
  description: "",
  assignedUsers: [],
};

export const priorityTypes = [
  { id: "low", name: "کم" },
  { id: "medium", name: "متوسط" },
  { id: "high", name: "زیاد" },
];

export const proposalStatusTypes = [
  { id: "in-progress", name: "درجریان" },
  { id: "done", name: "تمام شده" },
];

export const proposalTypeTypes = [
  { id: "billboard", name: "بیلبورد" },
  { id: "metro", name: "مترو" },
  { id: "bus", name: "اتوبوس" },
  { id: "namava", name: "نماوا" },
];
