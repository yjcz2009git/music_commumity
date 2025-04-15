# 音乐社区平台

这是一个音乐协作社区平台，包含前端和后端两个部分。

## 项目结构

- `frontend/`: Next.js 前端应用
- `app.py`: Streamlit 后端应用

## 部署指南

### 前端部署 (Next.js)

1. 进入前端目录:
   ```
   cd frontend
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 构建生产版本:
   ```
   npm run build
   ```

4. 启动生产服务器:
   ```
   npm start
   ```

5. 访问应用:
   打开浏览器访问 http://localhost:3000

### 后端部署 (Streamlit)

1. 安装依赖:
   ```
   pip install streamlit pandas pillow python-dotenv streamlit-option-menu
   ```

2. 启动后端服务:
   ```
   streamlit run app.py
   ```

3. 访问后端:
   打开浏览器访问 http://localhost:8501

## 开发环境设置

### 前端开发

1. 进入前端目录:
   ```
   cd frontend
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 启动开发服务器:
   ```
   npm run dev
   ```

4. 访问开发环境:
   打开浏览器访问 http://localhost:3000

### 后端开发

1. 安装依赖:
   ```
   pip install streamlit pandas pillow python-dotenv streamlit-option-menu
   ```

2. 启动开发服务器:
   ```
   streamlit run app.py
   ```

3. 访问开发环境:
   打开浏览器访问 http://localhost:8501

## 环境变量

创建 `.env` 文件在前端目录中，包含以下变量:

```
NEXT_PUBLIC_API_URL=http://localhost:8501
```

## 生产部署

### 使用 Docker 部署

1. 构建前端 Docker 镜像:
   ```
   cd frontend
   docker build -t music-community-frontend .
   ```

2. 构建后端 Docker 镜像:
   ```
   docker build -t music-community-backend .
   ```

3. 使用 Docker Compose 启动服务:
   ```
   docker-compose up -d
   ```

## 常见问题

- 如果遇到 CORS 问题，请确保后端已正确配置 CORS 设置
- 如果图片无法加载，请检查图片路径是否正确
- 如果登录功能不工作，请检查环境变量是否正确设置 