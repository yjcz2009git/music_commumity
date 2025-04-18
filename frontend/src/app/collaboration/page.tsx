'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 模拟协作项目数据
const mockProjects = [
  {
    id: 1,
    title: '流行音乐编曲合作',
    description: '寻找优秀的编曲师合作完成新歌编曲',
    owner: {
      name: '张三',
      avatar: '/images/avatar1.jpg'
    },
    status: '招募中',
    collaborators: 3,
    deadline: '2024-05-15',
    tags: ['编曲', '流行', '合作']
  },
  {
    id: 2,
    title: '民谣吉他伴奏',
    description: '需要吉他手为原创民谣歌曲录制伴奏',
    owner: {
      name: '李四',
      avatar: '/images/avatar2.jpg'
    },
    status: '进行中',
    collaborators: 2,
    deadline: '2024-04-30',
    tags: ['吉他', '民谣', '伴奏']
  },
  {
    id: 3,
    title: '电子音乐制作',
    description: '寻找制作人合作完成电子音乐作品',
    owner: {
      name: '王五',
      avatar: '/images/avatar3.jpg'
    },
    status: '已完成',
    collaborators: 4,
    deadline: '2024-04-01',
    tags: ['电子', '制作', '混音']
  }
];

export default function CollaborationPage() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  return (
    <div className="st-container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">协作项目</h1>
        <Link href="/collaboration/new" className="st-button">
          发起协作
        </Link>
      </div>

      {/* 筛选和排序 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex gap-2">
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
              filter === 'recruiting' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
            }`}
            onClick={() => setFilter('recruiting')}
          >
            招募中
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'in-progress' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
            }`}
            onClick={() => setFilter('in-progress')}
          >
            进行中
          </button>
        </div>
        <select
          className="px-4 py-2 rounded-md bg-gray-100"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">最新发布</option>
          <option value="deadline">截止日期</option>
          <option value="collaborators">协作人数</option>
        </select>
      </div>

      {/* 项目列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="st-card hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={project.owner.avatar}
                  alt={project.owner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{project.owner.name}</div>
                <div className="text-sm text-gray-500">{project.status}</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>协作人数: {project.collaborators}</span>
              <span>截止日期: {project.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 