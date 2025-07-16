import Tabs from "@/components/core/tabs";


export default function TabsView() {
  const tabData = [
    {
      id: 1,
      name: 'Photos',
      content:
        'This is the PHOTOS tab content. Here you would display your photo gallery or image collection.',
    },
    {
      id: 2,
      name: 'Music',
      content:
        'This is the MUSIC tab content. Here you would display your music player or audio tracks.',
    },
    {
      id: 3,
      name: 'Videos',
      content:
        'This is the VIDEOS tab content. Here you would display your video player or video collection.',
    },
  ];

  return (
      <Tabs items={tabData} />
  );
}

