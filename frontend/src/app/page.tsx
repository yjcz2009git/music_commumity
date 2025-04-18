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

// 模拟排行榜数据
const rankingData = [
  {
    rank: 1,
    title: "夜曲",
    artist: "周杰伦",
    plays: "1.2M",
    album: "十一月的萧邦",
    duration: "3:45",
    cover: "https://placehold.co/100x100"
  },
  {
    rank: 2,
    title: "晴天",
    artist: "周杰伦",
    plays: "1.1M",
    album: "叶惠美",
    duration: "4:29",
    cover: "https://placehold.co/100x100"
  },
  {
    rank: 3,
    title: "稻香",
    artist: "周杰伦",
    plays: "980K",
    album: "魔杰座",
    duration: "3:42",
    cover: "https://placehold.co/100x100"
  },
  {
    rank: 4,
    title: "青花瓷",
    artist: "周杰伦",
    plays: "950K",
    album: "我很忙",
    duration: "3:35",
    cover: "https://placehold.co/100x100"
  },
  {
    rank: 5,
    title: "七里香",
    artist: "周杰伦",
    plays: "920K",
    album: "七里香",
    duration: "4:59",
    cover: "https://placehold.co/100x100"
  },
  {
    rank: 6,
    title: "简单爱",
    artist: "周杰伦",
    plays: "900K",
    album: "范特西",
    duration: "4:31",
    cover: "https://placehold.co/100x100"
  }
];

const roleCards = [
  {
    icon: '🎵',
    title: '作曲人',
    description: '创作优质音乐作品，展示您的音乐才华',
    benefits: ['版权保护', '作品变现', '创作协作']
  },
  {
    icon: '✍️',
    title: '作词人',
    description: '用文字诠释音乐，创作动人歌词',
    benefits: ['版权保护', '作品变现', '创作机会']
  },
  {
    icon: '💿',
    title: '唱片公司',
    description: '发掘优秀音乐人，制作发行优质作品',
    benefits: ['人才库', '版权交易', '数据分析']
  },
  {
    icon: '💰',
    title: '投资人',
    description: '投资优质音乐项目，助力音乐产业发展',
    benefits: ['项目对接', '收益分析', '风险控制']
  },
  {
    icon: '🎬',
    title: '影片制作',
    description: '为音乐作品制作MV，创作视觉作品',
    benefits: ['作品展示', '合作机会', '版权保护']
  },
  {
    icon: '🌟',
    title: '其他角色',
    description: '更多音乐产业角色，欢迎加入平台',
    benefits: ['资源对接', '行业机遇', '专业服务']
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('updates');

  const filteredUpdates = mockUpdates.filter(update => {
    if (activeTab === 'updates') return true;
    if (activeTab === 'collaborations') return update.type === 'collaboration';
    if (activeTab === 'works') return update.type === 'work';
    return true;
  });

  return (
    <main className="min-h-screen">
      {/* 主横幅 */}
      <div className="relative w-full h-[200px] mt-2">
        <Image
          src="/images/main.jpg"
          alt="主横幅"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center px-10">
          <h1 className="text-4xl font-bold text-white mb-4 text-shadow">
            iBOM,共同创出您的音乐
          </h1>
          <p className="text-xl text-white mb-6 text-shadow">
            专业级服务 用心打造
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-fit">
            申请免费试用
          </button>
        </div>
      </div>

      {/* 排行榜图片 */}
      <div className="w-full mt-8">
        <Image
          src="/images/rank.jpg"
          alt="排行榜"
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* 最新动态区域 */}
      <div className="w-full mt-12">
        <div className="max-w-[1920px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 最新作品 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-blue-500 mr-2">🎵</span> 最新作品
              </h3>
              <div className="space-y-4">
                {mockUpdates.filter(update => update.type === 'work').slice(0, 3).map((update) => (
                  <div key={update.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={update.user.avatar}
                          alt={update.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{update.user.name}</span>
                          <span className="text-sm text-gray-500">{update.user.role}</span>
                          <span className="text-sm text-gray-500">{update.created_at}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{update.content}</p>
                        {update.work && (
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="relative w-16 h-16 rounded overflow-hidden">
                              <Image
                                src={update.work.cover}
                                alt={update.work.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{update.work.title}</div>
                              <div className="flex gap-4 text-sm text-gray-500">
                                <span>❤️ {update.work.likes}</span>
                                <span>▶️ {update.work.plays}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/works" className="text-blue-500 hover:text-blue-600 text-sm block text-center mt-4">
                  查看更多作品 →
                </Link>
              </div>
            </div>

            {/* 最新协作 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-blue-500 mr-2">🤝</span> 最新协作
              </h3>
              <div className="space-y-4">
                {mockUpdates.filter(update => update.type === 'collaboration').slice(0, 3).map((update) => (
                  <div key={update.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={update.user.avatar}
                          alt={update.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{update.user.name}</span>
                          <span className="text-sm text-gray-500">{update.user.role}</span>
                          <span className="text-sm text-gray-500">{update.created_at}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{update.content}</p>
                        {update.project && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium">{update.project.title}</div>
                            <div className="flex gap-4 text-sm text-gray-500">
                              <span>👥 {update.project.members}人参与</span>
                              <span>⏰ 截止日期: {update.project.deadline}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/collaboration" className="text-blue-500 hover:text-blue-600 text-sm block text-center mt-4">
                  查看更多协作 →
                </Link>
              </div>
            </div>

            {/* 最新动态 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-blue-500 mr-2">📢</span> 最新动态
              </h3>
              <div className="space-y-4">
                {mockUpdates.filter(update => update.type !== 'work' && update.type !== 'collaboration').slice(0, 3).map((update) => (
                  <div key={update.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={update.user.avatar}
                          alt={update.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{update.user.name}</span>
                          <span className="text-sm text-gray-500">{update.user.role}</span>
                          <span className="text-sm text-gray-500">{update.created_at}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{update.content}</p>
                        {update.comment && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">
                              评论了作品《{update.comment.work}》
                            </div>
                            <div className="text-gray-600">{update.comment.text}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/updates" className="text-blue-500 hover:text-blue-600 text-sm block text-center mt-4">
                  查看更多动态 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 平台角色 */}
      <div className="w-full max-w-[1920px] mx-auto py-16 px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">平台入驻</h2>
          <p className="text-gray-600 max-w-2xl">
            加入我们的音乐创作生态系统，与志同道合的伙伴一起创作、分享、成长
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roleCards.map((role, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="text-4xl mb-4">{role.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
              <p className="text-gray-600 mb-4">{role.description}</p>
              <ul className="space-y-2 mb-6">
                {role.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/register" 
                className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                立即入驻
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">已有超过 10,000+ 音乐创作者加入我们</p>
          <Link href="/about" className="text-blue-500 hover:text-blue-600">
            了解更多平台优势 →
          </Link>
        </div>
      </div>
    </main>
  );
}
