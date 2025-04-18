'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 模拟创作项目数据
const mockCreations = [
  {
    id: 1,
    title: '流行音乐编曲项目',
    description: '寻找优秀的编曲师合作，共同创作一首流行音乐作品',
    owner: {
      name: '张三',
      avatar: '/images/avatar1.jpg'
    },
    status: '进行中',
    collaborators: 3,
    created_at: '2024-03-15',
    updated_at: '2024-03-20',
    tags: ['流行音乐', '编曲', '合作']
  },
  {
    id: 2,
    title: '电影配乐创作',
    description: '为一部独立电影创作原创配乐，需要作曲家和音效师',
    owner: {
      name: '李四',
      avatar: '/images/avatar2.jpg'
    },
    status: '招募中',
    collaborators: 2,
    created_at: '2024-03-18',
    updated_at: '2024-03-19',
    tags: ['电影配乐', '原创', '音效']
  },
  {
    id: 3,
    title: '民谣歌曲创作',
    description: '寻找词作者合作创作一首民谣歌曲，曲谱已完成',
    owner: {
      name: '王五',
      avatar: '/images/avatar3.jpg'
    },
    status: '已完成',
    collaborators: 1,
    created_at: '2024-03-10',
    updated_at: '2024-03-17',
    tags: ['民谣', '作词', '合作']
  }
];

export default function CreationPage() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('latest');

  // 过滤项目
  const filteredCreations = mockCreations.filter(creation => {
    if (filter === 'all') return true;
    if (filter === 'ongoing') return creation.status === '进行中';
    if (filter === 'recruiting') return creation.status === '招募中';
    if (filter === 'completed') return creation.status === '已完成';
    return true;
  });

  // 排序项目
  const sortedCreations = [...filteredCreations].sort((a, b) => {
    if (sort === 'latest') {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    if (sort === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">创作空间</h1>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 border rounded-md"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">最新更新</option>
            <option value="oldest">最早创建</option>
          </select>
          <button className="st-button">
            创建新项目
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            filter === 'all' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
          }`}
          onClick={() => setFilter('all')}
        >
          全部
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === 'ongoing' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
          }`}
          onClick={() => setFilter('ongoing')}
        >
          进行中
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === 'recruiting' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
          }`}
          onClick={() => setFilter('recruiting')}
        >
          招募中
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === 'completed' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
          }`}
          onClick={() => setFilter('completed')}
        >
          已完成
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCreations.map((creation) => (
          <div key={creation.id} className="st-card">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={creation.owner.avatar}
                  alt={creation.owner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{creation.owner.name}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    creation.status === '进行中' ? 'bg-blue-100 text-blue-600' :
                    creation.status === '招募中' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {creation.status}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{creation.title}</h3>
                <p className="text-gray-600 mb-4">{creation.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {creation.tags.map((tag, index) => (
                    <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>👥 {creation.collaborators}人参与</span>
                  <span>更新于 {creation.updated_at}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 