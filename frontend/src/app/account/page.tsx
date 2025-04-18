'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟用户数据
const mockUser = {
  name: '张三',
  avatar: '/images/avatar1.jpg',
  role: '作曲人',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  location: '北京',
  joinDate: '2023-01-15',
  bio: '热爱音乐创作，专注于流行音乐作曲。',
  followers: 128,
  following: 56,
  works: 12,
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('基本信息');

  const tabs = ['基本信息', '安全设置', '通知设置', '隐私设置'];

  return (
    <div className="st-container">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧个人信息卡片 */}
        <div className="w-full md:w-1/3">
          <div className="st-card">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">{mockUser.name}</h2>
              <p className="text-gray-600 mb-2">{mockUser.role}</p>
              <p className="text-gray-500 text-sm mb-4">{mockUser.bio}</p>
              <div className="flex justify-between w-full mb-4">
                <div className="text-center">
                  <div className="font-semibold">{mockUser.followers}</div>
                  <div className="text-sm text-gray-500">关注者</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{mockUser.following}</div>
                  <div className="text-sm text-gray-500">关注中</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{mockUser.works}</div>
                  <div className="text-sm text-gray-500">作品</div>
                </div>
              </div>
              <div className="w-full space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-20">邮箱：</span>
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20">手机：</span>
                  <span>{mockUser.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20">地区：</span>
                  <span>{mockUser.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20">加入时间：</span>
                  <span>{mockUser.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧设置区域 */}
        <div className="w-full md:w-2/3">
          <div className="st-card">
            {/* 标签页导航 */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 -mb-px ${
                    activeTab === tab
                      ? 'border-b-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 基本信息 */}
            {activeTab === '基本信息' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    用户名
                  </label>
                  <input
                    type="text"
                    value={mockUser.name}
                    className="st-input"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    昵称
                  </label>
                  <input
                    type="text"
                    value={mockUser.name}
                    className="st-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    个人简介
                  </label>
                  <textarea
                    value={mockUser.bio}
                    className="st-input"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    地区
                  </label>
                  <input
                    type="text"
                    value={mockUser.location}
                    className="st-input"
                  />
                </div>
                <button className="st-button">保存修改</button>
              </div>
            )}

            {/* 安全设置 */}
            {activeTab === '安全设置' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    当前密码
                  </label>
                  <input
                    type="password"
                    className="st-input"
                    placeholder="输入当前密码"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    新密码
                  </label>
                  <input
                    type="password"
                    className="st-input"
                    placeholder="输入新密码"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    确认新密码
                  </label>
                  <input
                    type="password"
                    className="st-input"
                    placeholder="再次输入新密码"
                  />
                </div>
                <button className="st-button">修改密码</button>
              </div>
            )}

            {/* 通知设置 */}
            {activeTab === '通知设置' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">邮件通知</h3>
                    <p className="text-sm text-gray-500">接收重要更新的邮件通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">站内消息</h3>
                    <p className="text-sm text-gray-500">接收系统消息和互动通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
              </div>
            )}

            {/* 隐私设置 */}
            {activeTab === '隐私设置' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">公开个人资料</h3>
                    <p className="text-sm text-gray-500">允许其他用户查看您的个人资料</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">显示邮箱</h3>
                    <p className="text-sm text-gray-500">在个人资料中显示邮箱地址</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 