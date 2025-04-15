'use client';

import { useEffect, useState } from 'react';

export default function DAWPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载 Soundation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">在线 DAW 创作</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
              <iframe
                src="https://soundation.com/embed"
                className="w-full h-full rounded-lg"
                allow="microphone"
                title="Soundation DAW"
              />
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-700">实时协作</h3>
              <p className="text-sm text-gray-600">与团队成员实时协作创作</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700">专业工具</h3>
              <p className="text-sm text-gray-600">使用专业级音频处理工具</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700">云端存储</h3>
              <p className="text-sm text-gray-600">自动保存，随时访问</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 