'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟协作项目数据
const mockProjects = [
  {
    id: 1,
    title: '《夜曲》编曲合作',
    description: '寻找编曲师合作完成《夜曲》的编曲工作，风格偏向流行。',
    owner: {
      name: '张三',
      avatar: '/images/avatar1.jpg',
      role: '作曲人',
    },
    status: '进行中',
    members: 3,
    created_at: '2024-03-15',
    deadline: '2024-04-15',
    tags: ['编曲', '流行', '合作'],
  },
  {
    id: 2,
    title: '《海阔天空》翻唱',
    description: '寻找歌手合作翻唱《海阔天空》，需要重新编曲。',
    owner: {
      name: '李四',
      avatar: '/images/avatar2.jpg',
      role: '制作人',
    },
    status: '招募中',
    members: 1,
    created_at: '2024-03-14',
    deadline: '2024-04-30',
    tags: ['翻唱', '编曲', '歌手'],
  },
  {
    id: 3,
    title: '《青花瓷》混音',
    description: '需要混音师对《青花瓷》进行混音处理，风格偏向中国风。',
    owner: {
      name: '王五',
      avatar: '/images/avatar3.jpg',
      role: '歌手',
    },
    status: '已完成',
    members: 2,
    created_at: '2024-03-10',
    deadline: '2024-03-25',
    tags: ['混音', '中国风'],
  },
];

export default function CollaborationPage() {
  const [filter, setFilter] = useState('全部');
  const [sortBy, setSortBy] = useState('最新');

  const filters = ['全部', '招募中', '进行中', '已完成'];

  return (
    <div className="st-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">协作空间</h1>
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="st-input"
          >
            <option value="最新">最新创建</option>
            <option value="截止日期">截止日期</option>
            <option value="成员数">成员数</option>
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
        {mockProjects.map((project) => (
          <div key={project.id} className="st-card">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={project.owner.avatar}
                  alt={project.owner.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{project.owner.name}</span>
                      <span>•</span>
                      <span>{project.owner.role}</span>
                      <span>•</span>
                      <span>{project.created_at}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === '招募中' ? 'bg-yellow-100 text-yellow-800' :
                    project.status === '进行中' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
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
                    <span>👥 {project.members} 位成员</span>
                    <span>⏰ 截止日期: {project.deadline}</span>
                  </div>
                  <button className="st-button">查看详情</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 