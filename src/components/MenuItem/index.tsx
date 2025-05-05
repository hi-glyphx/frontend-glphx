import { useRouter } from "next/router";
import { MenuItem as MenuItemType } from "../.././shared/config/menu-items";
import MenuItemsList from "../MenuItemsList";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import IconService from "@/utils/Icons";
import { useSelector } from "react-redux";

type MenuItemProps = {
  menuItem: MenuItemType;
  child?: boolean;
  subChild?: boolean;

};

export default function MenuItem({
  menuItem: { name, icon, url, subItems, count, parentID },
  child,
  subChild,
}: MenuItemProps | any) {
  const router = useRouter();

  const selected: any = url && router.asPath.includes(url);
  const isNested = subItems && subItems?.length > 0;

  const [isExpanded, toggleExpanded] = useState(selected || name === "Classification" || name === "Extraction" ? true : false);

  const onSubMenu = () => {
    toggleExpanded((prev) => !prev);
  };

  useEffect(() => {
    toggleExpanded(selected || name === "Classification" || name === "Extraction" ? true : false);
  }, [selected,name]);

  const { classificationBatchesCount } = useSelector(
    ({ ClassificationSlice }) => ClassificationSlice
  );

  return (
    <div className={`flex flex-row  items-start w-full ${child && "gap-2"}`}>
      <div>
        {child && (
          <Image
            src={selected ? IconService.Ellipse : ""}
            height={8}
            width={8}
            alt=""
            className="mt-[1.5rem]"
          />
        )}
      </div>
      <div className={`manu-list-item flex flex-col items-center gap-1 `}>
        <div
          className={`menu-item w-full ${
            !child && selected && "manu-list-item-active"
          } ${selected && child && "sidebar-submenu-active"}`}
          onClick={() => onSubMenu()}
        >
          <div className={`flex flex-row  items-center gap-1 `}>
            <img src={icon?.src} />
            <Typography
              variant={selected ? "body2" : "subtitle2"}
              color={
                selected
                  ? "primary.light"
                  : (child && selected) || !child
                  ? "primary.light"
                  : " primary.light"
              }
            >
              {name}
            </Typography>
          </div>
          {count == 24 && (
            <div className="sidebar-count-section">
              <span>
                {classificationBatchesCount?.classification_count
                  ? classificationBatchesCount?.classification_count
                  : 0}
              </span>
            </div>
          )}
          {/* changes in the line 85 and changes in the UI and count foor each verify updated */}
          {/* {count == 42 && (
            <div className="sidebar-count-section">
              <span>
                {classificationBatchesCount?.verification_count
                  ? classificationBatchesCount?.verification_count
                  : 0}
              </span>
            </div>
          )} */}
          {subChild && (
            <>
              {name == "Verify" && parentID == "Text Fields" ? (
                <div className="sidebar-count-section">
                  <span>
                    {classificationBatchesCount?.verification_count
                      ? classificationBatchesCount?.verification_count
                      : 0}
                  </span>
                </div>
              ) : name == "Verify" && parentID =="Checkboxes" ?(
                <div className="sidebar-count-section">
                  <span>
                    {classificationBatchesCount?.checkboxes_count
                      ? classificationBatchesCount?.checkboxes_count
                      : 0}
                  </span>
                </div>
              ) : name == "Verify" && parentID =="Signature" ?(
                <div className="sidebar-count-section">
                  <span>
                    {classificationBatchesCount?.signature_count
                      ? classificationBatchesCount?.signature_count
                      : 0}
                  </span>
                </div>
              ) :  name == "Verify" && parentID =="Table" ?(
                <div className="sidebar-count-section">
                  <span>
                    {classificationBatchesCount?.checkboxes_count
                      ? classificationBatchesCount?.checkboxes_count
                      : 0}
                  </span>
                </div>
              ):(
                <Image
                  src={selected ? "" : IconService.RedDot}
                  height={8}
                  width={8}
                  alt=""
                />
              )}
            </>
          )}
        </div>
        {isExpanded && isNested ? (
          <div
            className={
              !child ? "sidebar-section-child" : "sidebar-section-subchild"
            }
          >
            <MenuItemsList
              options={subItems}
              child={true}
              subChild={child ? true : false}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
