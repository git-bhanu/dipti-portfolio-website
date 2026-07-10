'use client';

import { type ProjectCardData, ProjectListCard } from './project-list-card';

export interface ProjectListItem {
  id: string;
  _sys: { filename: string };
  data: ProjectCardData;
}

interface ProjectListGridProps {
  items: ProjectListItem[];
}

function itemSlug(item: ProjectListItem) {
  return item._sys.filename.toLowerCase();
}

export function ProjectListGrid({ items }: ProjectListGridProps) {
  if (items.length === 0) return null;

  return (
    <div className='grid grid-cols-1 gap-y-[40px] px-5 pb-20 md:grid-cols-3 md:gap-x-[40px] md:gap-y-[60px] md:px-10'>
      {items.map((item) => (
        <ProjectListCard
          key={item.id}
          project={item.data}
          href={`/projects/${itemSlug(item)}`}
          sizes='(max-width: 767px) 100vw, 33vw'
        />
      ))}
    </div>
  );
}
