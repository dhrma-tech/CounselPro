import ApplicationModal from '@/components/apply/ApplicationModal';

export const metadata = {
  title: 'Apply for Counselling | CounselPro',
  description: 'Apply for JoSAA and MHT CET college admission counselling today.',
};

export default function ApplyPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-surface-light flex items-center justify-center p-4 py-12">
      <ApplicationModal isPage />
    </div>
  );
}
