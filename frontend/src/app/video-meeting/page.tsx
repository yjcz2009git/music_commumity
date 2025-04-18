'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟会议数据
const mockMeetings = [
  {
    id: 1,
    title: '《夜曲》编曲讨论',
    description: '讨论《夜曲》的编曲方向和风格定位。',
    host: {
      name: '张三',
      avatar: '/images/avatar1.jpg',
      role: '作曲人',
    },
    status: '即将开始',
    participants: 5,
    startTime: '2024-03-20 14:00',
    duration: '60分钟',
    tags: ['编曲', '讨论'],
  },
  {
    id: 2,
    title: '《海阔天空》翻唱排练',
    description: '排练《海阔天空》翻唱版本，调整演唱技巧。',
    host: {
      name: '李四',
      avatar: '/images/avatar2.jpg',
      role: '歌手',
    },
    status: '进行中',
    participants: 3,
    startTime: '2024-03-20 10:00',
    duration: '90分钟',
    tags: ['翻唱', '排练'],
  },
  {
    id: 3,
    title: '《青花瓷》混音反馈',
    description: '讨论《青花瓷》混音效果，收集反馈意见。',
    host: {
      name: '王五',
      avatar: '/images/avatar3.jpg',
      role: '制作人',
    },
    status: '已结束',
    participants: 4,
    startTime: '2024-03-19 15:00',
    duration: '45分钟',
    tags: ['混音', '反馈'],
  },
];

export default function VideoMeetingPage() {
  const [filter, setFilter] = useState('全部');
  const [sortBy, setSortBy] = useState('最新');

  const filters = ['全部', '即将开始', '进行中', '已结束'];

  return (
    <div className="st-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">视频会议</h1>
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="st-input"
          >
            <option value="最新">最新创建</option>
            <option value="开始时间">开始时间</option>
            <option value="参与人数">参与人数</option>
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

      {/* 创建会议按钮 */}
      <div className="mb-8">
        <button className="st-button w-full">创建新会议</button>
      </div>

      {/* 会议列表 */}
      <div className="space-y-6">
        {mockMeetings.map((meeting) => (
          <div key={meeting.id} className="st-card">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={meeting.host.avatar}
                  alt={meeting.host.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{meeting.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>主持人: {meeting.host.name}</span>
                      <span>•</span>
                      <span>{meeting.host.role}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    meeting.status === '即将开始' ? 'bg-yellow-100 text-yellow-800' :
                    meeting.status === '进行中' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {meeting.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{meeting.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {meeting.tags.map((tag) => (
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
                    <span>👥 {meeting.participants} 位参与者</span>
                    <span>⏰ {meeting.startTime}</span>
                    <span>⏱️ {meeting.duration}</span>
                  </div>
                  <button className="st-button">
                    {meeting.status === '已结束' ? '查看记录' : '加入会议'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 