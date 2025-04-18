'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟帖子数据
const mockPosts = [
  {
    id: 1,
    title: '寻找吉他手合作',
    content: '我正在创作一首新歌，需要一位吉他手加入。风格偏向民谣，有兴趣的朋友请联系我。',
    author: {
      name: '张三',
      avatar: '/images/avatar1.jpg',
      role: '作曲人',
    },
    likes: 45,
    comments: 12,
    created_at: '2024-03-15',
    tags: ['合作', '吉他', '民谣'],
  },
  {
    id: 2,
    title: '分享我的新作品《夜曲》',
    content: '经过三个月的创作，我的新歌《夜曲》终于完成了。这是一首描写都市生活的歌曲，希望大家喜欢。',
    author: {
      name: '李四',
      avatar: '/images/avatar2.jpg',
      role: '歌手',
    },
    likes: 89,
    comments: 23,
    created_at: '2024-03-14',
    tags: ['作品分享', '流行'],
  },
  {
    id: 3,
    title: '求推荐一些好的编曲软件',
    content: '最近想开始学习编曲，不知道有什么好的软件推荐？希望是适合初学者的。',
    author: {
      name: '王五',
      avatar: '/images/avatar3.jpg',
      role: '音乐爱好者',
    },
    likes: 34,
    comments: 18,
    created_at: '2024-03-13',
    tags: ['求助', '编曲'],
  },
];

export default function CommunityPage() {
  const [selectedTag, setSelectedTag] = useState('全部');
  const [sortBy, setSortBy] = useState('最新');

  const tags = ['全部', '合作', '作品分享', '求助', '讨论', '活动'];

  return (
    <div className="st-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">社区</h1>
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="st-input"
          >
            <option value="最新">最新发布</option>
            <option value="最热">最多点赞</option>
            <option value="最多评论">最多评论</option>
          </select>
        </div>
      </div>

      {/* 标签筛选 */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedTag === tag
                ? 'bg-[rgb(var(--color-primary))] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 发帖按钮 */}
      <div className="mb-8">
        <button className="st-button w-full">发布新帖子</button>
      </div>

      {/* 帖子列表 */}
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <div key={post.id} className="st-card">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <span>{post.author.role}</span>
                      <span>•</span>
                      <span>{post.created_at}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-[rgb(var(--color-primary))]">
                    <span>👍</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-[rgb(var(--color-primary))]">
                    <span>💬</span>
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-[rgb(var(--color-primary))]">
                    <span>分享</span>
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