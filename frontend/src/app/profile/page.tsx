'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟用户数据
const mockUser = {
  name: '张三',
  avatar: '/images/avatar1.jpg',
  role: '作曲人',
  bio: '热爱音乐创作，擅长作曲和编曲。希望能与更多音乐人交流合作。',
  followers: 1234,
  following: 567,
  works: 23,
  location: '北京',
  joinDate: '2023-01-15',
};

// 模拟作品数据
const mockWorks = [
  {
    id: 1,
    title: '夜曲',
    cover: '/images/work1.jpg',
    likes: 1200,
    plays: 5000,
    created_at: '2024-01-15',
  },
  {
    id: 2,
    title: '海阔天空',
    cover: '/images/work2.jpg',
    likes: 980,
    plays: 3500,
    created_at: '2024-02-20',
  },
  {
    id: 3,
    title: '青花瓷',
    cover: '/images/work3.jpg',
    likes: 1500,
    plays: 6000,
    created_at: '2024-03-10',
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('作品');

  return (
    <div className="st-container">
      {/* 个人信息卡片 */}
      <div className="st-card mb-8">
        <div className="flex items-start space-x-6">
          <div className="relative w-32 h-32">
            <Image
              src={mockUser.avatar}
              alt={mockUser.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{mockUser.name}</h1>
                <p className="text-gray-600 mb-2">{mockUser.role}</p>
                <p className="text-gray-500 text-sm mb-4">{mockUser.bio}</p>
              </div>
              <button className="st-button">编辑资料</button>
            </div>
            <div className="flex space-x-6 text-sm">
              <div>
                <span className="font-semibold">{mockUser.followers}</span>
                <span className="text-gray-500 ml-1">关注者</span>
              </div>
              <div>
                <span className="font-semibold">{mockUser.following}</span>
                <span className="text-gray-500 ml-1">关注中</span>
              </div>
              <div>
                <span className="font-semibold">{mockUser.works}</span>
                <span className="text-gray-500 ml-1">作品</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>📍 {mockUser.location}</p>
              <p>加入时间：{mockUser.joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b">
          {['作品', '收藏', '动态', '关注'].map((tab) => (
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

      {/* 作品列表 */}
      {activeTab === '作品' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockWorks.map((work) => (
            <div key={work.id} className="st-card">
              <div className="relative aspect-w-16 aspect-h-9 mb-4">
                <Image
                  src={work.cover}
                  alt={work.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{work.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>❤️ {work.likes}</span>
                    <span>▶️ {work.plays}</span>
                  </div>
                  <span>{work.created_at}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 其他标签页内容 */}
      {activeTab !== '作品' && (
        <div className="st-card p-8 text-center text-gray-500">
          暂无{activeTab}内容
        </div>
      )}
    </div>
  );
} 