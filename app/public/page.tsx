import { TransparencyMetrics } from '@/components/public/TransparencyMetrics';
import { ProcurementTable } from '@/components/public/ProcurementTable';
import { VerifyButton } from '@/components/public/VerifyButton';

export default function PublicPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Public Transparency Dashboard</h1>
        <p className="text-forest-700">
          Real-time procurement data and verification tools for public audit.
        </p>
      </div>

      <TransparencyMetrics />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProcurementTable />
        </div>
        <div>
          <VerifyButton />
        </div>
      </div>
    </div>
  );
}
