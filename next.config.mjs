/** @type {import('next').NextConfig} */
const nextConfig = {
  // better-sqlite3 는 네이티브 모듈이라 번들링하지 않고 런타임에 require 해야 한다.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
