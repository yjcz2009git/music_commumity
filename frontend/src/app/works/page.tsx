'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟作品数据
const mockWorks = [
  {
    id: 1,
    title: '夜曲',
    artist: '周杰伦',
    composer: '周杰伦',
    lyricist: '方文山',
    type: '流行',
    price: 99.99,
    likes: 1200,
    created_at: '2024-01-15',
    cover: '/images/work1.jpg',
  },
  {
    id: 2,
    title: '海阔天空',
    artist: 'Beyond',
    composer: '黄家驹',
    lyricist: '黄家驹',
    type: '摇滚',
    price: 89.99,
    likes: 980,
    created_at: '2024-02-20',
    cover: '/images/work2.jpg',
  },
  {
    id: 3,
    title: '青花瓷',
    artist: '周杰伦',
    composer: '周杰伦',
    lyricist: '方文山',
    type: '中国风',
    price: 79.99,
    likes: 1500,
    created_at: '2024-03-10',
    cover: '/images/work3.jpg',
  },
  {
    id: 4,
    title: '平凡之路',
    artist: '朴树',
    composer: '朴树',
    lyricist: '韩寒',
    type: '民谣',
    price: 69.99,
    likes: 1100,
    created_at: '2024-04-01',
    cover: '/images/work4.jpg',
  },
];

export default function WorksPage() {
  const [selectedType, setSelectedType] = useState('全部');
  const [sortBy, setSortBy] = useState('最新');

  const types = ['全部', '流行', '摇滚', '中国风', '民谣', '电子', '古典'];

  return (
    <div className="st-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">作品角</h1>
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="st-input"
          >
            <option value="最新">最新发布</option>
            <option value="最热">最多点赞</option>
            <option value="价格从低到高">价格从低到高</option>
            <option value="价格从高到低">价格从高到低</option>
          </select>
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedType === type
                ? 'bg-[rgb(var(--color-primary))] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 作品列表 */}
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
              <p className="text-gray-600 mb-2">{work.artist}</p>
              <div className="text-sm text-gray-500 mb-2">
                <p>作曲：{work.composer}</p>
                <p>作词：{work.lyricist}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[rgb(var(--color-primary))] font-semibold">
                  ¥{work.price}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">❤️ {work.likes}</span>
                  <button className="st-button">购买</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 