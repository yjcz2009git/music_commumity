import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-3xl">
        <h1 className="text-5xl font-bold mb-6">全球音乐协作平台</h1>
        <p className="text-xl mb-8">连接全球音乐人，激发创作灵感</p>
        <div className="space-x-4">
          <Link href="/register" className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
            立即加入
          </Link>
          <Link href="/explore" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition">
            探索作品
          </Link>
        </div>
      </section>

      {/* Global Music Rankings */}
      <section>
        <h2 className="text-3xl font-bold mb-8">全球音乐排行榜</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-purple-600">#{rank}</div>
                <div>
                  <h3 className="font-semibold">热门歌曲 {rank}</h3>
                  <p className="text-gray-600">创作者名称</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Works */}
      <section>
        <h2 className="text-3xl font-bold mb-8">精选创作</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <Image
                  src={`/placeholder-${item}.jpg`}
                  alt="Featured work"
                  width={300}
                  height={200}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">作品标题 {item}</h3>
                <p className="text-gray-600 text-sm">创作者名称</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Roles */}
      <section>
        <h2 className="text-3xl font-bold mb-8">平台角色</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: "作曲人", icon: "🎵" },
            { title: "作词人", icon: "✍️" },
            { title: "唱片公司", icon: "💿" },
            { title: "投资方", icon: "💰" },
            { title: "影片制作", icon: "🎬" },
          ].map((role) => (
            <div key={role.title} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">{role.icon}</div>
              <h3 className="font-semibold">{role.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
