#!/bin/bash

# ==========================================
# 个人主页 ECS 一键部署脚本 (v2 - 含自动图片压缩)
# ==========================================

# ECS 配置信息
SERVER_IP="8.152.214.247"
SERVER_USER="root"
REMOTE_DIR="/var/www/personal-homepage"

# 确保 Homebrew 工具（sips/pngquant）在 PATH 里
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# 图片压缩配置 (0-100, 越低体积越小，75~80 对肉眼几乎无损)
IMAGE_QUALITY=78

# ─────────────────────────────────────────
echo "🖼️  [1/4] 压缩图片资源... (质量 $IMAGE_QUALITY%)"
# ─────────────────────────────────────────

PUBLIC_DIR="./public/assets/projects"
if [ -d "$PUBLIC_DIR" ]; then
  # 使用 Mac 自带的 sips 压缩 JPEG
  find "$PUBLIC_DIR" -name "*.jpg" -o -name "*.jpeg" | while read f; do
    sips --setProperty formatOptions "$IMAGE_QUALITY" "$f" &>/dev/null
  done

  # 检查是否安装了 pngquant 进行 PNG 压缩
  if command -v pngquant &>/dev/null; then
    find "$PUBLIC_DIR" -name "*.png" | while read f; do
      pngquant --quality=65-80 --force --skip-if-larger -o "$f" "$f" 2>/dev/null
    done
    echo "✅ JPEG + PNG 压缩完成!"
  else
    echo "✅ JPEG 压缩完成! (提示: 安装 pngquant 可额外压缩 PNG: brew install pngquant)"
  fi
else
  echo "⚠️  未找到图片目录，跳过压缩。"
fi

# ─────────────────────────────────────────
echo "🚀 [2/4] 开始构建生产环境版本..."
# ─────────────────────────────────────────
export PATH="$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH" 2>/dev/null || true

npm run build

if [ $? -ne 0 ]; then
    echo "❌ 打包失败，请检查前端代码。"
    exit 1
fi
echo "✅ 打包完成！"

# ─────────────────────────────────────────
echo "📦 [3/4] 上传至服务器: $SERVER_IP"
echo "🔐 提示：接下来可能会要求你输入服务器密码。"
# ─────────────────────────────────────────

rsync -avz --delete \
  --chmod=Du=rwx,Dg=rx,Do=rx,Fu=rw,Fg=r,Fo=r \
  -e "ssh -i ~/.ssh/ecs_homepage" \
  dist/ ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/

if [ $? -ne 0 ]; then
    echo "❌ 部署失败，请检查网络或密码是否正确。"
    exit 1
fi

# ─────────────────────────────────────────
echo "⚙️  [4/4] 远程 Nginx 重载配置..."
# ─────────────────────────────────────────
ssh -i ~/.ssh/ecs_homepage ${SERVER_USER}@${SERVER_IP} "nginx -s reload" 2>/dev/null && echo "✅ Nginx 重载完成" || echo "⚠️  Nginx 重载跳过（可能需要手动执行）"

echo ""
echo "🎉 部署成功！"
echo "🌐 访问: http://$SERVER_IP"
