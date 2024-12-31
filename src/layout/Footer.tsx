import React from 'react';

const Footer: React.FC = () => {
  const menuItems = [
    { text: '会員登録', href: '/register' },
    { text: '運営会社', href: '/company' },
    { text: '利用規約', href: '/terms' },
    { text: '個人情報の取扱について', href: '/privacy' },
    { text: '特定商取引法に基づく表記', href: '/transaction' },
    { text: 'お問い合わせ', href: '/contact' },
  ];

  return (
    <footer className="bg-dark-500 text-white h-[128px] mt-auto flex items-center">
      <div className="mx-auto w-[960px]">
        <nav className="flex flex-wrap gap-x-[45px] gap-y-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:text-gray-300 transition-colors font-['Hiragino_Kaku_Gothic_Pro'] text-[11px] leading-[16px] font-light"
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
