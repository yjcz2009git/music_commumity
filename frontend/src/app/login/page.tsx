'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'code'

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
          <h2 className="mt-6 text-3xl font-bold text-gray-900">登录音乐社区</h2>
          <p className="mt-2 text-sm text-gray-600">
            还没有账号？
            <Link href="/register" className="text-[rgb(var(--color-primary))] hover:underline">
              立即注册
            </Link>
          </p>
        </div>

        <div className="st-card">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setLoginMethod('password')}
              className={`flex-1 py-2 text-center ${
                loginMethod === 'password'
                  ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                  : 'text-gray-500'
              }`}
            >
              密码登录
            </button>
            <button
              onClick={() => setLoginMethod('code')}
              className={`flex-1 py-2 text-center ${
                loginMethod === 'code'
                  ? 'text-[rgb(var(--color-primary))] border-b-2 border-[rgb(var(--color-primary))]'
                  : 'text-gray-500'
              }`}
            >
              验证码登录
            </button>
          </div>

          <form className="space-y-6">
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

            {loginMethod === 'password' ? (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  密码
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
            ) : (
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
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  记住我
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="text-[rgb(var(--color-primary))] hover:underline">
                  忘记密码？
                </Link>
              </div>
            </div>

            <div>
              <button type="submit" className="st-button w-full">
                登录
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">其他登录方式</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="st-button bg-white border border-gray-300">
                <span className="sr-only">微信登录</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-2.209 6.188-2.209 5.486 0 9.938 4.451 9.938 9.938 0 5.486-4.452 9.938-9.938 9.938-3.896 0-7.366-1.582-9.938-4.13C3.33 19.844 1.252 17.34 0 14.32c1.253 3.477 3.858 6.31 7.079 7.854 5.111 2.426 10.886.675 14.56-3.394 2.202-2.388 3.361-5.446 3.361-8.46 0-6.537-5.301-11.838-11.838-11.838z" />
                </svg>
              </button>
              <button className="st-button bg-white border border-gray-300">
                <span className="sr-only">QQ登录</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.003 2c-5.514 0-9.999 4.486-9.999 10 0 5.515 4.485 10 9.999 10 5.515 0 10-4.485 10-10 0-5.514-4.485-10-10-10zm0 18c-4.41 0-8-3.589-8-8 0-4.411 3.59-8 8-8 4.41 0 8 3.589 8 8 0 4.411-3.59 8-8 8z" />
                </svg>
              </button>
              <button className="st-button bg-white border border-gray-300">
                <span className="sr-only">微博登录</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.609-2.759 5.049-6.74 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.279.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.096-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.314.355.18.601zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.657-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.694 1.18-1.342 1.698-1.209.586.133.861.601.716 1.376-.144.771-.879 1.204-2.009 1.449zm2.385-2.385c-.144-.315-.706-.53-1.05-.405-.586.133-.861.601-.716 1.376.144.771.879 1.204 2.009 1.449.346.105.57.18.405.615-.375.694-1.18 1.342-1.698 1.209zm.716-1.376c.144-.771-.879-1.204-2.009-1.449-.346-.105-.57-.18-.405-.615.375-.694 1.18-1.342 1.698-1.209.586.133.861.601.716 1.376z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 