'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟直播数据
const mockLiveStreams = [
  {
    id: 1,
    title: '钢琴即兴创作',
    streamer: '音乐人A',
    viewers: 1234,
    thumbnail: '/placeholder-1.jpg',
    isLive: true,
  },
  {
    id: 2,
    title: '吉他教学',
    streamer: '音乐人B',
    viewers: 567,
    thumbnail: '/placeholder-2.jpg',
    isLive: true,
  },
  {
    id: 3,
    title: '编曲技巧分享',
    streamer: '音乐人C',
    viewers: 890,
    thumbnail: '/placeholder-3.jpg',
    isLive: false,
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
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
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
                    {mockLiveStreams.find(s => s.id === selectedStream)?.streamer}
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
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src={stream.thumbnail}
                      alt={stream.title}
                      width={300}
                      height={200}
                      className="object-cover"
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
                  <p className="text-gray-600">{stream.streamer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 