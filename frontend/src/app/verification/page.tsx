'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function VerificationPage() {
  const [verificationType, setVerificationType] = useState('个人认证');
  const [step, setStep] = useState(1);

  const types = ['个人认证', '机构认证', '企业认证'];

  return (
    <div className="st-container">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">账号认证</h1>

        {/* 认证类型选择 */}
        <div className="st-card mb-8">
          <h2 className="text-lg font-semibold mb-4">选择认证类型</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setVerificationType(type);
                  setStep(1);
                }}
                className={`p-4 rounded-lg border-2 text-center ${
                  verificationType === type
                    ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl mb-2">
                  {type === '个人认证' ? '👤' : type === '机构认证' ? '🏛️' : '🏢'}
                </div>
                <div className="font-medium">{type}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {type === '个人认证'
                    ? '适用于音乐创作者、歌手等'
                    : type === '机构认证'
                    ? '适用于音乐工作室、教育机构等'
                    : '适用于音乐公司、唱片公司等'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 认证步骤 */}
        <div className="st-card">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">{verificationType}申请</h2>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-primary))] text-white flex items-center justify-center">
                1
              </div>
              <div className="w-12 h-1 bg-gray-200">
                <div
                  className="h-full bg-[rgb(var(--color-primary))]"
                  style={{ width: step >= 2 ? '100%' : '0%' }}
                ></div>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? 'bg-[rgb(var(--color-primary))] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                2
              </div>
              <div className="w-12 h-1 bg-gray-200">
                <div
                  className="h-full bg-[rgb(var(--color-primary))]"
                  style={{ width: step >= 3 ? '100%' : '0%' }}
                ></div>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? 'bg-[rgb(var(--color-primary))] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                3
              </div>
            </div>
          </div>

          {/* 步骤1：基本信息 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {verificationType === '个人认证' ? '姓名' : '机构名称'}
                </label>
                <input
                  type="text"
                  className="st-input"
                  placeholder={
                    verificationType === '个人认证'
                      ? '请输入真实姓名'
                      : '请输入机构名称'
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {verificationType === '个人认证' ? '身份证号' : '营业执照号'}
                </label>
                <input
                  type="text"
                  className="st-input"
                  placeholder={
                    verificationType === '个人认证'
                      ? '请输入身份证号'
                      : '请输入营业执照号'
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系电话
                </label>
                <input
                  type="tel"
                  className="st-input"
                  placeholder="请输入联系电话"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  电子邮箱
                </label>
                <input
                  type="email"
                  className="st-input"
                  placeholder="请输入电子邮箱"
                />
              </div>
              <button
                className="st-button w-full"
                onClick={() => setStep(2)}
              >
                下一步
              </button>
            </div>
          )}

          {/* 步骤2：上传证件 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {verificationType === '个人认证'
                    ? '上传身份证照片'
                    : '上传营业执照'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-gray-500">
                    <div className="text-4xl mb-2">📄</div>
                    <p>点击或拖拽文件到此处上传</p>
                    <p className="text-sm mt-1">
                      支持 JPG、PNG 格式，大小不超过 5MB
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {verificationType === '个人认证'
                    ? '上传手持身份证照片'
                    : '上传法人身份证'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-gray-500">
                    <div className="text-4xl mb-2">📸</div>
                    <p>点击或拖拽文件到此处上传</p>
                    <p className="text-sm mt-1">
                      支持 JPG、PNG 格式，大小不超过 5MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  className="st-button flex-1"
                  onClick={() => setStep(1)}
                >
                  上一步
                </button>
                <button
                  className="st-button flex-1"
                  onClick={() => setStep(3)}
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* 步骤3：补充信息 */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {verificationType === '个人认证' ? '个人简介' : '机构简介'}
                </label>
                <textarea
                  className="st-input"
                  rows={4}
                  placeholder={
                    verificationType === '个人认证'
                      ? '请简要介绍您的音乐经历和成就'
                      : '请简要介绍机构的主要业务和成就'
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  社交媒体账号
                </label>
                <input
                  type="text"
                  className="st-input"
                  placeholder="请输入您的社交媒体账号（选填）"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  作品链接
                </label>
                <input
                  type="text"
                  className="st-input"
                  placeholder="请输入您的代表作品链接（选填）"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  className="st-button flex-1"
                  onClick={() => setStep(2)}
                >
                  上一步
                </button>
                <button className="st-button flex-1">
                  提交认证
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 