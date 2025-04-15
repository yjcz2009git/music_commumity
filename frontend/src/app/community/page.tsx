'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟音乐人数据
const mockMusicians = [
  {
    id: 1,
    name: '张三',
    avatar: '/placeholder-1.jpg',
    role: '作曲人',
    followers: 1234,
  },
  {
    id: 2,
    name: '李四',
    avatar: '/placeholder-2.jpg',
    role: '作词人',
    followers: 567,
  },
  {
    id: 3,
    name: '王五',
    avatar: '/placeholder-3.jpg',
    role: '编曲人',
    followers: 890,
  },
  // 更多音乐人...
];

// 模拟话题数据
const mockTopics = [
  {
    id: 1,
    title: '如何提高作曲效率？',
    author: '张三',
    replies: 23,
    views: 456,
    lastReply: '2小时前',
  },
  {
    id: 2,
    title: '分享我的编曲技巧',
    author: '李四',
    replies: 45,
    views: 789,
    lastReply: '1小时前',
  },
  {
    id: 3,
    title: '寻找合作伙伴',
    author: '王五',
    replies: 12,
    views: 234,
    lastReply: '30分钟前',
  },
  // 更多话题...
];

export default function CommunityPage() {
  const [selectedMusician, setSelectedMusician] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">社区</h1>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
            发布话题
          </button>
        </div>

        {/* 音乐人列表 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">推荐音乐人</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {mockMusicians.map((musician) => (
              <div
                key={musician.id}
                className="flex-shrink-0 w-48 bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
                onClick={() => setSelectedMusician(musician.id)}
              >
                <div className="aspect-w-1 aspect-h-1">
                  <Image
                    src={musician.avatar}
                    alt={musician.name}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{musician.name}</h3>
                  <p className="text-gray-600 text-sm">{musician.role}</p>
                  <p className="text-gray-500 text-sm">{musician.followers} 关注者</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 话题列表 */}
        <div>
          <h2 className="text-lg font-semibold mb-4">热门话题</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b text-gray-500 text-sm">
              <div className="col-span-6">标题</div>
              <div className="col-span-2 text-center">回复</div>
              <div className="col-span-2 text-center">浏览</div>
              <div className="col-span-2 text-center">最后回复</div>
            </div>
            {mockTopics.map((topic) => (
              <div
                key={topic.id}
                className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <div className="col-span-6">
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="text-gray-500 text-sm">作者：{topic.author}</p>
                </div>
                <div className="col-span-2 text-center text-gray-600">{topic.replies}</div>
                <div className="col-span-2 text-center text-gray-600">{topic.views}</div>
                <div className="col-span-2 text-center text-gray-500 text-sm">{topic.lastReply}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 