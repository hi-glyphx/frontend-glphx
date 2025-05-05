import { useRouter } from "next/router";
import { MenuItem as MenuItemType } from "../.././shared/config/menu-items";
import MenuItem from "../MenuItem";
import { clearSearchParams } from "@/Store/Reducer/CommonSlice";
import { useDispatch } from "react-redux";
import { clearSelectFile } from "@/Store/Reducer/CaseSlice";

type MenuItemsListProps = {
  options: MenuItemType[];
  child?: boolean;
  subChild?: boolean;
};

export default function MenuItemsList({
  options,
  child,
  subChild,
}: MenuItemsListProps) {
  const router = useRouter();

  const onNevigate = (url: string) => {
    router.push(url);
  };
  const dispatch = useDispatch();

  return (
    <div className="sidebar-section ">
      {options?.map((option, index) => (
        <div
          onClick={(e) => {
            e.preventDefault();
            if (!option.subItems?.length) {
              onNevigate(option.url);
              dispatch(clearSearchParams());
              dispatch(clearSelectFile());
            }
          }}
          className="cursor-pointer"
          key={index}
        >
          <MenuItem menuItem={option} child={child} subChild={subChild} />
        </div>
      ))}
    </div>
  );
}
 