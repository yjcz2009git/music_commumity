'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [registerMethod, setRegisterMethod] = useState('phone'); // 'phone' or 'email'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">注册音乐社区</h2>
          <p className="mt-2 text-sm text-gray-600">
            已有账号？
            <Link href="/login" className="text-[rgb(var(--color-primary))] hover:underline">
              立即登录
            </Link>
          </p>
        </div>

        <div className="st-card">
          {/* 步骤指示器 */}
          <div className="flex justify-between mb-8">
            <div className="flex-1">
              <div className="relative">
                <div className="w-full h-1 bg-gray-200 rounded">
                  <div
                    className="h-1 bg-[rgb(var(--color-primary))] rounded"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
                <div className="absolute -top-4 left-0 w-full flex justify-between">
                  <div className="text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1 ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      1
                    </div>
                    <div className="text-xs mt-1">验证身份</div>
                  </div>
                  <div className="text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2 ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      2
                    </div>
                    <div className="text-xs mt-1">设置密码</div>
                  </div>
                  <div className="text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 3 ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      3
                    </div>
                    <div className="text-xs mt-1">完善资料</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 步骤1：验证身份 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setRegisterMethod('phone')}
                  className={`flex-1 py-2 text-center ${
                    registerMethod === 'phone'
                      ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                      : 'text-gray-500'
                  }`}
                >
                  手机号注册
                </button>
                <button
                  onClick={() => setRegisterMethod('email')}
                  className={`flex-1 py-2 text-center ${
                    registerMethod === 'email'
                      ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                      : 'text-gray-500'
                  }`}
                >
                  邮箱注册
                </button>
              </div>

              {registerMethod === 'phone' ? (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    手机号
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="st-input"
                      placeholder="请输入手机号"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    邮箱
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="st-input"
                      placeholder="请输入邮箱"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  验证码
                </label>
                <div className="mt-1 flex space-x-4">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    className="st-input flex-1"
                    placeholder="请输入验证码"
                  />
                  <button type="button" className="st-button whitespace-nowrap">
                    获取验证码
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="st-button w-full"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* 步骤2：设置密码 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  设置密码
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="st-input"
                    placeholder="请输入密码"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  确认密码
                </label>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="st-input"
                    placeholder="请再次输入密码"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))] border-gray-300 rounded"
                />
                <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
                  我已阅读并同意
                  <Link href="/terms" className="text-[rgb(var(--color-primary))] hover:underline">
                    《用户协议》
                  </Link>
                  和
                  <Link href="/privacy" className="text-[rgb(var(--color-primary))] hover:underline">
                    《隐私政策》
                  </Link>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="st-button bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  上一步
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="st-button flex-1"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* 步骤3：完善资料 */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                  昵称
                </label>
                <div className="mt-1">
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    required
                    className="st-input"
                    placeholder="请输入昵称"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  角色
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    required
                    className="st-input"
                  >
                    <option value="">请选择角色</option>
                    <option value="composer">作曲人</option>
                    <option value="lyricist">作词人</option>
                    <option value="singer">歌手</option>
                    <option value="producer">制作人</option>
                    <option value="musician">音乐人</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  个人简介
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="st-input"
                    placeholder="请输入个人简介"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="st-button bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  上一步
                </button>
                <button
                  type="submit"
                  className="st-button flex-1"
                >
                  完成注册
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 