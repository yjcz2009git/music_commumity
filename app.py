import streamlit as st
import pandas as pd
import json
import os
from datetime import datetime
from streamlit_option_menu import option_menu
from PIL import Image
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# 设置页面配置
st.set_page_config(
    page_title="音乐协作平台",
    page_icon="🎵",
    layout="wide",
    initial_sidebar_state="collapsed"  # 默认折叠侧边栏
)

# 初始化session state
if 'user_type' not in st.session_state:
    st.session_state.user_type = None
if 'logged_in' not in st.session_state:
    st.session_state.logged_in = False
if 'username' not in st.session_state:
    st.session_state.username = None
if 'user_id' not in st.session_state:
    st.session_state.user_id = None
if 'user_level' not in st.session_state:
    st.session_state.user_level = 1
if 'user_tags' not in st.session_state:
    st.session_state.user_tags = []
if 'wallet_balance' not in st.session_state:
    st.session_state.wallet_balance = 0.0
if 'current_page' not in st.session_state:
    st.session_state.current_page = "home"
if 'selected_musician_id' not in st.session_state:
    st.session_state.selected_musician_id = None

# 模拟数据库
def load_users():
    # 在实际应用中，这里应该从数据库加载用户数据
    return {
        "usernames": ["admin", "composer", "lyricist", "company", "investor", "filmmaker"],
        "names": ["管理员", "作曲人", "作词人", "唱片公司", "投资方", "影片制作"],
        "passwords": ["admin123", "composer123", "lyricist123", "company123", "investor123", "filmmaker123"],
        "user_types": ["admin", "composer", "lyricist", "company", "investor", "filmmaker"]
    }

def load_works():
    # 在实际应用中，这里应该从数据库加载作品数据
    return [
        {"id": 1, "title": "夜曲", "artist": "周杰伦", "composer": "周杰伦", "lyricist": "方文山", "type": "流行", "price": 99.99, "likes": 1200, "created_at": "2024-01-15"},
        {"id": 2, "title": "海阔天空", "artist": "Beyond", "composer": "黄家驹", "lyricist": "黄家驹", "type": "摇滚", "price": 89.99, "likes": 980, "created_at": "2024-02-20"},
        {"id": 3, "title": "青花瓷", "artist": "周杰伦", "composer": "周杰伦", "lyricist": "方文山", "type": "中国风", "price": 79.99, "likes": 1500, "created_at": "2024-03-10"},
        {"id": 4, "title": "平凡之路", "artist": "朴树", "composer": "朴树", "lyricist": "韩寒", "type": "民谣", "price": 69.99, "likes": 1100, "created_at": "2024-04-01"},
    ]

def load_topics():
    # 在实际应用中，这里应该从数据库加载话题数据
    return [
        {"id": 1, "title": "如何创作一首好歌", "author": "composer", "replies": 45, "views": 1200, "created_at": "2024-03-15"},
        {"id": 2, "title": "歌词创作技巧分享", "author": "lyricist", "replies": 38, "views": 980, "created_at": "2024-03-20"},
        {"id": 3, "title": "音乐市场趋势分析", "author": "company", "replies": 52, "views": 1500, "created_at": "2024-04-01"},
        {"id": 4, "title": "投资音乐项目的经验", "author": "investor", "replies": 29, "views": 800, "created_at": "2024-04-05"},
    ]

def load_musicians():
    # 在实际应用中，这里应该从数据库加载音乐人数据
    return [
        {"id": 1, "name": "周杰伦", "type": "composer", "avatar": "images/composer.jpg", "followers": 5000, "works": 15},
        {"id": 2, "name": "方文山", "type": "lyricist", "avatar": "images/lyricist.jpg", "followers": 3200, "works": 20},
        {"id": 3, "name": "华纳音乐", "type": "company", "avatar": "images/company.jpg", "followers": 8000, "works": 100},
        {"id": 4, "name": "腾讯音乐", "type": "investor", "avatar": "images/investor.jpg", "followers": 12000, "works": 200},
        {"id": 5, "name": "张艺谋", "type": "filmmaker", "avatar": "images/filmmaker.jpg", "followers": 4500, "works": 10},
    ]

# 顶部搜索栏
def show_search_bar():
    col1, col2, col3 = st.columns([1, 3, 1])
    with col1:
        try:
            st.image("images/logo.png", width=150)  # 调整logo宽度为150像素
        except:
            st.write("Logo加载失败")
    with col2:
        search_query = st.text_input("搜索音乐、音乐人或作品", key="search_query")
        if search_query:
            st.info(f"搜索结果: {search_query}")
            # 在实际应用中，这里应该实现搜索功能

# 顶部导航菜单
def show_top_navigation():
    # 使用水平菜单
    selected = option_menu(
        menu_title=None,
        options=["首页", "协作", "创作空间", "视频会议", "团队聊天", "作品精选", "直播", "社区", "AIGC音乐创作", "账户", "账号认证"],
        icons=["house", "people", "pencil-square", "camera", "chat-dots", "music-note", "camera-video", "chat", "robot", "person", "shield-check"],
        menu_icon="cast",
        default_index=0,
        orientation="horizontal",
    )
    
    # 显示登录状态和用户信息
    col1, col2, col3 = st.columns([3, 1, 1])
    with col2:
        if st.session_state.logged_in:
            st.write(f"欢迎, {st.session_state.username}!")
    with col3:
        if st.session_state.logged_in:
            if st.button("退出登录", key="logout_top"):
                st.session_state.logged_in = False
                st.session_state.username = None
                st.session_state.user_type = None
                st.experimental_rerun()
        else:
            if st.button("登录", key="login_top"):
                st.session_state.show_login = True
                st.experimental_rerun()
    
    return selected

# 侧边栏 - 只用于显示logo和用户信息
def show_sidebar():
    with st.sidebar:
        try:
            st.image("images/logo.png", width=200, caption="在线音乐协作平台")  # 调整logo宽度为200像素
        except:
            st.write("Logo加载失败")
        
        if st.session_state.logged_in:
            st.write(f"用户类型: {st.session_state.user_type}")
            st.write(f"等级: {st.session_state.user_level}")

# 登录/注册功能 - 使用弹出对话框
def show_login_dialog():
    # 使用弹出对话框
    with st.form("login_form"):
        st.subheader("登录")
        username = st.text_input("用户名", key="login_username")
        password = st.text_input("密码", type="password", key="login_password")
        submit = st.form_submit_button("登录")
        
        if submit:
            # 简单的用户名和密码验证
            users_data = load_users()
            if username in users_data["usernames"]:
                idx = users_data["usernames"].index(username)
                if password == users_data["passwords"][idx]:
                    st.session_state.logged_in = True
                    st.session_state.username = username
                    st.session_state.user_type = users_data["user_types"][idx]
                    st.success("登录成功！")
                    st.session_state.show_login = False
                    st.experimental_rerun()
                else:
                    st.error("密码错误！")
            else:
                st.error("用户名不存在！")
    
    # 添加取消按钮
    if st.button("取消", key="cancel_login"):
        st.session_state.show_login = False
        st.experimental_rerun()

# 首页
def show_home():
    # 主题图片
    st.markdown("""
    <style>
    .theme-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
        margin: 10px 0;
    }
    </style>
    """, unsafe_allow_html=True)
    
    try:
        st.image("images/main.jpg", use_column_width=True, caption="主题图片")
    except:
        st.write("主题图片加载失败")
    
    # 显示排行榜标题和图片
    st.header("全球前50名")
    try:
        st.image("images/rank.jpg", use_column_width=True, caption="全球排行榜")
    except:
        st.write("排行榜图片加载失败")

    # 优秀创作作品展示
    st.subheader("优秀创作作品展示")
    works = load_works()
    
    cols = st.columns(3)
    for i, work in enumerate(works[:3]):
        with cols[i]:
            st.image(f"images/work{i+1}.jpg", caption=work["title"])
            st.write(f"**{work['title']}**")
            st.write(f"作曲: {work['composer']} | 作词: {work['lyricist']}")
            st.write(f"类型: {work['type']} | 价格: ¥{work['price']}")
            st.button("查看详情", key=f"view_work_{work['id']}")
    
    # 平台入住 - 卡片设计
    st.subheader("平台入住")
    st.write("我们欢迎各类音乐人才加入我们的平台，共同创作优秀的音乐作品。")
    
    # 定义卡片样式
    card_style = """
    <style>
    .card {
        background-color: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        height: 100%;
    }
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    .card-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 10px;
        color: #1E88E5;
    }
    .card-content {
        margin-bottom: 15px;
    }
    .card-button {
        background-color: #1E88E5;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 8px 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .card-button:hover {
        background-color: #1565C0;
    }
    </style>
    """
    st.markdown(card_style, unsafe_allow_html=True)
    
    # 使用三列布局
    col1, col2, col3 = st.columns(3)
    
    # 第一行卡片
    with col1:
        st.markdown("""
        <div class="card">
            <div class="card-title">作曲人</div>
            <div class="card-content">创作旋律、编曲，为音乐注入灵魂</div>
            <button class="card-button">立即加入</button>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="card">
            <div class="card-title">作词人</div>
            <div class="card-content">创作歌词，讲述动人的故事</div>
            <button class="card-button">立即加入</button>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="card">
            <div class="card-title">唱片公司</div>
            <div class="card-content">发行音乐，推广优秀作品</div>
            <button class="card-button">立即加入</button>
        </div>
        """, unsafe_allow_html=True)
    
    # 第二行卡片
    col4, col5, col6 = st.columns(3)
    
    with col4:
        st.markdown("""
        <div class="card">
            <div class="card-title">投资方</div>
            <div class="card-content">投资音乐项目，支持音乐创作</div>
            <button class="card-button">立即加入</button>
        </div>
        """, unsafe_allow_html=True)
    
    with col5:
        st.markdown("""
        <div class="card">
            <div class="card-title">影片制作</div>
            <div class="card-content">制作音乐视频，视觉化音乐作品</div>
            <button class="card-button">立即加入</button>
        </div>
        """, unsafe_allow_html=True)
    
    with col6:
        st.markdown("""
        <div class="card">
            <div class="card-title">其他角色</div>
            <div class="card-content">我们欢迎所有热爱音乐的人</div>
            <button class="card-button">立即加入</button>
        </div>
        """, unsafe_allow_html=True)

# 协作页面 - 简化版本
def show_collaboration():
    st.header("协作创作")
    
    tab1, tab2 = st.tabs(["DAW", "创作空间"])
    
    with tab1:
        st.subheader("数字音频工作站 (DAW)")
        st.write("使用Soundation进行音乐创作")
        
        # 使用iframe替代embed_code
        st.markdown('<iframe src="https://soundation.com/studio" width="100%" height="600" frameborder="0"></iframe>', unsafe_allow_html=True)
    
    with tab2:
        st.subheader("创作空间")
        st.write("创建或加入创作会议，与团队成员实时协作")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**创建会议**")
            meeting_name = st.text_input("会议名称", key="create_meeting_name")
            meeting_password = st.text_input("会议密码", type="password", key="create_meeting_password")
            participants = st.multiselect("邀请参与者", ["用户A", "用户B", "用户C"], key="create_meeting_participants")
            
            if st.button("创建会议", key="create_meeting_button"):
                st.success(f"会议 '{meeting_name}' 创建成功！")
                # 在实际应用中，这里应该创建会议并发送邀请
        
        with col2:
            st.write("**加入会议**")
            join_meeting_id = st.text_input("会议ID", key="join_meeting_id")
            join_meeting_password = st.text_input("会议密码", type="password", key="join_meeting_password")
            
            if st.button("加入会议", key="join_meeting_button"):
                st.success(f"已加入会议 '{join_meeting_id}'")
                # 在实际应用中，这里应该加入会议
        
        # 视频会议界面 - 简化版本
        st.subheader("会议界面")
        st.write("这里是视频会议界面，在实际应用中应该集成视频会议功能")
        # 暂时注释掉图片显示，因为图片文件不存在
        # st.image("music_community/images/meeting.jpg", caption="视频会议界面")

# 作品角页面
def show_works_corner():
    st.header("作品精选")
    
    # 作品列表
    works = load_works()
    
    # 筛选选项
    col1, col2, col3 = st.columns(3)
    with col1:
        work_type = st.selectbox("作品类型", ["全部", "流行", "摇滚", "民谣", "电子", "古典", "中国风"])
    with col2:
        sort_by = st.selectbox("排序方式", ["最新发布", "最多点赞", "价格从低到高", "价格从高到低"])
    with col3:
        price_range = st.slider("价格范围", 0, 200, (0, 200))
    
    # 显示作品列表
    for work in works:
        with st.container():
            col1, col2 = st.columns([1, 3])
            
            with col1:
                # 修改图片路径
                try:
                    st.image(f"images/work{work['id']}.jpg", caption=work["title"])
                except:
                    st.write("图片加载失败")
            
            with col2:
                st.write(f"**{work['title']}**")
                st.write(f"作曲: {work['composer']} | 作词: {work['lyricist']}")
                st.write(f"类型: {work['type']} | 价格: ¥{work['price']}")
                st.write(f"点赞: {work['likes']} | 发布时间: {work['created_at']}")
                
                col3, col4, col5 = st.columns(3)
                with col3:
                    st.button("试听", key=f"preview_{work['id']}")
                with col4:
                    st.button("购买", key=f"buy_{work['id']}")
                with col5:
                    st.button("收藏", key=f"favorite_{work['id']}")
            
            st.divider()

# 直播页面
def show_live():
    st.header("音乐直播")
    
    # 直播列表
    st.subheader("正在直播")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.image("images/live1.jpg", caption="直播1")
        st.write("**作曲人A的创作过程**")
        st.write("观看人数: 1,200")
        st.button("进入直播", key="join_live_1")
    
    with col2:
        st.image("images/live2.jpg", caption="直播2")
        st.write("**作词人B的灵感分享**")
        st.write("观看人数: 980")
        st.button("进入直播", key="join_live_2")
    
    with col3:
        st.image("images/live3.jpg", caption="直播3")
        st.write("**音乐制作人C的混音技巧**")
        st.write("观看人数: 750")
        st.button("进入直播", key="join_live_3")
    
    # 创建直播
    st.subheader("创建直播")
    
    col1, col2 = st.columns(2)
    
    with col1:
        live_title = st.text_input("直播标题")
        live_desc = st.text_area("直播描述")
        live_type = st.selectbox("直播类型", ["创作过程", "教学", "演出", "其他"])
    
    with col2:
        live_cover = st.file_uploader("上传直播封面", type=["jpg", "png"])
        live_schedule = st.date_input("直播时间")
        live_duration = st.number_input("预计时长(分钟)", min_value=30, max_value=240, value=60, step=30)
    
    if st.button("创建直播"):
        st.success("直播创建成功！")
        # 在实际应用中，这里应该创建直播

# 社区页面
def show_community():
    st.header("音乐社区")
    
    # 音乐人展示
    st.subheader("推荐音乐人")
    
    musicians = load_musicians()
    
    cols = st.columns(5)
    for i, musician in enumerate(musicians):
        with cols[i]:
            # 修改图片路径
            try:
                st.image(musician["avatar"], caption=musician["name"])
            except:
                st.write("头像加载失败")
            st.write(f"**{musician['name']}**")
            st.write(f"类型: {musician['type']}")
            if st.button("查看主页", key=f"view_musician_{musician['id']}"):
                st.session_state.selected_musician_id = musician["id"]
                st.session_state.current_page = "musician_profile"
                st.experimental_rerun()
    
    # 话题和留言板标签页
    tab1, tab2 = st.tabs(["热门话题", "留言板"])
    
    with tab1:
        # 话题列表
        topics = load_topics()
        
        for topic in topics:
            with st.container():
                st.write(f"**{topic['title']}**")
                st.write(f"作者: {topic['author']} | 回复: {topic['replies']} | 浏览: {topic['views']} | 发布时间: {topic['created_at']}")
                st.button("查看详情", key=f"view_topic_{topic['id']}")
            st.divider()

        # 创建新话题
        with st.expander("创建新话题"):
            topic_title = st.text_input("话题标题")
            topic_content = st.text_area("话题内容")
            topic_tags = st.multiselect("添加标签", ["创作技巧", "行业动态", "设备推荐", "经验分享", "求助"])
            
            if st.button("发布话题"):
                st.success("话题发布成功！")
    
    with tab2:
        # 留言板内容
        st.write("留言板功能即将上线...")

# 音乐人主页
def show_musician_profile():
    # 添加返回按钮
    if st.button("← 返回社区"):
        st.session_state.current_page = "community"
        st.experimental_rerun()
    
    st.header("音乐人主页")
    
    # 获取选中的音乐人ID
    musician_id = st.session_state.get("selected_musician_id", None)
    
    if musician_id is None:
        st.error("未选择音乐人")
        st.button("返回社区", on_click=lambda: setattr(st.session_state, "current_page", "community"))
        return
    
    # 获取音乐人信息
    musicians = load_musicians()
    musician = next((m for m in musicians if m["id"] == musician_id), None)
    
    if musician is None:
        st.error("未找到音乐人信息")
        st.button("返回社区", on_click=lambda: setattr(st.session_state, "current_page", "community"))
        return
    
    # 自定义CSS样式
    st.markdown("""
    <style>
    .profile-header {
        display: flex;
        margin-bottom: 30px;
        padding: 20px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .profile-avatar {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        margin-right: 30px;
        object-fit: cover;
    }
    .profile-info {
        flex: 1;
    }
    .profile-name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .profile-id {
        color: #666;
        margin-bottom: 10px;
    }
    .profile-location {
        color: #666;
        margin-bottom: 15px;
    }
    .profile-stats {
        display: flex;
        gap: 30px;
        margin: 15px 0;
    }
    .stat-item {
        text-align: center;
    }
    .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #1E88E5;
    }
    .stat-label {
        font-size: 14px;
        color: #666;
    }
    .profile-tags {
        margin-top: 15px;
    }
    .profile-tag {
        display: inline-block;
        padding: 4px 12px;
        margin: 0 8px 8px 0;
        border-radius: 15px;
        font-size: 12px;
        color: white;
    }
    .tag-achievement {
        background-color: #FF9800;
    }
    .tag-level {
        background-color: #4CAF50;
    }
    .song-list {
        margin-bottom: 20px;
    }
    .song-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .song-cover {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin-right: 15px;
    }
    .song-info {
        flex: 1;
    }
    .song-title {
        font-weight: bold;
    }
    .song-artist {
        font-size: 12px;
        color: #666;
    }
    .activity-item {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    .activity-time {
        font-size: 12px;
        color: #666;
    }
    </style>
    """, unsafe_allow_html=True)
    
    # 顶部个人信息区域
    st.markdown(f"""
    <div class="profile-header">
        <img src="{musician['avatar']}" class="profile-avatar">
        <div class="profile-info">
            <div class="profile-name">{musician['name']}</div>
            <div class="profile-id">ID: {musician['id']}</div>
            <div class="profile-location">📍 中国 · 北京</div>
            <div class="profile-bio">音乐创作者 / 原创音乐人 / 音乐制作人</div>
            <div class="profile-stats">
                <div class="stat-item">
                    <div class="stat-value">{musician['works']}</div>
                    <div class="stat-label">作品</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{musician['followers']}</div>
                    <div class="stat-label">粉丝</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{musician['followers'] // 10}</div>
                    <div class="stat-label">关注</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{musician['followers'] * 100}</div>
                    <div class="stat-label">人气值</div>
                </div>
            </div>
            <div class="profile-tags">
                <span class="profile-tag tag-level">Lv.8 音乐人</span>
                <span class="profile-tag tag-achievement">年度优秀创作者</span>
                <span class="profile-tag tag-achievement">白金音乐人</span>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # 关注按钮
    col1, col2, col3 = st.columns([1, 1, 4])
    with col1:
        if st.button("关注"):
            st.success(f"已关注 {musician['name']}")
    with col2:
        if st.button("私信"):
            st.info("私信功能即将上线")
    
    # 内容标签页
    tab1, tab2, tab3, tab4, tab5 = st.tabs(["主页", "原创", "翻唱", "视频", "更多"])
    
    with tab1:
        # 创建两列布局
        col1, col2 = st.columns([2, 1])
        
        with col1:
            # 最新歌曲
            st.subheader("最新歌曲")
            latest_songs = [
                {"title": "新歌A", "artist": musician['name'], "cover": "images/work1.jpg", "plays": "12.5万"},
                {"title": "新歌B", "artist": musician['name'], "cover": "images/work2.jpg", "plays": "8.3万"},
                {"title": "新歌C", "artist": musician['name'], "cover": "images/work3.jpg", "plays": "5.7万"}
            ]
            
            for song in latest_songs:
                st.markdown(f"""
                <div class="song-item">
                    <img src="{song['cover']}" class="song-cover">
                    <div class="song-info">
                        <div class="song-title">{song['title']}</div>
                        <div class="song-artist">{song['artist']} · {song['plays']}播放</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
            
            # 最热歌曲
            st.subheader("最热歌曲")
            hot_songs = [
                {"title": "热门歌A", "artist": musician['name'], "cover": "images/work4.jpg", "plays": "50.2万"},
                {"title": "热门歌B", "artist": musician['name'], "cover": "images/work1.jpg", "plays": "45.8万"},
                {"title": "热门歌C", "artist": musician['name'], "cover": "images/work2.jpg", "plays": "38.4万"}
            ]
            
            for song in hot_songs:
                st.markdown(f"""
                <div class="song-item">
                    <img src="{song['cover']}" class="song-cover">
                    <div class="song-info">
                        <div class="song-title">{song['title']}</div>
                        <div class="song-artist">{song['artist']} · {song['plays']}播放</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
        
        with col2:
            # 动态
            st.subheader("最新动态")
            activities = [
                {"time": "2小时前", "content": "发布了新歌《新歌A》"},
                {"time": "5小时前", "content": "更新了个人简介"},
                {"time": "1天前", "content": "发布了新的翻唱作品"},
                {"time": "2天前", "content": "参加了音乐节演出"}
            ]
            
            for activity in activities:
                st.markdown(f"""
                <div class="activity-item">
                    <div>{activity['content']}</div>
                    <div class="activity-time">{activity['time']}</div>
                </div>
                """, unsafe_allow_html=True)
            
            # TA的关注
            st.subheader("TA的关注")
            following = [
                {"name": "音乐人A", "avatar": "images/composer.jpg"},
                {"name": "音乐人B", "avatar": "images/lyricist.jpg"},
                {"name": "音乐人C", "avatar": "images/company.jpg"}
            ]
            
            cols = st.columns(3)
            for i, follow in enumerate(following):
                with cols[i]:
                    st.image(follow['avatar'], caption=follow['name'], width=60)
    
    with tab2:
        st.subheader("原创作品")
        works = load_works()
        original_works = [w for w in works if w["composer"] == musician["name"]]
        for work in original_works:
            st.markdown(f"""
            <div class="song-item">
                <img src="images/work{work['id']}.jpg" class="song-cover">
                <div class="song-info">
                    <div class="song-title">{work['title']}</div>
                    <div class="song-artist">播放量: {work['likes']}次</div>
                </div>
            </div>
            """, unsafe_allow_html=True)
    
    with tab3:
        st.subheader("翻唱作品")
        st.write("暂无翻唱作品")
    
    with tab4:
        st.subheader("视频作品")
        st.write("暂无视频作品")
    
    with tab5:
        st.subheader("更多内容")
        st.write("敬请期待...")

# AIGC音乐创作页面
def show_aigc():
    st.header("AIGC音乐创作")
    
    tab1, tab2, tab3 = st.tabs(["AI作词", "AI作曲", "歌曲识别"])
    
    with tab1:
        st.subheader("AI作词")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**输入参数**")
            song_title = st.text_input("歌曲标题")
            song_theme = st.text_input("歌曲主题")
            song_style = st.selectbox("歌曲风格", ["流行", "摇滚", "民谣", "电子", "古典", "中国风"])
            song_language = st.selectbox("歌词语言", ["中文", "英文", "日文", "韩文"])
            song_length = st.slider("歌词长度", 100, 500, 300, 50)
            
            if st.button("生成歌词"):
                with st.spinner("AI正在创作歌词..."):
                    # 在实际应用中，这里应该调用AI作词API
                    st.success("歌词生成成功！")
        
        with col2:
            st.write("**生成结果**")
            st.text_area("生成的歌词", "这里是AI生成的歌词内容...", height=300)
            
            col3, col4 = st.columns(2)
            with col3:
                st.button("保存歌词", key="save_lyrics")
            with col4:
                st.button("重新生成", key="regenerate_lyrics")
    
    with tab2:
        st.subheader("AI作曲")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**输入参数**")
            music_title = st.text_input("音乐标题")
            music_style = st.selectbox("音乐风格", ["流行", "摇滚", "民谣", "电子", "古典", "中国风"])
            music_tempo = st.slider("音乐速度(BPM)", 60, 180, 120, 5)
            music_duration = st.slider("音乐时长(秒)", 30, 300, 180, 30)
            music_instruments = st.multiselect("乐器", ["钢琴", "吉他", "贝斯", "鼓", "小提琴", "二胡", "笛子"])
            
            if st.button("生成音乐"):
                with st.spinner("AI正在创作音乐..."):
                    # 在实际应用中，这里应该调用AI作曲API
                    st.success("音乐生成成功！")
        
        with col2:
            st.write("**生成结果**")
            st.audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")
            
            col3, col4 = st.columns(2)
            with col3:
                st.button("保存音乐", key="save_music")
            with col4:
                st.button("重新生成", key="regenerate_music")
    
    with tab3:
        st.subheader("歌曲识别")
        st.write("歌曲识别功能即将上线...")

# 账户页面
def show_account():
    st.header("我的账户")
    
    tab1, tab2, tab3, tab4 = st.tabs(["用户信息", "等级", "标签", "钱包"])
    
    with tab1:
        st.subheader("用户信息")
        
        col1, col2 = st.columns([1, 2])
        
        with col1:
            # 修改图片路径
            try:
                st.image("images/avatar.jpg", caption="头像")
            except:
                st.write("头像加载失败")
            st.file_uploader("更换头像", type=["jpg", "png"])
        
        with col2:
            username = st.text_input("用户名", value=st.session_state.username)
            email = st.text_input("邮箱", value="example@email.com")
            phone = st.text_input("手机号", value="13800138000")
            bio = st.text_area("个人简介", value="这是一段个人简介...")
            
            if st.button("保存修改"):
                st.success("个人信息更新成功！")
    
    with tab2:
        st.subheader("等级系统")
        
        st.write(f"当前等级: {st.session_state.user_level}")
        st.progress(st.session_state.user_level / 10)
        
        st.write("**等级特权**")
        if st.session_state.user_level >= 1:
            st.write("✅ 基础功能使用")
        if st.session_state.user_level >= 3:
            st.write("✅ 高级创作工具")
        if st.session_state.user_level >= 5:
            st.write("✅ 优先推荐")
        if st.session_state.user_level >= 7:
            st.write("✅ 专属客服")
        if st.session_state.user_level >= 10:
            st.write("✅ 平台认证")
        
        st.write("**升级条件**")
        st.write(f"距离下一级还需: {100 - (st.session_state.user_level * 10)} 经验值")
    
    with tab3:
        st.subheader("标签管理")
        
        st.write("**我的标签**")
        for tag in st.session_state.user_tags:
            st.write(f"🏷️ {tag}")
        
        new_tag = st.text_input("添加新标签")
        if st.button("添加标签"):
            if new_tag and new_tag not in st.session_state.user_tags:
                st.session_state.user_tags.append(new_tag)
                st.success(f"标签 '{new_tag}' 添加成功！")
    
    with tab4:
        st.subheader("我的钱包")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write(f"**账户余额: ¥{st.session_state.wallet_balance:.2f}**")
            st.button("充值")
            st.button("提现")
        
        with col2:
            st.write("**交易记录**")
            transactions = [
                {"date": "2024-04-04", "type": "收入", "amount": "¥500.00", "desc": "作品销售"},
                {"date": "2024-04-03", "type": "支出", "amount": "¥200.00", "desc": "购买服务"},
                {"date": "2024-04-01", "type": "收入", "amount": "¥300.00", "desc": "打赏收入"}
            ]
            for trans in transactions:
                st.write(f"{trans['date']} | {trans['type']} | {trans['amount']} | {trans['desc']}")

# 创作空间页面
def show_creation_space():
    st.header("创作空间")
    
    # 创建两列布局，比例为2:1
    col1, col2 = st.columns([2, 1])
    
    with col1:
        tab1, tab2, tab3 = st.tabs(["申请空间", "团队聊天", "我的空间"])
        
        with tab1:
            st.subheader("申请创作空间")
            
            # 空间信息表单
            with st.form("space_application"):
                space_name = st.text_input("空间名称")
                space_type = st.selectbox("空间类型", ["个人工作室", "乐队", "音乐工作室", "制作团队"])
                space_desc = st.text_area("空间简介")
                space_tags = st.multiselect("标签", ["流行", "摇滚", "民谣", "电子", "古典", "爵士"])
                
                col3, col4 = st.columns(2)
                with col3:
                    space_size = st.number_input("预计成员数", min_value=1, max_value=50, value=5)
                with col4:
                    space_duration = st.selectbox("预计使用时长", ["1个月", "3个月", "6个月", "1年", "长期"])
                
                submitted = st.form_submit_button("提交申请")
                if submitted:
                    st.success("申请已提交，我们将在24小时内审核！")
        
        with tab2:
            st.subheader("团队聊天")
            
            # 自定义CSS样式
            st.markdown("""
            <style>
            .chat-container {
                background-color: #f8f9fa;
                border-radius: 10px;
                padding: 15px;
                margin: 10px 0;
            }
            .chat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            .chat-room {
                background-color: white;
                border-radius: 8px;
                padding: 10px;
                margin: 10px 0;
                cursor: pointer;
            }
            .chat-room:hover {
                background-color: #f0f0f0;
            }
            .contact-list {
                margin-top: 20px;
            }
            .contact-item {
                display: flex;
                align-items: center;
                padding: 8px;
                border-bottom: 1px solid #eee;
            }
            .contact-avatar {
                width: 40px;
                height: 40px;
                border-radius: 20px;
                margin-right: 10px;
            }
            .online-status {
                width: 10px;
                height: 10px;
                border-radius: 5px;
                margin-left: 10px;
            }
            .online {
                background-color: #4CAF50;
            }
            .offline {
                background-color: #9e9e9e;
            }
            </style>
            """, unsafe_allow_html=True)
            
            # 聊天室列表
            st.markdown("""
            <div class="chat-container">
                <div class="chat-header">
                    <h3>聊天室</h3>
                    <div>
                        <span style="margin-right: 10px;">👥 在线成员: 5</span>
                    </div>
                </div>
                <div class="chat-room">
                    <strong>创作讨论组</strong>
                    <div style="color: #666; font-size: 12px;">8人 · 2条未读消息</div>
                </div>
                <div class="chat-room">
                    <strong>编曲小组</strong>
                    <div style="color: #666; font-size: 12px;">5人 · 活跃中</div>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            # 发起新聊天
            if st.button("+ 发起新聊天"):
                st.info("选择联系人创建聊天")
            
            # 联系人列表
            st.subheader("联系人")
            contacts = [
                {"name": "张三", "avatar": "images/composer.jpg", "online": True, "status": "作曲中..."},
                {"name": "李四", "avatar": "images/lyricist.jpg", "online": True, "status": "在线"},
                {"name": "王五", "avatar": "images/company.jpg", "online": False, "status": "离线"},
            ]
            
            for contact in contacts:
                st.markdown(f"""
                <div class="contact-item">
                    <img src="{contact['avatar']}" class="contact-avatar">
                    <div style="flex: 1">
                        <div><strong>{contact['name']}</strong></div>
                        <div style="color: #666; font-size: 12px;">{contact['status']}</div>
                    </div>
                    <div class="online-status {'online' if contact['online'] else 'offline'}"></div>
                </div>
                """, unsafe_allow_html=True)
            
            # 邀请新联系人
            if st.button("+ 邀请联系人"):
                st.info("输入邮箱或ID邀请新联系人")
        
        with tab3:
            st.subheader("我的创作空间")
            st.write("暂无创作空间")
    
    with col2:
        st.subheader("加入空间")
        
        # 搜索框
        st.text_input("搜索空间", placeholder="输入空间名称或ID")
        
        # 推荐空间列表
        spaces = [
            {
                "name": "摇滚乐队工作室",
                "type": "乐队",
                "members": 8,
                "tags": ["摇滚", "乐队创作"]
            },
            {
                "name": "电子音乐制作室",
                "type": "工作室",
                "members": 5,
                "tags": ["电子", "混音"]
            },
            {
                "name": "古典音乐协会",
                "type": "团队",
                "members": 12,
                "tags": ["古典", "室内乐"]
            }
        ]
        
        for space in spaces:
            with st.container():
                st.markdown(f"""
                <div style="padding: 10px; border: 1px solid #eee; border-radius: 5px; margin: 10px 0;">
                    <div style="font-weight: bold;">{space['name']}</div>
                    <div style="color: #666; font-size: 12px;">类型: {space['type']} | 成员: {space['members']}</div>
                    <div style="margin-top: 5px;">
                        {''.join([f'<span style="background-color: #e3f2fd; color: #1e88e5; padding: 2px 8px; border-radius: 10px; font-size: 12px; margin-right: 5px;">{tag}</span>' for tag in space['tags']])}
                    </div>
                </div>
                """, unsafe_allow_html=True)
                st.button("申请加入", key=f"join_{space['name']}")

# 视频会议页面
def show_video_conference():
    st.header("视频会议")
    
    # 添加视频会议界面样式
    st.markdown("""
    <style>
    .video-container {
        background-color: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
        margin: 10px 0;
    }
    .participant-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin: 20px 0;
    }
    .participant {
        background-color: #333;
        border-radius: 8px;
        padding: 20px;
        color: white;
        text-align: center;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .controls {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
    }
    .control-button {
        background-color: #1E88E5;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
    }
    .chat-panel {
        background-color: white;
        border-radius: 8px;
        padding: 15px;
        margin-top: 20px;
    }
    </style>
    """, unsafe_allow_html=True)

    # 创建会议控制面板
    col1, col2 = st.columns([3, 1])
    
    with col1:
        # 视频网格
        st.markdown("""
        <div class="video-container">
            <div class="participant-grid">
                <div class="participant">参会者 1 (您)</div>
                <div class="participant">参会者 2</div>
                <div class="participant">参会者 3</div>
                <div class="participant">参会者 4</div>
            </div>
            <div class="controls">
                <button class="control-button">🎤 麦克风</button>
                <button class="control-button">📹 摄像头</button>
                <button class="control-button">🖥️ 共享屏幕</button>
                <button class="control-button" style="background-color: #dc3545;">❌ 结束会议</button>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        # 会议信息和聊天面板
        st.subheader("会议信息")
        st.write("会议ID: 123-456-789")
        st.write("时长: 00:45:30")
        
        st.subheader("参会者")
        st.write("• 参会者 1 (主持人)")
        st.write("• 参会者 2")
        st.write("• 参会者 3")
        st.write("• 参会者 4")
        
        st.markdown("""
        <div class="chat-panel">
            <h4>聊天</h4>
            <div style="height: 200px; overflow-y: auto;">
                <p><strong>参会者 1:</strong> 大家好！</p>
                <p><strong>参会者 2:</strong> 你好！</p>
                <p><strong>参会者 3:</strong> 声音正常吗？</p>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # 发送消息
        message = st.text_input("发送消息")
        st.button("发送")

# 团队聊天页面
def show_team_chat():
    st.header("团队聊天")
    
    # 添加聊天界面样式
    st.markdown("""
    <style>
    .chat-layout {
        display: flex;
        gap: 20px;
        margin: 20px 0;
    }
    .chat-sidebar {
        width: 250px;
        background: #f8f9fa;
        border-radius: 10px;
        padding: 15px;
    }
    .chat-main {
        flex: 1;
        background: #fff;
        border-radius: 10px;
        padding: 15px;
    }
    .chat-room-item {
        padding: 10px;
        margin: 5px 0;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .chat-room-item:hover {
        background-color: #e9ecef;
    }
    .chat-room-active {
        background-color: #e3f2fd;
    }
    .chat-message {
        padding: 10px;
        margin: 5px 0;
        border-radius: 8px;
    }
    .message-sent {
        background-color: #e3f2fd;
        margin-left: 20%;
        margin-right: 5px;
    }
    .message-received {
        background-color: #f8f9fa;
        margin-right: 20%;
        margin-left: 5px;
    }
    .chat-input {
        margin-top: 20px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 10px;
    }
    .member-list {
        margin-top: 20px;
    }
    .member-item {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
    }
    .member-avatar {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-right: 10px;
    }
    .online-indicator {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        margin-left: auto;
    }
    .online {
        background-color: #4CAF50;
    }
    .offline {
        background-color: #9e9e9e;
    }
    </style>
    """, unsafe_allow_html=True)

    # 创建聊天室布局
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col1:
        st.subheader("聊天室")
        
        # 创建新聊天室按钮
        if st.button("➕ 创建聊天室"):
            st.session_state.show_create_chat = True
        
        # 聊天室列表
        chat_rooms = [
            {"id": 1, "name": "音乐创作交流群", "unread": 3},
            {"id": 2, "name": "编曲讨论组", "unread": 0},
            {"id": 3, "name": "作词工作坊", "unread": 5},
        ]
        
        for room in chat_rooms:
            st.markdown(f"""
            <div class="chat-room-item">
                <strong>{room['name']}</strong>
                {f'<span style="float: right; background: #1E88E5; color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px;">{room["unread"]}</span>' if room['unread'] > 0 else ''}
            </div>
            """, unsafe_allow_html=True)
    
    with col2:
        st.subheader("音乐创作交流群")
        
        # 聊天消息
        messages = [
            {"sender": "张三", "content": "大家好！我是新来的作曲人", "time": "10:00", "type": "received"},
            {"sender": "李四", "content": "欢迎欢迎！", "time": "10:01", "type": "received"},
            {"sender": "我", "content": "最近在创作一首新歌，想请大家给点建议", "time": "10:05", "type": "sent"},
            {"sender": "王五", "content": "可以分享一下demo吗？", "time": "10:06", "type": "received"},
        ]
        
        for msg in messages:
            st.markdown(f"""
            <div class="chat-message {'message-sent' if msg['type'] == 'sent' else 'message-received'}">
                <div style="font-size: 12px; color: #666;">
                    {msg['sender'] if msg['type'] == 'received' else '我'} · {msg['time']}
                </div>
                <div style="margin-top: 5px;">
                    {msg['content']}
                </div>
            </div>
            """, unsafe_allow_html=True)
        
        # 输入框和发送按钮
        col_input, col_send = st.columns([5, 1])
        with col_input:
            message = st.text_input("输入消息...", key="message_input")
        with col_send:
            st.button("发送")
    
    with col3:
        st.subheader("成员列表")
        
        # 邀请按钮
        if st.button("➕ 邀请成员"):
            st.session_state.show_invite = True
        
        # 成员列表
        members = [
            {"name": "张三", "avatar": "images/composer.jpg", "online": True, "role": "管理员"},
            {"name": "李四", "avatar": "images/lyricist.jpg", "online": True, "role": "成员"},
            {"name": "王五", "avatar": "images/company.jpg", "online": False, "role": "成员"},
        ]
        
        for member in members:
            st.markdown(f"""
            <div class="member-item">
                <img src="{member['avatar']}" class="member-avatar">
                <div>
                    <div><strong>{member['name']}</strong></div>
                    <div style="font-size: 12px; color: #666;">{member['role']}</div>
                </div>
                <div class="online-indicator {'online' if member['online'] else 'offline'}"></div>
            </div>
            """, unsafe_allow_html=True)

        # 在线成员统计
        online_count = sum(1 for m in members if m['online'])
        st.write(f"在线成员：{online_count}/{len(members)}")

# 账号认证页面
def show_account_verification():
    st.header("账号认证")
    
    # 添加认证页面样式
    st.markdown("""
    <style>
    .verification-card {
        background-color: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
        margin: 10px 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .verification-status {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 14px;
        font-weight: bold;
        margin-left: 10px;
    }
    .status-verified {
        background-color: #4CAF50;
        color: white;
    }
    .status-pending {
        background-color: #FFC107;
        color: black;
    }
    .status-unverified {
        background-color: #F44336;
        color: white;
    }
    .verification-step {
        display: flex;
        align-items: center;
        margin: 15px 0;
        padding: 10px;
        border-radius: 8px;
        background-color: white;
    }
    .step-number {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #1E88E5;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-weight: bold;
    }
    .step-completed {
        background-color: #4CAF50;
    }
    .step-current {
        background-color: #FFC107;
    }
    .verification-document {
        border: 1px dashed #ccc;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        margin: 10px 0;
    }
    .verification-document:hover {
        border-color: #1E88E5;
    }
    </style>
    """, unsafe_allow_html=True)
    
    # 认证状态
    st.markdown("""
    <div class="verification-card">
        <h3>认证状态 <span class="verification-status status-pending">审核中</span></h3>
        <p>您的账号认证申请正在审核中，预计1-3个工作日完成审核。</p>
    </div>
    """, unsafe_allow_html=True)
    
    # 认证类型选择
    st.subheader("选择认证类型")
    verification_type = st.radio(
        "请选择您要认证的类型",
        ["个人音乐人", "音乐工作室", "唱片公司", "音乐教育机构", "其他"]
    )
    
    # 认证步骤
    st.subheader("认证步骤")
    
    # 步骤1：基本信息
    st.markdown("""
    <div class="verification-step">
        <div class="step-number step-completed">1</div>
        <div>
            <h4>填写基本信息</h4>
            <p>填写您的个人或机构基本信息</p>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # 步骤2：身份验证
    st.markdown("""
    <div class="verification-step">
        <div class="step-number step-current">2</div>
        <div>
            <h4>身份验证</h4>
            <p>上传身份证明文件</p>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # 步骤3：专业资质
    st.markdown("""
    <div class="verification-step">
        <div class="step-number">3</div>
        <div>
            <h4>专业资质</h4>
            <p>上传专业资质证明</p>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # 步骤4：作品展示
    st.markdown("""
    <div class="verification-step">
        <div class="step-number">4</div>
        <div>
            <h4>作品展示</h4>
            <p>上传代表作品或作品集</p>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # 身份验证表单
    st.subheader("身份验证")
    
    # 根据认证类型显示不同的表单
    if verification_type == "个人音乐人":
        st.write("请上传您的身份证正反面照片")
        col1, col2 = st.columns(2)
        with col1:
            st.markdown("""
            <div class="verification-document">
                <p>上传身份证正面照片</p>
            </div>
            """, unsafe_allow_html=True)
            st.file_uploader("身份证正面", type=["jpg", "png", "jpeg"], key="id_front")
        with col2:
            st.markdown("""
            <div class="verification-document">
                <p>上传身份证反面照片</p>
            </div>
            """, unsafe_allow_html=True)
            st.file_uploader("身份证反面", type=["jpg", "png", "jpeg"], key="id_back")
    else:
        st.write("请上传您的营业执照或组织机构代码证")
        st.markdown("""
        <div class="verification-document">
            <p>上传营业执照或组织机构代码证</p>
        </div>
        """, unsafe_allow_html=True)
        st.file_uploader("营业执照", type=["jpg", "png", "jpeg", "pdf"], key="business_license")
    
    # 专业资质证明
    st.subheader("专业资质证明")
    st.write("请上传您的专业资质证明，如音乐证书、获奖证书等")
    st.markdown("""
    <div class="verification-document">
        <p>上传专业资质证明</p>
    </div>
    """, unsafe_allow_html=True)
    st.file_uploader("专业资质证明", type=["jpg", "png", "jpeg", "pdf"], key="qualification")
    
    # 作品展示
    st.subheader("作品展示")
    st.write("请上传您的代表作品或作品集")
    st.markdown("""
    <div class="verification-document">
        <p>上传代表作品或作品集</p>
    </div>
    """, unsafe_allow_html=True)
    st.file_uploader("作品集", type=["mp3", "wav", "pdf", "zip"], key="portfolio")
    
    # 提交按钮
    if st.button("提交认证申请", key="submit_verification"):
        st.success("您的认证申请已提交，我们将在1-3个工作日内完成审核。")
        st.info("审核结果将通过站内信和邮件通知您。")

# 主函数
def main():
    # 初始化session state
    if 'show_login' not in st.session_state:
        st.session_state.show_login = False
    
    # 显示顶部搜索栏
    show_search_bar()
    
    # 显示顶部导航菜单
    selected = show_top_navigation()
    
    # 显示侧边栏（只用于显示logo和用户信息）
    show_sidebar()
    
    # 添加调试信息
    st.write(f"当前选中的菜单: {selected}")
    st.write(f"登录状态: {st.session_state.logged_in}")
    
    # 如果显示登录对话框
    if st.session_state.show_login:
        # 使用弹出对话框
        with st.container():
            st.markdown("""
            <style>
            .login-dialog {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin: 20px auto;
                max-width: 400px;
            }
            </style>
            """, unsafe_allow_html=True)
            
            with st.container():
                st.markdown('<div class="login-dialog">', unsafe_allow_html=True)
                show_login_dialog()
                st.markdown('</div>', unsafe_allow_html=True)
    else:
        # 检查是否在音乐人主页
        if st.session_state.current_page == "musician_profile":
            show_musician_profile()
        else:
            # 根据菜单选择显示页面
            if selected == "首页":
                show_home()
            elif selected == "协作":
                show_collaboration()
                if not st.session_state.logged_in:
                    st.info("登录后可以创建和加入协作会议")
            elif selected == "创作空间":
                show_creation_space()
                if not st.session_state.logged_in:
                    st.info("登录后可以申请和加入创作空间")
            elif selected == "作品精选":
                show_works_corner()
                if not st.session_state.logged_in:
                    st.info("登录后可以购买和收藏作品")
            elif selected == "直播":
                show_live()
                if not st.session_state.logged_in:
                    st.info("登录后可以创建直播和与主播互动")
            elif selected == "社区":
                show_community()
                if not st.session_state.logged_in:
                    st.info("登录后可以发布话题和关注音乐人")
            elif selected == "AIGC音乐创作":
                show_aigc()
                if not st.session_state.logged_in:
                    st.info("登录后可以保存生成的作品")
            elif selected == "账户":
                if not st.session_state.logged_in:
                    st.warning("请先登录以访问账户")
                    if st.button("登录", key="login_account"):
                        st.session_state.show_login = True
                        st.experimental_rerun()
                else:
                    show_account()
            elif selected == "账号认证":
                if not st.session_state.logged_in:
                    st.warning("请先登录以进行账号认证")
                    if st.button("登录", key="login_verification"):
                        st.session_state.show_login = True
                        st.experimental_rerun()
                else:
                    show_account_verification()
            elif selected == "视频会议":
                show_video_conference()
                if not st.session_state.logged_in:
                    st.info("请登录后参加视频会议")
            elif selected == "团队聊天":
                show_team_chat()
                if not st.session_state.logged_in:
                    st.info("请登录后参与团队聊天")
            else:
                st.error(f"未知的菜单选项: {selected}")

if __name__ == "__main__":
    main() 