import React, { useState, useRef, useEffect } from "react";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  const menuItems = [
    {
      text: "自分の記録",
      href: "/record",
      icon: `${process.env.PUBLIC_URL}/icons/icon_memo.png`,
    },
    {
      text: "チャレンジ",
      href: "/challenge",
      icon: `${process.env.PUBLIC_URL}/icons/icon_challenge.png`,
    },
    {
      text: "お知らせ",
      href: "/notification",
      icon: `${process.env.PUBLIC_URL}/icons/icon_info.png`,
      notificationCount: 1,
    },
  ];

  const dropdownItems = [
    { text: "自分の記録", href: "/record" },
    { text: "体重グラフ", href: "/graph" },
    { text: "目標", href: "/goal" },
    { text: "選択中のコース", href: "/course" },
    { text: "コラム一覧", href: "/column" },
    { text: "設定", href: "/setting" },
  ];

  return (
    <header className="bg-dark-500 text-white h-[64px] flex items-center relative">
      <div className="mx-auto w-[960px] flex items-center justify-between">
        <a href="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Healthy Logo"
            className="h-full w-auto"
          />
        </a>
        <nav className="flex items-center">
          <ul className="flex">
            {menuItems.map((item, index) => (
              <li key={index} className="w-[160px]">
                <a
                  href={item.href}
                  className={`flex items-center transition-colors gap-x-[4px] font-['Hiragino_Kaku_Gothic_Pro'] text-[16px] leading-[23px] font-light hover:text-primary-300 ${
                    currentPath === item.href ? "text-primary-400" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-[32px] h-[32px] object-contain"
                    />
                    {item.notificationCount && item.notificationCount > 0 && (
                      <div className="absolute top-0 -right-[8px] w-[16px] h-[16px] bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="font-['Inter'] font-normal text-[10px] leading-[12px] text-white">
                          {item.notificationCount}
                        </span>
                      </div>
                    )}
                  </div>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
          <div className="relative ml-[16px]" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-[32px] h-[32px] flex items-center justify-center"
            >
              <img
                src={`${process.env.PUBLIC_URL}/icons/${
                  isDropdownOpen ? "icon_close.png" : "icon_menu.png"
                }`}
                alt="Menu"
                className="w-full h-full object-contain"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-[32px] right-0 w-[280px] bg-gray-400 shadow-lg">
                <ul>
                  {dropdownItems.map((item, index) => (
                    <li key={index} className="relative">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-light opacity-15"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-dark-600 opacity-25"></div>
                      <a
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-[32px] py-[23px] hover:bg-dark-600 transition-colors font-['Hiragino_Kaku_Gothic_Pro'] text-[18px] leading-[26px] font-light text-light"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
