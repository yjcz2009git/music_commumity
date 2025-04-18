'use client';

import { useState } from 'react';
import Image from 'next/image';

// 模拟聊天数据
const mockChats = [
  {
    id: 1,
    name: '《夜曲》创作组',
    avatar: '/images/avatar1.jpg',
    lastMessage: '张三: 我已经完成了主旋律的创作，大家可以听听看。',
    unreadCount: 3,
    members: 5,
    lastActive: '10分钟前',
  },
  {
    id: 2,
    name: '《海阔天空》翻唱组',
    avatar: '/images/avatar2.jpg',
    lastMessage: '李四: 明天下午2点我们开始录制。',
    unreadCount: 0,
    members: 3,
    lastActive: '30分钟前',
  },
  {
    id: 3,
    name: '《青花瓷》混音组',
    avatar: '/images/avatar3.jpg',
    lastMessage: '王五: 混音已经完成，请各位试听。',
    unreadCount: 1,
    members: 4,
    lastActive: '1小时前',
  },
];

// 模拟消息数据
const mockMessages = [
  {
    id: 1,
    sender: {
      name: '张三',
      avatar: '/images/avatar1.jpg',
      role: '作曲人',
    },
    content: '我已经完成了主旋律的创作，大家可以听听看。',
    timestamp: '10:30',
    type: 'text',
  },
  {
    id: 2,
    sender: {
      name: '李四',
      avatar: '/images/avatar2.jpg',
      role: '歌手',
    },
    content: '旋律很棒！我觉得可以加入一些中国风元素。',
    timestamp: '10:32',
    type: 'text',
  },
  {
    id: 3,
    sender: {
      name: '王五',
      avatar: '/images/avatar3.jpg',
      role: '制作人',
    },
    content: '/audio/sample1.mp3',
    timestamp: '10:35',
    type: 'audio',
  },
];

export default function TeamChatPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="st-container">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* 聊天列表 */}
        <div className="w-1/3 border-r border-gray-200 pr-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">团队聊天</h1>
            <button className="st-button">新建聊天</button>
          </div>
          
          <div className="space-y-4">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedChat.id === chat.id
                    ? 'bg-[rgb(var(--color-primary))] bg-opacity-10'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={chat.avatar}
                      alt={chat.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    {chat.unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.lastActive}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <span>👥 {chat.members} 位成员</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 聊天内容 */}
        <div className="flex-1 pl-4">
          {selectedChat && (
            <>
              {/* 聊天头部 */}
              <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200">
                <div className="relative w-12 h-12">
                  <Image
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-500">{selectedChat.members} 位成员</p>
                </div>
              </div>

              {/* 消息列表 */}
              <div className="h-[calc(100vh-16rem)] overflow-y-auto mb-6 space-y-4">
                {mockMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-4">
                    <div className="relative w-10 h-10">
                      <Image
                        src={msg.sender.avatar}
                        alt={msg.sender.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold">{msg.sender.name}</span>
                        <span className="text-xs text-gray-500">{msg.sender.role}</span>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                      {msg.type === 'text' ? (
                        <p className="text-gray-800">{msg.content}</p>
                      ) : (
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <audio controls className="w-full">
                            <source src={msg.content} type="audio/mpeg" />
                            您的浏览器不支持音频播放。
                          </audio>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 输入框 */}
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="输入消息..."
                  className="st-input flex-1"
                />
                <button className="st-button">发送</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 