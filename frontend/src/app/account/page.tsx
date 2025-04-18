'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 模拟用户数据
const mockUser = {
  id: 1,
  username: 'musiclover',
  nickname: '音乐爱好者',
  avatar: '/images/avatar1.jpg',
  email: 'user@example.com',
  phone: '13800138000',
  bio: '热爱音乐创作，擅长钢琴和吉他。希望在这里结识志同道合的音乐伙伴。',
  joinDate: '2024-01-01',
  works: 12,
  followers: 256,
  following: 128
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="st-container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧个人信息卡片 */}
        <div className="w-full md:w-1/3">
          <div className="st-card">
            <div className="flex flex-col items-center p-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={mockUser.avatar}
                  alt={mockUser.nickname}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{mockUser.nickname}</h2>
              <p className="text-gray-600 mb-4">@{mockUser.username}</p>
              <p className="text-gray-600 text-center mb-6">{mockUser.bio}</p>
              <div className="grid grid-cols-3 gap-4 w-full text-center">
                <div>
                  <div className="text-xl font-bold">{mockUser.works}</div>
                  <div className="text-sm text-gray-600">作品</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{mockUser.followers}</div>
                  <div className="text-sm text-gray-600">关注者</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{mockUser.following}</div>
                  <div className="text-sm text-gray-600">关注中</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧设置区域 */}
        <div className="w-full md:w-2/3">
          <div className="st-card">
            {/* 标签页导航 */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  个人资料
                </button>
                <button
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'security'
                      ? 'border-b-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  账号安全
                </button>
                <button
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'notification'
                      ? 'border-b-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('notification')}
                >
                  通知设置
                </button>
              </nav>
            </div>

            {/* 标签页内容 */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      头像
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <Image
                          src={mockUser.avatar}
                          alt={mockUser.nickname}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button className="st-button">更换头像</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      昵称
                    </label>
                    <input
                      type="text"
                      className="st-input"
                      defaultValue={mockUser.nickname}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      个人简介
                    </label>
                    <textarea
                      className="st-input"
                      rows={4}
                      defaultValue={mockUser.bio}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      className="st-input"
                      defaultValue={mockUser.email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      手机号
                    </label>
                    <input
                      type="tel"
                      className="st-input"
                      defaultValue={mockUser.phone}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="st-button">保存修改</button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">修改密码</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          当前密码
                        </label>
                        <input type="password" className="st-input" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          新密码
                        </label>
                        <input type="password" className="st-input" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          确认新密码
                        </label>
                        <input type="password" className="st-input" />
                      </div>
                      <div className="flex justify-end">
                        <button className="st-button">更新密码</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">两步验证</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">启用两步验证</p>
                        <p className="text-sm text-gray-600">
                          为您的账号添加额外的安全保护
                        </p>
                      </div>
                      <button className="st-button">设置</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notification' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">通知方式</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">邮件通知</p>
                          <p className="text-sm text-gray-600">
                            接收重要更新和活动提醒
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">站内消息</p>
                          <p className="text-sm text-gray-600">
                            接收系统消息和互动提醒
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">通知内容</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">作品评论</p>
                          <p className="text-sm text-gray-600">
                            当有人评论您的作品时通知
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">新关注者</p>
                          <p className="text-sm text-gray-600">
                            当有新用户关注您时通知
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 