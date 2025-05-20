
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wallpapers.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'c4.wallpaperflare.com', // Added for peakpx links
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'virtualoffice.ninja',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'preview.redd.it',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pngkey.com', 
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'gimgs2.nohat.cc', 
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
