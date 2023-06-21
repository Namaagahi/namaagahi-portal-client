import { MenuItemsObj } from "./interfaces"
import { FaBus, FaSubway, FaBroadcastTower } from "react-icons/fa"
import { SiBillboard } from 'react-icons/si'
import { HiUsers } from 'react-icons/hi2'
import { IoGrid } from 'react-icons/io5'
import { MdDashboardCustomize, MdWorkspacesFilled, MdPermMedia } from 'react-icons/md'

// REGEXES =======================================================
export const USER_REGEX = /^[A-z]{3,20}$/
export const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
export const DASH_REGEX = /^\/dashboard(\/)?$/
export const NOTES_REGEX = /^\/dashboard\/tasks(\/)?$/
export const USERS_REGEX = /^\/dashboard\/users(\/)?$/

// SINGLE BOX PAGE =======================================================
export const boxStructureHeadings = [
    'کد سامانه',
    'نوع سازه',
    'مسیر',
    'آدرس',
    'تاریخ شروع',
    'تاریخ پایان',
    'طول دوره',
    'تیپ', 
    'وجه', 
    'طول',
    'عرض',
    'متراژ چاپ',
    'متراژ واقعی',
    'تمام شده متر مربع', 
    'تمام شده ماهیانه'
]
export const plannedStructureHeadings = ['کد سامانه', 'شماره پلن', 'نام مشتری', 'مسیر', 'قیمت فروش دوره', 'تاریخ شروع پلن', 'تاریخ پایان پلن', ]
export const structureRevenueHeadings = ['کد سامانه', 'مسیر', 'بهای تمام شده', 'مجموع فروش دوره', 'سود / زیان' ]
export const boxRevenueHeadings = ['بهای تمام شده باکس', 'مجموع فروش باکس', 'سود / زیان تجمیعی' ]

// STRUCTURES PAGE =======================================================
export const structuresTableHeadings = [
    'کاربر',
    'کد سامانه',
    'منطقه',
    'مسیر', 
    'نشانی',
    'وضعیت',
    'عملیات',
    'تاریخ ایجاد',
    'تاریخ به روزرسانی'
]

// BILLBOARD PAGE =======================================================
export const billboardPagePropsObject = [
    {
        id:1,
        title: 'باکس',
        main:'مشاهده باکس ها',
        mainLink:'/dashboard/billboard/boxes', 
        subTitle:'ایجاد باکس جدید', 
        subTitleLink:'/dashboard/billboard/createbox'
    },
    {
        id:2,
        title: 'سازه',
        main:'مشاهده سازه ها',
        mainLink:'/dashboard/billboard/structures', 
        subTitle:'ایجاد سازه جدید', 
        subTitleLink:'/dashboard/billboard/createstructure'
    },
]

// TASKS PAGE =======================================================
export const notesTableHeadings = ['کاربر', 'عنوان', 'شرح', 'وضعیت','عملیات', 'تاریخ ایجاد', 'تاریخ به روزرسانی']

// USERS PAGE =======================================================
export const usersTableHeadings = ['آواتار', 'نام', 'نام کاربری', 'سطح دسترسی', 'عملیات', 'وضعیت']

// MAIN LAYOUT =======================================================
export const menuItems: MenuItemsObj[] = [{
  name: 'داشبورد',
  path: '/dashboard',
  icon: <IoGrid size={20} />
}, 
{
  name: 'کاربران',
  path: '/dashboard/users',
  icon: <HiUsers size={20} />
},
{
  name: 'وظایف',
  path: '/dashboard/tasks',
  icon: <MdDashboardCustomize size={20} />
}
]

export const subMenusList = [
  {
    name: "رسانه",
    icon: <MdPermMedia size={20} />,
    menus: [
      {
        name: 'بیلبورد',
        icon: <SiBillboard size={20} />,
        path: '/dashboard/billboard'
      },
      {
        name: 'اتوبوس',
        icon: <FaBus size={20} />,
        path: '/dashboard/bus'
      },
      {
        name: 'مترو',
        icon: <FaSubway size={20} />,
        path: '/dashboard/subway'
      },
      {
        name: 'صدا و سیما',
        icon: <FaBroadcastTower size={20} />,
        path: '/dashboard/irib'
      },
      {
        name: 'نماوا',
        icon: <MdWorkspacesFilled size={20} />,
        path: '/dashboard/namava'
      },
    ]
  },
];

// NEW BOX =======================================================
export const newBoxDefaultValues = {
  name: '',
  projectNumber: '',
  brand: '',
  startDate:'',
  endDate:'',
  structures: [{
    structureId:'',
    marks: {
      name: '',
      markOptions: {
        style: '',
        face: '',
        length: '',
        width: '',
        printSize: '',
        docSize: '',
      }
    },
    costs: {
      fixedCosts: {
        squareCost: ''
      },
      variableCosts: [{
        name: '',
        figures: {
          periodCost: ''
        }
      }]
    }
  }]
}

// NEW BOX - STRUCTURESFORMSECTION =======================================================
export const typeNames = ['عرشه پل سواره رو', 'پل عابر پیاده', 'بیلبورد']
export const styles = ['افقی', 'عمودی']
export const faces = ['شمالی', 'جنوبی', 'غربی', 'شرقی']

export const boxStructureFormValues = {
  structureId: '',
  marks: {
    name: '',
    markOptions: {
      style: '',
      face: '',
      length: '',
      width: '',
      printSize: '',
      docSize: '',
    }
  },
  costs: {
    fixedCosts: {
      squareCost: ''
    },
    variableCosts: [{
      name: '',
      figures: {
        periodCost: ''
      }
    }]
  }
}

// NEW BOX - VARIABLECOSTSFORMSECTION =======================================================
export const variableCostNames = ['برق', 'پایش', 'بیمه', 'نگهداری', 'سایر']

export const structureVariableCostsFormValues = {
  name: '',
  figures: {
      periodCost: ''
  }
}
