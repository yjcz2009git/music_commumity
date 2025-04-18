'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('账号设置');

  const tabs = ['账号设置', '隐私设置', '通知设置', '安全设置'];

  return (
    <div className="st-container">
      <h1 className="text-2xl font-bold mb-8">设置</h1>

      {/* 标签页导航 */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b">
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
      </div>

      {/* 账号设置 */}
      {activeTab === '账号设置' && (
        <div className="st-card">
          <div className="space-y-6">
            {/* 头像设置 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">头像</h3>
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24">
                  <Image
                    src="/images/avatar1.jpg"
                    alt="用户头像"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <button className="st-button">更换头像</button>
                  <p className="text-sm text-gray-500 mt-2">
                    支持 JPG、PNG 格式，文件大小不超过 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* 基本信息 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">基本信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    用户名
                  </label>
                  <input
                    type="text"
                    className="st-input"
                    defaultValue="张三"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    昵称
                  </label>
                  <input
                    type="text"
                    className="st-input"
                    defaultValue="音乐人小张"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱
                  </label>
                  <input
                    type="email"
                    className="st-input"
                    defaultValue="zhangsan@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    手机号
                  </label>
                  <input
                    type="tel"
                    className="st-input"
                    defaultValue="138****8888"
                  />
                </div>
              </div>
            </div>

            {/* 个人简介 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">个人简介</h3>
              <textarea
                className="st-input h-32"
                defaultValue="热爱音乐创作，擅长作曲和编曲。希望能与更多音乐人交流合作。"
              />
            </div>

            {/* 保存按钮 */}
            <div className="flex justify-end">
              <button className="st-button">保存更改</button>
            </div>
          </div>
        </div>
      )}

      {/* 隐私设置 */}
      {activeTab === '隐私设置' && (
        <div className="st-card">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">作品可见性</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">公开作品</p>
                    <p className="text-sm text-gray-500">所有人可见</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">私密作品</p>
                    <p className="text-sm text-gray-500">仅自己可见</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">个人资料可见性</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">显示邮箱</p>
                    <p className="text-sm text-gray-500">其他用户可以看到你的邮箱地址</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">显示手机号</p>
                    <p className="text-sm text-gray-500">其他用户可以看到你的手机号</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="flex justify-end">
              <button className="st-button">保存更改</button>
            </div>
          </div>
        </div>
      )}

      {/* 通知设置 */}
      {activeTab === '通知设置' && (
        <div className="st-card">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">通知方式</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">邮件通知</p>
                    <p className="text-sm text-gray-500">接收重要通知的邮件提醒</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">站内消息</p>
                    <p className="text-sm text-gray-500">接收站内消息提醒</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">通知内容</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">作品评论</p>
                    <p className="text-sm text-gray-500">当有人评论你的作品时通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">新关注者</p>
                    <p className="text-sm text-gray-500">当有新用户关注你时通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="flex justify-end">
              <button className="st-button">保存更改</button>
            </div>
          </div>
        </div>
      )}

      {/* 安全设置 */}
      {activeTab === '安全设置' && (
        <div className="st-card">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">修改密码</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    当前密码
                  </label>
                  <input
                    type="password"
                    className="st-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    新密码
                  </label>
                  <input
                    type="password"
                    className="st-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    确认新密码
                  </label>
                  <input
                    type="password"
                    className="st-input"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">两步验证</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">启用两步验证</p>
                  <p className="text-sm text-gray-500">登录时需要输入验证码</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                </label>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="flex justify-end">
              <button className="st-button">保存更改</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 