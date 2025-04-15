'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟作品数据
const mockWorks = [
  {
    id: 1,
    title: '夏日微风',
    artist: '张三',
    price: 99,
    cover: '/placeholder-1.jpg',
    category: '流行',
  },
  {
    id: 2,
    title: '城市夜雨',
    artist: '李四',
    price: 199,
    cover: '/placeholder-2.jpg',
    category: '电子',
  },
  {
    id: 3,
    title: '山间晨雾',
    artist: '王五',
    price: 299,
    cover: '/placeholder-3.jpg',
    category: '民谣',
  },
  // 更多作品...
];

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [sortBy, setSortBy] = useState('最新');

  const categories = ['全部', '流行', '电子', '民谣', '摇滚', '古典'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">作品角</h1>
          <div className="flex space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="最新">最新</option>
              <option value="最热">最热</option>
              <option value="价格从低到高">价格从低到高</option>
              <option value="价格从高到低">价格从高到低</option>
            </select>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 作品列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockWorks.map((work) => (
            <div key={work.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <Image
                  src={work.cover}
                  alt={work.title}
                  width={300}
                  height={200}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{work.title}</h3>
                <p className="text-gray-600">{work.artist}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-purple-600 font-semibold">¥{work.price}</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    购买
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 