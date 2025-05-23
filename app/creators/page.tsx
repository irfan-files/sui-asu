import { CreatorDirectory } from '@/components/creator-directory';
import { PageHeader } from '@/components/page-header';

export default function CreatorsPage() {
  return (
    <div className="container py-8">
      <PageHeader
        heading="Creator Directory"
        subheading="Discover and connect with the most innovative creators in the ecosystem"
      />
      <CreatorDirectory />
    </div>
  );
}