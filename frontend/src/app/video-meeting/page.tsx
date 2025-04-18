'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 模拟会议数据
const mockMeetings = [
  {
    id: 1,
    title: '音乐制作研讨会',
    description: '讨论最新的音乐制作技术和趋势',
    host: {
      name: '张三',
      avatar: '/images/avatar1.jpg',
      role: '音乐制作人'
    },
    date: '2024-03-25',
    time: '14:00',
    duration: '120分钟',
    participants: 12,
    status: 'upcoming'
  },
  {
    id: 2,
    title: '歌曲创作交流会',
    description: '分享歌曲创作经验和技巧',
    host: {
      name: '李四',
      avatar: '/images/avatar2.jpg',
      role: '作曲家'
    },
    date: '2024-03-24',
    time: '10:00',
    duration: '90分钟',
    participants: 8,
    status: 'ongoing'
  },
  {
    id: 3,
    title: '音乐版权研讨会',
    description: '探讨音乐版权保护和授权问题',
    host: {
      name: '王五',
      avatar: '/images/avatar3.jpg',
      role: '版权顾问'
    },
    date: '2024-03-20',
    time: '15:30',
    duration: '60分钟',
    participants: 15,
    status: 'completed'
  }
];

export default function VideoMeetingPage() {
  const [filter, setFilter] = useState('all');

  // 过滤会议
  const filteredMeetings = mockMeetings.filter(meeting => {
    if (filter === 'all') return true;
    return meeting.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">视频会议</h1>
        <button className="st-button">
          创建会议
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            filter === 'all' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
          }`}
          onClick={() => setFilter('all')}
        >
          全部会议
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === 'upcoming' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
          }`}
          onClick={() => setFilter('upcoming')}
        >
          即将开始
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
            filter === 'completed' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100'
          }`}
          onClick={() => setFilter('completed')}
        >
          已结束
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeetings.map((meeting) => (
          <div key={meeting.id} className="st-card">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={meeting.host.avatar}
                  alt={meeting.host.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium">{meeting.host.name}</span>
                    <span className="text-sm text-gray-500 ml-2">{meeting.host.role}</span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${
                    meeting.status === 'upcoming' ? 'bg-yellow-100 text-yellow-600' :
                    meeting.status === 'ongoing' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {meeting.status === 'upcoming' ? '即将开始' :
                     meeting.status === 'ongoing' ? '进行中' : '已结束'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{meeting.title}</h3>
                <p className="text-gray-600 mb-4">{meeting.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                  <div>
                    <div>📅 日期：{meeting.date}</div>
                    <div>⏰ 时间：{meeting.time}</div>
                  </div>
                  <div>
                    <div>⌛ 时长：{meeting.duration}</div>
                    <div>👥 参与人数：{meeting.participants}</div>
                  </div>
                </div>
                {meeting.status !== 'completed' && (
                  <Link
                    href={`/video-meeting/${meeting.id}`}
                    className="st-button w-full text-center block"
                  >
                    {meeting.status === 'upcoming' ? '预约参加' : '加入会议'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 