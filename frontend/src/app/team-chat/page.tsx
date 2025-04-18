'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 模拟聊天室数据
const mockChatRooms = [
  {
    id: 1,
    name: '编曲团队',
    description: '讨论编曲和制作相关话题',
    avatar: '/images/team1.jpg',
    lastMessage: {
      sender: '张三',
      content: '新的编曲版本已经上传，请大家查看',
      time: '10:30'
    },
    unreadCount: 3
  },
  {
    id: 2,
    name: '混音小组',
    description: '混音技巧和经验分享',
    avatar: '/images/team2.jpg',
    lastMessage: {
      sender: '李四',
      content: '混音教程已经更新，欢迎学习',
      time: '09:15'
    },
    unreadCount: 0
  },
  {
    id: 3,
    name: '创作灵感',
    description: '分享创作灵感和想法',
    avatar: '/images/team3.jpg',
    lastMessage: {
      sender: '王五',
      content: '新歌demo已经完成，期待大家的反馈',
      time: '昨天'
    },
    unreadCount: 1
  }
];

export default function TeamChatPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="st-container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">团队聊天</h1>
        <Link href="/team-chat/new" className="st-button">
          创建聊天室
        </Link>
      </div>

      {/* 搜索框 */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索聊天室..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* 聊天室列表 */}
      <div className="space-y-4">
        {mockChatRooms.map((room) => (
          <Link
            key={room.id}
            href={`/team-chat/${room.id}`}
            className="block"
          >
            <div className="st-card hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                  <Image
                    src={room.avatar}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <span className="text-sm text-gray-500">{room.lastMessage.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">{room.lastMessage.sender}:</span>{' '}
                      {room.lastMessage.content}
                    </p>
                    {room.unreadCount > 0 && (
                      <span className="bg-[rgb(var(--color-primary))] text-white text-xs px-2 py-1 rounded-full">
                        {room.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 