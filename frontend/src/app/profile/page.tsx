'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Work {
  id: number;
  title: string;
  cover: string;
  plays: number;
  likes: number;
  isLiked: boolean;
  isFavorited: boolean;
}

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Comment {
  id: number;
  user: User;
  content: string;
  date: string;
}

interface Message {
  id: number;
  user: User;
  content: string;
  date: string;
  unread: boolean;
}

const tabs = [
  { id: 'works', name: '我的作品' },
  { id: 'favorites', name: '收藏' },
  { id: 'following', name: '关注' },
  { id: 'comments', name: '留言' },
  { id: 'messages', name: '私信' },
  { id: 'settings', name: '设置' },
];

const mockWorks: Work[] = [
  {
    id: 1,
    title: '夜曲',
    cover: '/images/work1.jpg',
    plays: 1234,
    likes: 89,
    isLiked: true,
    isFavorited: true,
  },
  {
    id: 2,
    title: '春天的风',
    cover: '/images/work2.jpg',
    plays: 856,
    likes: 45,
    isLiked: false,
    isFavorited: false,
  },
];

const mockComments: Comment[] = [
  {
    id: 1,
    user: {
      id: 2,
      name: '李四',
      avatar: '/images/avatar2.jpg',
    },
    content: '非常喜欢你的作品，期待更多佳作！',
    date: '2023-05-15',
  },
  {
    id: 2,
    user: {
      id: 3,
      name: '王五',
      avatar: '/images/avatar3.jpg',
    },
    content: '旋律优美，编曲精致，希望有机会合作。',
    date: '2023-05-10',
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    user: {
      id: 4,
      name: '赵六',
      avatar: '/images/avatar4.jpg',
    },
    content: '你好，我对你的作品很感兴趣，想了解更多。',
    date: '2023-05-18',
    unread: true,
  },
  {
    id: 2,
    user: {
      id: 5,
      name: '钱七',
      avatar: '/images/avatar5.jpg',
    },
    content: '我们公司正在寻找新的音乐人，有兴趣聊聊吗？',
    date: '2023-05-12',
    unread: false,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('works');
  const [user] = useState({
    name: '张三',
    role: '作曲人',
    avatar: '/images/avatar.jpg',
    followers: 234,
    following: 56,
    works: 12,
  });
  const [works, setWorks] = useState<Work[]>(mockWorks);
  const [newComment, setNewComment] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleLike = (workId: number) => {
    setWorks(works.map(work => 
      work.id === workId 
        ? { ...work, isLiked: !work.isLiked, likes: work.isLiked ? work.likes - 1 : work.likes + 1 } 
        : work
    ));
  };

  const handleFavorite = (workId: number) => {
    setWorks(works.map(work => 
      work.id === workId 
        ? { ...work, isFavorited: !work.isFavorited } 
        : work
    ));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // 这里应该是实际的评论提交逻辑
      console.log('提交评论:', newComment);
      setNewComment('');
    }
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      // 这里应该是实际的私信发送逻辑
      console.log('发送私信给:', selectedUser.name, '内容:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 个人信息头部 */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-8">
            <div className="relative h-32 w-32 rounded-full overflow-hidden">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.role}</p>
              <div className="mt-4 flex space-x-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">{user.followers}</span>
                  <span className="text-gray-500 ml-2">关注者</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">{user.following}</span>
                  <span className="text-gray-500 ml-2">关注中</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">{user.works}</span>
                  <span className="text-gray-500 ml-2">作品</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
              编辑资料
            </button>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 内容区域 */}
        <div className="py-8">
          {activeTab === 'works' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {works.map((work) => (
                <div key={work.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={work.cover}
                      alt={work.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">{work.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {work.plays}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleLike(work.id)}
                          className={`flex items-center ${work.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                        >
                          <svg className="h-5 w-5" fill={work.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-1">{work.likes}</span>
                        </button>
                        <button 
                          onClick={() => handleFavorite(work.id)}
                          className={`flex items-center ${work.isFavorited ? 'text-yellow-500' : 'text-gray-500'}`}
                        >
                          <svg className="h-5 w-5" fill={work.isFavorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="text-center text-gray-500 py-12">
              暂无收藏内容
            </div>
          )}

          {activeTab === 'following' && (
            <div className="text-center text-gray-500 py-12">
              暂无关注内容
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">留言板</h3>
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <textarea
                        rows={2}
                        placeholder="写下你的留言..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                    >
                      发送
                    </button>
                  </div>
                </form>
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4 border-b border-gray-200 pb-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={comment.user.avatar}
                          alt={comment.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{comment.user.name}</h4>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">私信列表</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 cursor-pointer ${message.unread ? 'bg-purple-50' : ''} ${selectedUser?.id === message.user.id ? 'bg-gray-50' : ''}`}
                      onClick={() => setSelectedUser(message.user)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={message.user.avatar}
                            alt={message.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{message.user.name}</p>
                            {message.unread && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                新
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                {selectedUser ? (
                  <div className="bg-white shadow rounded-lg h-full flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={selectedUser.avatar}
                            alt={selectedUser.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{selectedUser.name}</h3>
                      </div>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      {/* 这里可以显示聊天记录 */}
                      <div className="text-center text-gray-500 py-12">
                        暂无聊天记录
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <form onSubmit={handleMessageSubmit} className="flex space-x-4">
                        <div className="flex-1">
                          <textarea
                            rows={2}
                            placeholder="输入消息..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                        >
                          发送
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white shadow rounded-lg h-full flex items-center justify-center">
                    <p className="text-gray-500">请选择一个联系人开始聊天</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">账号设置</h3>
                  <div className="mt-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        用户名
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        邮箱
                      </label>
                      <input
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        个人简介
                      </label>
                      <textarea
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    保存更改
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 