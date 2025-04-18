'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: '首页', path: '/', icon: '🏠' },
    { name: '协作', path: '/collaboration', icon: '👥' },
    { name: '创作空间', path: '/creation', icon: '✏️' },
    { name: '视频会议', path: '/video-meeting', icon: '📹' },
    { name: '团队聊天', path: '/team-chat', icon: '💬' },
    { name: '作品精选', path: '/works', icon: '🎵' },
    { name: '直播', path: '/live', icon: '🎥' },
    { name: '社区', path: '/community', icon: '👥' },
    { name: 'AIGC音乐创作', path: '/ai-composition', icon: '🤖' },
    { name: '账户', path: '/account', icon: '👤' },
    { name: '账号认证', path: '/verification', icon: '✅' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-[rgb(var(--color-primary))]">
                音乐协作平台
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                    pathname === item.path
                      ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/login"
              className="st-button"
            >
              登录
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 