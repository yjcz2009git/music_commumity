'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟直播数据
const mockLiveStreams = [
  {
    id: 1,
    title: '钢琴演奏会',
    artist: '李云迪',
    thumbnail: '/images/live1.jpg',
    viewers: 1234,
    tags: ['古典', '钢琴'],
    isLive: true,
  },
  {
    id: 2,
    title: '吉他教学',
    artist: '指弹吉他',
    thumbnail: '/images/live2.jpg',
    viewers: 2345,
    tags: ['教学', '吉他'],
    isLive: true,
  },
  {
    id: 3,
    title: '原创音乐分享',
    artist: '独立音乐人',
    thumbnail: '/images/live3.jpg',
    viewers: 3456,
    tags: ['原创', '民谣'],
    isLive: true,
  },
];

export default function LivePage() {
  const [selectedStream, setSelectedStream] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">直播</h1>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
            开始直播
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主直播区域 */}
          <div className="lg:col-span-2">
            {selectedStream ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative aspect-w-16 aspect-h-9">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-pulse w-16 h-16 bg-red-600 rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600">直播画面</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">
                    {mockLiveStreams.find(s => s.id === selectedStream)?.title}
                  </h2>
                  <p className="text-gray-600">
                    {mockLiveStreams.find(s => s.id === selectedStream)?.artist}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">选择要观看的直播</h2>
                <p className="text-gray-600">从右侧列表中选择一个直播开始观看</p>
              </div>
            )}
          </div>

          {/* 直播列表 */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">正在直播</h2>
            {mockLiveStreams.map((stream) => (
              <div
                key={stream.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition ${
                  selectedStream === stream.id ? 'ring-2 ring-purple-600' : ''
                }`}
                onClick={() => setSelectedStream(stream.id)}
              >
                <div className="relative">
                  <div className="relative aspect-w-16 aspect-h-9">
                    <Image
                      src={stream.thumbnail}
                      alt={stream.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {stream.isLive && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
                      直播中
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {stream.viewers} 观看
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{stream.title}</h3>
                  <p className="text-gray-600">{stream.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 