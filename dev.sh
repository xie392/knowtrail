#!/bin/sh

# 启用错误检查
set -e

# 构建前端
cd client
pnpm run dev &

# 切换回工作目录
cd ..
cd server
pnpm run start:dev
