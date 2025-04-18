'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 定义更新类型
type UpdateType = 'work' | 'live' | 'collaboration' | 'comment';

interface User {
  name: string;
  avatar: string;
  role: string;
}

interface Work {
  title: string;
  cover: string;
  likes: number;
  plays: number;
}

interface Live {
  title: string;
  viewers: number;
  duration: string;
}

interface Project {
  title: string;
  members: number;
  deadline: string;
}

interface Comment {
  text: string;
  work: string;
}

interface Update {
  id: number;
  type: UpdateType;
  user: User;
  content: string;
  created_at: string;
  work?: Work;
  live?: Live;
  project?: Project;
  comment?: Comment;
}

// 模拟最新动态数据
const mockUpdates: Update[] = [
  {
    id: 1,
    type: 'work',
    user: {
      name: '张三',
      avatar: '/images/avatar1.jpg',
      role: '作曲人'
    },
    content: '发布了新作品《夜曲》',
    work: {
      title: '夜曲',
      cover: '/images/work1.jpg',
      likes: 128,
      plays: 1024
    },
    created_at: '2小时前'
  },
  {
    id: 2,
    type: 'live',
    user: {
      name: '李四',
      avatar: '/images/avatar2.jpg',
      role: '吉他手'
    },
    content: '正在直播吉他教学',
    live: {
      title: '吉他入门到精通',
      viewers: 256,
      duration: '120分钟'
    },
    created_at: '3小时前'
  },
  {
    id: 3,
    type: 'collaboration',
    user: {
      name: '王五',
      avatar: '/images/avatar3.jpg',
      role: '制作人'
    },
    content: '发起了新的协作项目',
    project: {
      title: '流行音乐编曲合作',
      members: 3,
      deadline: '2023-05-15'
    },
    created_at: '5小时前'
  },
  {
    id: 4,
    type: 'comment',
    user: {
      name: '赵六',
      avatar: '/images/avatar4.jpg',
      role: '音乐爱好者'
    },
    content: '评论了你的作品《春之歌》',
    comment: {
      text: '旋律非常优美，期待更多作品！',
      work: '春之歌'
    },
    created_at: '6小时前'
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all');

  // 根据当前选中的标签过滤更新
  const filteredUpdates = mockUpdates.filter(update => {
    if (activeTab === 'all') return true;
    if (activeTab === 'works') return update.type === 'work';
    if (activeTab === 'lives') return update.type === 'live';
    if (activeTab === 'collaborations') return update.type === 'collaboration';
    return true;
  });

  return (
    <div className="st-container">
      {/* 顶部横幅 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-4">欢迎来到音乐协作平台</h1>
        <p className="text-lg mb-6">在这里，音乐创作者可以找到志同道合的伙伴，共同创作优秀的音乐作品。</p>
        <div className="flex space-x-4">
          <Link href="/register" className="st-button bg-white text-purple-600">
            立即注册
          </Link>
          <Link href="/login" className="st-button bg-transparent border-2 border-white">
            登录
          </Link>
        </div>
      </div>

      {/* 功能区块 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="st-card">
          <h2 className="text-xl font-semibold mb-4">🎵 作品精选</h2>
          <p className="text-gray-600 mb-4">浏览平台上的优秀音乐作品，发现新的灵感。</p>
          <Link href="/works" className="text-[rgb(var(--color-primary))] hover:underline">
            查看更多 →
          </Link>
        </div>
        <div className="st-card">
          <h2 className="text-xl font-semibold mb-4">🤖 AIGC创作</h2>
          <p className="text-gray-600 mb-4">使用AI技术辅助创作，激发灵感。</p>
          <Link href="/ai-composition" className="text-[rgb(var(--color-primary))] hover:underline">
            体验AI创作 →
          </Link>
        </div>
      </div>

      {/* 最新动态 */}
      <div className="st-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">最新动态</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-md ${activeTab === 'all' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('all')}
            >
              全部
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${activeTab === 'works' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('works')}
            >
              作品
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${activeTab === 'lives' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('lives')}
            >
              直播
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${activeTab === 'collaborations' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('collaborations')}
            >
              协作
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredUpdates.map((update) => (
            <div key={update.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={update.user.avatar} 
                  alt={update.user.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <p className="font-medium">{update.user.name}</p>
                  <span className="mx-2 text-gray-400">·</span>
                  <p className="text-sm text-gray-500">{update.user.role}</p>
                  <span className="mx-2 text-gray-400">·</span>
                  <p className="text-sm text-gray-500">{update.created_at}</p>
                </div>
                <p className="mb-2">{update.content}</p>
                
                {/* 根据不同类型显示不同内容 */}
                {update.type === 'work' && update.work && (
                  <div className="flex items-center space-x-4 mt-2 p-2 bg-white rounded-md">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image 
                        src={update.work.cover} 
                        alt={update.work.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{update.work.title}</p>
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <span>❤️ {update.work.likes}</span>
                        <span>▶️ {update.work.plays}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {update.type === 'live' && update.live && (
                  <div className="mt-2 p-2 bg-white rounded-md">
                    <p className="font-medium">{update.live.title}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>👥 {update.live.viewers} 观看</span>
                      <span>⏱️ {update.live.duration}</span>
                    </div>
                  </div>
                )}
                
                {update.type === 'collaboration' && update.project && (
                  <div className="mt-2 p-2 bg-white rounded-md">
                    <p className="font-medium">{update.project.title}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>👥 {update.project.members} 成员</span>
                      <span>📅 截止日期: {update.project.deadline}</span>
                    </div>
                  </div>
                )}
                
                {update.type === 'comment' && update.comment && (
                  <div className="mt-2 p-2 bg-white rounded-md">
                    <p className="text-sm text-gray-600">{update.comment.text}</p>
                    <p className="text-sm text-gray-500 mt-1">作品: {update.comment.work}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/community" className="text-[rgb(var(--color-primary))] hover:underline">
            查看更多动态 →
          </Link>
        </div>
      </div>
    </div>
  );
}
