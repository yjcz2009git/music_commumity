'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟创作项目数据
const mockCreations = [
  {
    id: 1,
    title: '《夜曲》',
    description: '一首描写都市生活的歌曲，风格偏向流行。',
    owner: {
      name: '张三',
      avatar: '/images/avatar1.jpg',
      role: '作曲人',
    },
    status: '创作中',
    collaborators: 2,
    created_at: '2024-03-15',
    updated_at: '2024-03-18',
    tags: ['流行', '都市', '创作中'],
  },
  {
    id: 2,
    title: '《海阔天空》翻唱',
    description: '对经典歌曲《海阔天空》的重新演绎，加入现代元素。',
    owner: {
      name: '李四',
      avatar: '/images/avatar2.jpg',
      role: '歌手',
    },
    status: '已完成',
    collaborators: 3,
    created_at: '2024-03-10',
    updated_at: '2024-03-15',
    tags: ['翻唱', '经典', '已完成'],
  },
  {
    id: 3,
    title: '《青花瓷》混音',
    description: '对《青花瓷》进行混音处理，突出中国风元素。',
    owner: {
      name: '王五',
      avatar: '/images/avatar3.jpg',
      role: '制作人',
    },
    status: '已完成',
    collaborators: 1,
    created_at: '2024-03-05',
    updated_at: '2024-03-12',
    tags: ['混音', '中国风', '已完成'],
  },
];

export default function CreationPage() {
  const [filter, setFilter] = useState('全部');
  const [sortBy, setSortBy] = useState('最新');

  const filters = ['全部', '创作中', '已完成'];

  return (
    <div className="st-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">创作空间</h1>
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="st-input"
          >
            <option value="最新">最新更新</option>
            <option value="创建时间">创建时间</option>
            <option value="协作者">协作者数量</option>
          </select>
        </div>
      </div>

      {/* 筛选按钮 */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === f
                ? 'bg-[rgb(var(--color-primary))] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 创建项目按钮 */}
      <div className="mb-8">
        <button className="st-button w-full">创建新项目</button>
      </div>

      {/* 项目列表 */}
      <div className="space-y-6">
        {mockCreations.map((creation) => (
          <div key={creation.id} className="st-card">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={creation.owner.avatar}
                  alt={creation.owner.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{creation.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{creation.owner.name}</span>
                      <span>•</span>
                      <span>{creation.owner.role}</span>
                      <span>•</span>
                      <span>创建于 {creation.created_at}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    creation.status === '创作中' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {creation.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{creation.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {creation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>👥 {creation.collaborators} 位协作者</span>
                    <span>🔄 最后更新: {creation.updated_at}</span>
                  </div>
                  <button className="st-button">进入项目</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 