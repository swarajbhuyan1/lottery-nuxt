import {
  LayoutDashboardIcon, BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  LoginIcon, MoodHappyIcon, ApertureIcon, UserPlusIcon, TicketIcon
} from 'vue-tabler-icons';
  
  export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    BgColor?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
  }
  
  const adminSidebarItem: menu[] = [
    { header: 'Home' },
    {
      title: 'Dashboard',
      icon: LayoutDashboardIcon,
      to: '/'
    },
    // {
    //   title: "Button",
    //   icon: CircleDotIcon,
    //   to: "/ui-components/buttons",
    // },
    // {
    //   title: "Cards",
    //   icon: BoxMultiple1Icon,
    //   to: "/ui-components/cards",
    // },
    // {
    //   title: "Tables",
    //   icon: BorderAllIcon,
    //   to: "/ui-components/tables",
    // },
    { header: 'User Management' },
  {
      title: 'Users',
      icon: UserPlusIcon,
      to: '/users'
  },
  { header: 'Settings' },
  {
      title: 'Slot Categories',
      icon: MoodHappyIcon,
      to: '/slot-categories'
  },
  {
      title: 'Slots',
      icon: ApertureIcon,
      to: '/pages/sample-page'
  },

    { header: 'Transaction' },
    {
      title: 'User Transactions',
      icon: MoodHappyIcon,
      to: '/pages/icons'
    },
    {
      title: 'Set Commissions',
      icon: ApertureIcon,
      to: '/pages/sample-page'
    },

  ];
  
  export default adminSidebarItem;
  