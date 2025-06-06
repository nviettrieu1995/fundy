import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { ClassSchedule, WorkerCertificateDetails } from '../../types'; // Assuming WorkerCertificateDetails is also relevant here
import { getClassSchedules, getWorkerOverviewData } from '../../services/workerDataService'; // Fetch certificates from overview or a dedicated service
import { AcademicCapIcon, CheckCircleIcon, ArrowPathIcon as InProgressIcon } from '../common/Icon';
import Button from '../common/Button';

const CertificateLearningSection: React.FC = () => {
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [certificates, setCertificates] = useState<WorkerCertificateDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [classData, overviewData] = await Promise.all([
        getClassSchedules(),
        getWorkerOverviewData() // Fetching worker certificates from here for now
      ]);
      setClasses(classData);
      setCertificates(overviewData.certificates);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading learning progress..." />;
  }

  const upcomingClasses = classes.filter(c => c.status === 'upcoming');
  const inProgressClasses = classes.filter(c => c.status === 'in-progress');
  const completedClasses = classes.filter(c => c.status === 'completed');

  return (
    <div className="space-y-6">
      <Card title="Học Chứng Chỉ & Lịch Học">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-primary-700 mb-2">Lịch học sắp tới</h3>
            {upcomingClasses.length > 0 ? (
              <ul className="space-y-2">
                {upcomingClasses.map(cls => (
                  <li key={cls.id} className="p-3 bg-blue-50 rounded-md text-sm">
                    <p className="font-medium">{cls.name} ({cls.type})</p>
                    <p className="text-xs text-secondary-600">{cls.date} - {cls.time}</p>
                    <p className="text-xs text-secondary-500">{cls.platformOrLocation}</p>
                    <Button size="sm" variant="outline" className="mt-1 text-xs" onClick={() => alert(`View details for ${cls.name}`)}>Chi tiết</Button>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-secondary-500">Không có lớp học nào sắp tới.</p>}
          </div>

          {/* In Progress Classes */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-yellow-600 mb-2">Lớp đang theo học</h3>
             {inProgressClasses.length > 0 ? (
              <ul className="space-y-2">
                {inProgressClasses.map(cls => (
                  <li key={cls.id} className="p-3 bg-yellow-50 rounded-md text-sm">
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{cls.name}</p>
                        <InProgressIcon className="h-4 w-4 text-yellow-500"/>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-1.5 mb-1">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: `${cls.progress || 0}%`}}></div>
                    </div>
                    <p className="text-xs text-secondary-600 text-right">{cls.progress || 0}% hoàn thành</p>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-secondary-500">Không có lớp nào đang học.</p>}
          </div>
          
          {/* Completed/Earned Certificates */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Chứng chỉ đã đạt được</h3>
            {certificates.length > 0 ? (
              <ul className="space-y-2">
                {certificates.map(cert => (
                  <li key={cert.id} className="p-3 bg-green-50 rounded-md text-sm">
                    <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{cert.name}</p>
                        <CheckCircleIcon className="h-5 w-5 text-green-500"/>
                    </div>
                    <p className="text-xs text-secondary-600">Cấp bởi: {cert.issuer}</p>
                    <p className="text-xs text-secondary-500">Ngày cấp: {cert.issueDate}</p>
                    {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:underline">Xem chứng chỉ</a>}
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-secondary-500">Chưa có chứng chỉ nào.</p>}
          </div>
        </div>
        <div className="mt-6 text-center">
            <Button variant='primary' onClick={() => alert("Browsing all available courses (mock).")}>
                <AcademicCapIcon className="h-5 w-5 mr-2"/> Tìm kiếm Khóa học & Chứng chỉ mới
            </Button>
        </div>
      </Card>
       <p className="text-xs text-secondary-500 text-center mt-4">Dữ liệu lịch học và chứng chỉ là mô phỏng.</p>
    </div>
  );
};

export default CertificateLearningSection;