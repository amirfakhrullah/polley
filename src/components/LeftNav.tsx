import { useRouter } from "next/router";
import React from "react";
import { BiInfoCircle, BiNews, BiTrendingUp } from "react-icons/bi";
import { BsAppIndicator, BsMarkdown, BsStars } from "react-icons/bs";
import { FaHotjar } from "react-icons/fa";
import {
  MdOutlineAccountCircle,
  MdOutlineTipsAndUpdates,
} from "react-icons/md";

const activeClassName = "bg-slate-700 border border-slate-600";

const navs = [
  {
    text: "Latest",
    icon: <BsStars className="mr-2 text-lg" />,
  },
  {
    text: "Popular",
    icon: <FaHotjar className="mr-2 text-md" />,
  },
  {
    text: "All",
    icon: <BiNews className="mr-2 text-lg" />,
  },
  {
    text: "My Posts",
    icon: <MdOutlineAccountCircle className="mr-2 text-lg" />,
  },
];

const guides = [
  {
    text: "New Features",
    icon: <MdOutlineTipsAndUpdates className="mr-2 text-lg" />,
    href: "",
  },
  {
    text: "Markdown Guide",
    icon: <BsMarkdown className="mr-2 text-lg" />,
    href: "",
  },
  {
    text: "Polley",
    icon: <BiInfoCircle className="mr-2 text-lg" />,
    href: "",
  },
];

const LeftNav: React.FC<{
  focusTab: 1 | 2 | 3;
  selectTab: (tab: 1 | 2 | 3) => void;
}> = ({ focusTab, selectTab }) => {
  const router = useRouter();

  const navigateTab = (tab: number) => {
    if (tab > 3) return router.push("/posts");

    return selectTab(tab as 1 | 2 | 3);
  };
  return (
    <div className="md:block hidden">
      <div className="sticky top-2">
        <div className="flex flex-row items-center px-2">
          <BiTrendingUp className="mr-2 text-lg" />
          <p className="font-bold ml-1">Trending</p>
        </div>

        <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
          {navs.map((nav, idx) => (
            <div
              onClick={() => navigateTab(idx + 1)}
              className={`p-2 px-3 flex flex-row items-center cursor-pointer rounded-md hover:bg-slate-600 border border-transparent ${
                idx + 1 === focusTab ? activeClassName : ""
              }`}
              key={`nav__${idx}`}
            >
              {nav.icon}
              <p className="ml-2">{nav.text}</p>
            </div>
          ))}
        </div>

        <div className="py-2" />

        <div className="flex flex-row items-center px-2">
          <BsAppIndicator className="mr-2 text-md" />
          <p className="font-bold ml-1">About Polley</p>
        </div>

        <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
          {guides.map((guide, idx) => (
            <div
              className="p-2 px-3 flex flex-row items-center cursor-pointer rounded-md hover:bg-slate-600 border border-transparent"
              key={`guide__${idx}`}
            >
              {guide.icon}
              <p className="ml-2">{guide.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
