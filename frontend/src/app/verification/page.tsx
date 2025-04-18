'use client';

import { useState } from 'react';
import Image from 'next/image';

type VerificationType = '个人认证' | '机构认证' | '企业认证';
type VerificationStep = 1 | 2 | 3;

export default function VerificationPage() {
  const [verificationType, setVerificationType] = useState<VerificationType>('个人认证');
  const [currentStep, setCurrentStep] = useState<VerificationStep>(1);

  const verificationTypes: VerificationType[] = ['个人认证', '机构认证', '企业认证'];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">基本信息</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {verificationType === '个人认证' ? '姓名' : '机构/企业名称'}
                </label>
                <input
                  type="text"
                  className="st-input w-full"
                  placeholder={verificationType === '个人认证' ? '请输入真实姓名' : '请输入机构/企业全称'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {verificationType === '个人认证' ? '身份证号' : '营业执照号'}
                </label>
                <input
                  type="text"
                  className="st-input w-full"
                  placeholder={verificationType === '个人认证' ? '请输入18位身份证号' : '请输入营业执照号'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  手机号码
                </label>
                <input
                  type="tel"
                  className="st-input w-full"
                  placeholder="请输入手机号码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  电子邮箱
                </label>
                <input
                  type="email"
                  className="st-input w-full"
                  placeholder="请输入电子邮箱"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">证件上传</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {verificationType === '个人认证' ? '身份证正面照片' : '营业执照照片'}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-dark))] focus-within:outline-none">
                        <span>点击上传文件</span>
                        <input type="file" className="sr-only" accept="image/*" />
                      </label>
                      <p className="pl-1">或拖拽文件到此处</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF 格式，最大 10MB</p>
                  </div>
                </div>
              </div>
              {verificationType === '个人认证' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    身份证反面照片
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-dark))] focus-within:outline-none">
                          <span>点击上传文件</span>
                          <input type="file" className="sr-only" accept="image/*" />
                        </label>
                        <p className="pl-1">或拖拽文件到此处</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF 格式，最大 10MB</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">补充信息</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {verificationType === '个人认证' ? '个人简介' : '机构/企业简介'}
                </label>
                <textarea
                  className="st-input w-full h-32"
                  placeholder="请简要介绍自己/机构"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  社交媒体账号
                </label>
                <input
                  type="text"
                  className="st-input w-full"
                  placeholder="微博/抖音/小红书等账号链接"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  作品链接
                </label>
                <input
                  type="text"
                  className="st-input w-full"
                  placeholder="音乐作品/演出视频等链接"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">账号认证</h1>
      
      {/* 认证类型选择 */}
      <div className="flex gap-4 mb-8">
        {verificationTypes.map((type) => (
          <button
            key={type}
            className={`px-6 py-3 rounded-lg ${
              verificationType === type
                ? 'bg-[rgb(var(--color-primary))] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setVerificationType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 步骤指示器 */}
      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1 relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep
                    ? 'bg-[rgb(var(--color-primary))] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`absolute top-4 left-8 w-[calc(100%-2rem)] h-0.5 ${
                    step < currentStep ? 'bg-[rgb(var(--color-primary))]' : 'bg-gray-200'
                  }`}
                />
              )}
              <div className={`absolute -bottom-6 left-0 w-full text-center text-sm ${
                step <= currentStep ? 'text-[rgb(var(--color-primary))]' : 'text-gray-500'
              }`}>
                {step === 1 ? '基本信息' : step === 2 ? '证件上传' : '补充信息'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 步骤内容 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        {renderStepContent()}
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-between">
        <button
          className="st-button-secondary"
          onClick={() => setCurrentStep((prev) => prev > 1 ? (prev - 1) as VerificationStep : prev)}
          disabled={currentStep === 1}
        >
          上一步
        </button>
        <button
          className="st-button"
          onClick={() => {
            if (currentStep < 3) {
              setCurrentStep((prev) => (prev + 1) as VerificationStep);
            } else {
              // 提交认证
              console.log('提交认证');
            }
          }}
        >
          {currentStep === 3 ? '提交认证' : '下一步'}
        </button>
      </div>
    </div>
  );
} 