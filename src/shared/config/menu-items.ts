import Upload from "../../assets/svg/logos/upload.svg";
import Classification from "../../assets/svg/logos/classification.svg";
import Extraction from "../../assets/svg/logos/extraction.svg";
import TextFields from "../../assets/svg/logos/textfields.svg";
import Case from "../../assets/svg/logos/case.svg";
import Checkboxes from "../../assets/svg/logos/checkboxes.svg";
import Signature from "../../assets/svg/logos/signature.svg";
import Report from "../../assets/svg/logos/report.svg";
import Users from "../../assets/svg/logos/users.svg";
import Groups from "../../assets/svg/logos/groups.svg";
import Tickets from "../../assets/svg/logos/tickets.svg";
import Profile from "../../assets/svg/logos/profile.svg";
import Basic from "../../assets/svg/logos/basic.svg";
import Batchlist from "../../assets/svg/logos/batchlist.svg";
import Verify1 from "../../assets/svg/logos/verify1.svg";
import Table from "../../assets/svg/logos/table.svg";

export const MENU_OPTIONS: MenuOption[] = [
  {
    name: "Classification",
    icon: Classification,
    url: "/classification",
    subItems: [
      {
        name: "Verify",
        icon: Verify1,
        url: "/classification/verify/verify_edit",
        count: 24,
      },
      {
        name: "Batch List",
        icon: Batchlist,
        url: "/classification/batchList",
      },
    ],
  },
  {
    name: "Extraction",
    icon: Extraction,
    url: "/extraction",
    subItems: [
      {
        name: "Text Fields",
        icon: TextFields,
        url: "/extraction/textfield",
        count: 42,
        subItems: [
          {
            name: "Verify",
            icon: Verify1,
            url: "/extraction/textfield/verify/verification",
            parentID:"Text Fields",
            
          },
          {
            name: "Batch List",
            icon: Batchlist,
            url: "/extraction/textfield/batchlist",
          },
        ],
      },
      {
        name: "Checkboxes",
        icon: Checkboxes,
        url: "/extraction/checkboxes",
        count: 42,
        subItems: [
          {
            name: "Verify",
            icon: Verify1,
            url: "/extraction/checkboxes/verify",
            parentID:"Checkboxes",
          },
          // {
          //   name: "Batch List",
          //   icon: Batchlist,
          //   url: "/extraction/checkboxes/batchlist",
          // },
        ],
      },
      // {
      //   name: "Signature",
      //   icon: Signature,
      //   url: "/extraction/signature",
      //   count: 42,
      //   subItems: [
      //     {
      //       name: "Verify",
      //       icon: Verify1,
      //       url: "/extraction/signature/verify",
      //       parentID:"Signature",
      //     },
      //     {
      //       name: "Batch List",
      //       icon: Batchlist,
      //       url: "/extraction/signature/batchlist",
      //     },
      //   ],
      // },
      // {
      //   name: "Table",
      //   icon:Table,
      //   url: "/extraction/Table",
      //   count: 42,
      //   subItems: [
      //     {
      //       name: "Verify",
      //       icon: Verify1,
      //       url: "/extraction/table/verify",
      //       parentID:"Table"
      //     },
      //     {
      //       name: "Batch List",
      //       icon: Batchlist,
      //       url: "/extraction/table/batchlist",
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "Reporting and Analysis",
    icon: Report,
    url: "/report",
    subItems: [
      {
        name: "Summary",
        icon: Basic,
        url: "/report/basic/",

        subItems: [
          {
            name: "Document",
            icon: TextFields,
            url: "/report/basic/v1",
          },
          {
            name: "Field",
            icon: Checkboxes,
            url: "/report/basic/v2",
          },
        ],
      },
      {
        name: "Error Analysis",
        icon: Basic,
        url: "/report/accuracy",
      },
      {
        name: "Output Report",
        icon: Basic,
        url: "/report/production",
      },
    ],
  },
  {
    name: "Upload",
    icon: Upload,
    url: "/upload",
  },
  {
    name: "Case List View",
    icon: Case,
    url: "/case",
  },
  {
    name: "Users",
    icon: Users,
    url: "/users",
  },
  {
    name: "Groups",
    icon: Groups,
    url: "/groups",
  },
  {
    name: "Tickets",
    icon: Tickets,
    url: "/tickets",
  },
];
 


export type MenuItem = {
  name: string;
  icon: any;
  url: string;
  id: string;
  depth: number;
  count?: number;
  subItems?: MenuItem[];
};

type MenuOption = {
  name: string;
  icon: any;
  url: string;
  count?: number;
  parentID?:string;
  subItems?: MenuOption[];
};

function makeMenuLevel(options: MenuOption[], depth = 0): MenuItem[] {
  return options.map((option, idx: any) => ({
    ...option,
    id: depth === 0 ? idx : `${depth}.${idx}`,
    depth,
    subItems:
      option.subItems && option.subItems.length > 0
        ? makeMenuLevel(option.subItems, depth + 1)
        : undefined,
    color: depth > 0 ? "blue" : "black",
  }));
}

export const MENU_ITEMS: MenuItem[] = makeMenuLevel(MENU_OPTIONS);
