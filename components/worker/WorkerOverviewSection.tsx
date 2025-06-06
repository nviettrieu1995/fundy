import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { CompanyView, WorkerScores, WorkerCertificateDetails } from '../../types';
import { getWorkerOverviewData } from '../../services/workerDataService';
import { BuildingOffice2Icon, ChartBarIcon, AcademicCapIcon, DocumentCheckIcon, CheckCircleIcon, InformationCircleIcon } from '../common/Icon';

const WorkerOverviewSection: React.FC = () => {
  const [overviewData, setOverviewData] = useState<{
    profileViews: CompanyView[];
    scores: WorkerScores;
    certificates: WorkerCertificateDetails[];
    verifications: { id: string; name: string; status: 'Verified' | 'Pending' | 'Not Verified'; verificationDate?: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getWorkerOverviewData();
      setOverviewData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading || !overviewData) {
    return <LoadingSpinner message="Loading worker overview..." />;
  }

  const { profileViews, scores, certificates, verifications } = overviewData;

  const ScoreDisplay: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
    <div className="text-center">
        <p className="text-xs text-secondary-500 uppercase">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-secondary-800">Worker Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Company Profile Views" className="lg:col-span-1">
          <BuildingOffice2Icon className="h-8 w-8 text-primary-500 mb-2" />
          {profileViews.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {profileViews.slice(0, 3).map(view => ( // Show a few initially
                <li key={view.id} className="flex items-center justify-between p-2 bg-secondary-50 rounded">
                  <div className="flex items-center">
                    <img src={view.logoUrl} alt={view.name} className="h-8 w-8 rounded-full mr-2"/>
                    <span>{view.name}</span>
                  </div>
                  <span className="text-xs text-secondary-500">{view.viewDate}</span>
                </li>
              ))}
              {profileViews.length > 3 && <p className="text-xs text-primary-600 mt-1 hover:underline cursor-pointer">View all...</p>}
            </ul>
          ) : (
            <p className="text-secondary-600 text-sm">No companies have viewed your profile recently.</p>
          )}
        </Card>

        <Card title="Your Scores" className="lg:col-span-1">
            <ChartBarIcon className="h-8 w-8 text-green-500 mb-3 mx-auto" />
            <div className="flex justify-around items-center">
                <ScoreDisplay label="Trust" value={scores.trust} color="text-blue-500" />
                <ScoreDisplay label="Heating" value={scores.heating} color="text-orange-500" />
                <ScoreDisplay label="Growth" value={scores.growth} color="text-green-600" />
            </div>
            <p className="text-xs text-secondary-500 mt-3 text-center">Scores are evaluated by the Viet-Kultura system based on your profile, activity, and certifications.</p>
        </Card>
        
        <Card title="Certificates & Verifications" className="lg:col-span-1">
            <AcademicCapIcon className="h-8 w-8 text-purple-500 mb-2" />
            <h4 className="text-sm font-medium text-secondary-700 mb-1">Certificates:</h4>
            {certificates.length > 0 ? (
            <ul className="space-y-1 text-xs mb-3">
                {certificates.slice(0,2).map(cert => (
                <li key={cert.id} className="flex items-center p-1 bg-purple-50 rounded">
                    {cert.isVerified ? <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1 flex-shrink-0"/> : <InformationCircleIcon className="h-4 w-4 text-yellow-500 mr-1 flex-shrink-0"/> }
                    <span className="truncate font-medium">{cert.name}</span> - <span className="text-secondary-500">{cert.issuer}</span>
                </li>
                ))}
            </ul>
            ) : <p className="text-xs text-secondary-500 mb-3">No certificates added.</p>}

            <h4 className="text-sm font-medium text-secondary-700 mb-1 mt-2">Verifications:</h4>
             {verifications.length > 0 ? (
            <ul className="space-y-1 text-xs">
                {verifications.map(ver => (
                <li key={ver.id} className="flex items-center p-1 bg-blue-50 rounded">
                    {ver.status === 'Verified' ? <DocumentCheckIcon className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0"/> : <InformationCircleIcon className="h-4 w-4 text-gray-400 mr-1 flex-shrink-0"/> }
                    <span>{ver.name}: <span className={`font-semibold ${ver.status === 'Verified' ? 'text-green-600' : 'text-secondary-600'}`}>{ver.status}</span></span>
                </li>
                ))}
            </ul>
            ) : <p className="text-xs text-secondary-500">No verifications found.</p>}
        </Card>
      </div>
      <p className="text-xs text-secondary-500 text-center mt-4">Worker dashboard data is illustrative (mock data).</p>
    </div>
  );
};

export default WorkerOverviewSection;