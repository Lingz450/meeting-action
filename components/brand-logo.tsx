'use client';

import Image from 'next/image';

interface BrandLogoProps {
  brand: 'zoom' | 'teams' | 'slack' | 'linear' | 'asana' | 'jira';
  size?: number;
}

export function BrandLogo({ brand, size = 32 }: BrandLogoProps) {
  const logos = {
    zoom: {
      url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zoom.svg',
      alt: 'Zoom',
      bg: 'bg-blue-100',
    },
    teams: {
      url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftteams.svg',
      alt: 'Microsoft Teams',
      bg: 'bg-purple-100',
    },
    slack: {
      url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg',
      alt: 'Slack',
      bg: 'bg-purple-100',
    },
    linear: {
      url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linear.svg',
      alt: 'Linear',
      bg: 'bg-gray-900',
    },
    asana: {
      url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/asana.svg',
      alt: 'Asana',
      bg: 'bg-orange-100',
    },
    jira: {
      url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jira.svg',
      alt: 'Jira',
      bg: 'bg-blue-100',
    },
  };

  const logo = logos[brand];

  return (
    <div className={`h-12 w-12 rounded-lg flex items-center justify-center p-2 ${logo.bg}`}>
      <img 
        src={logo.url} 
        alt={logo.alt}
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

