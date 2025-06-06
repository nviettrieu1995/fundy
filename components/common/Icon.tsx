import React from 'react';
import { IconProps } from '../../types';

// Default size for icons if not specified by Tailwind's h-X w-X classes
const DEFAULT_ICON_SIZE = "1.5em"; // equivalent to h-6 w-6 if 1em = 16px, or can be "24px"

export const HomeIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const UserCircleIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.25 0H12M12 4.5v.01M12 19.5v.01M4.5 12H3m1.5 0V6.268a1.5 1.5 0 011.036-1.45l.002-.001.002-.001A6.744 6.744 0 0112 4.5a6.744 6.744 0 015.462.316l.002.001.002.001A1.5 1.5 0 0119.5 6.268V12m-15 0V17.732a1.5 1.5 0 001.036 1.45l.002.001.002.001A6.744 6.744 0 0012 19.5a6.744 6.744 0 005.462-.316l.002-.001.002-.001A1.5 1.5 0 0019.5 17.732V12" />
  </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

export const ArrowUpTrayIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.05c0 .621-.504 1.125-1.125 1.125h-13.5c-.621 0-1.125-.504-1.125-1.125v-4.05M20.25 14.15v-2.468c0-.807-.538-1.5-1.251-1.712L12 9l-6.999 1.03c-.713.212-1.251.905-1.251 1.712V14.15M12 18.75h.008v.008H12v-.008zM12 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5v.75A2.25 2.25 0 005.25 13.5h13.5A2.25 2.25 0 0021 11.25v-.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v4.5M12 4.5L9.75 6.75M12 4.5l2.25 2.25" />
  </svg>
);

export const ScaleIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52c2.625.375 5.25.847 7.5 1.4V21M3 21V6.49c2.25-.553 4.875-1.025 7.5-1.4M3 6.49c1.01-.143 2.01-.317 3-.52m-3 .52c-.986.203-1.955.43-2.896.688M3 6.49V21m18-14.51c-1.472 0-2.882-.265-4.185-.75M12 3c-1.472 0-2.882-.265-4.185-.75m8.37 0c.986-.203 1.955-.43 2.896-.688M12 3V1.5m0 1.5c-2.291 0-4.545-.16-6.75-.47M12 3c2.291 0 4.545.16 6.75-.47" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75M18.25 12L17 10.25m1.25 1.75L21 13.75M18.25 12L21 10.25m-6.25 3.75L11 17.25m.75-1.5L13 17.25m-1.25-1.5L11 14.25m1.75 1.5L13 14.25" />
  </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.698-3.091a14.41 14.41 0 01-2.085-.25c-.975-.144-1.869-.576-2.625-1.132M11.481 15.097a12.018 12.018 0 00-2.085.25c-1.132.176-2.33-.11-3.288-.795a12.025 12.025 0 01-2.625-1.132c-.884-.284-1.5-1.128-1.5-2.097V7.286c0-1.136.847-2.1 1.98-2.193.34-.027.68-.052 1.02-.072V2.021l3.698 3.091c.96.805 2.135 1.28 3.376 1.28.175 0 .346-.007.517-.022" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.018-.991-.053-1.464-.034-.461-.123-.904-.234-1.326a1.568 1.568 0 00-.567-1.028l-1.161-.993c-.373-.32-.873-.465-1.348-.371a11.343 11.343 0 01-3.397.642c-.863.073-1.71-.115-2.404-.451a11.343 11.343 0 01-3.397-.642c-.475-.093-.975.05-1.348.371l-1.162.993a1.568 1.568 0 00-.567 1.028c-.11.422-.2.865-.234 1.326C2.268 14.259 2.25 14.734 2.25 15.25V15.75" />
  </svg>
);


export const CheckCircleIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const XCircleIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const InformationCircleIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
</svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);


export const ArrowPathIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-5.602M18 18.72a9.094 9.094 0 01-3.741-.479 3 3 0 01-3.741-5.602m7.482 6.081a9 9 0 10-14.964 0m14.964 0a9 9 0 11-14.964 0M12 10.5a3 3 0 11-6 0 3 3 0 016 0zm6-3.75a3 3 0 11-6 0 3 3 0 016 0zM3.75 20.25a3 3 0 013-3h1.5a3 3 0 013 3M3.75 20.25h16.5" />
  </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622A11.99 11.99 0 0018.402 6a11.959 11.959 0 01-1.043-.736M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const CodeBracketIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const LockClosedIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const LockOpenIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m12.15-3.75a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 21h10.5a2.25 2.25 0 002.25-2.25V10.5zM9 10.5V6.75a3 3 0 116 0v3.75" />
  </svg>
);

// New Icons for Worker Dashboard
export const AcademicCapIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
);

export const BuildingOffice2Icon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12h6m-6 5.25h6M5.25 6h.008v.008H5.25V6zm0 5.25h.008v.008H5.25v-.008zm0 5.25h.008v.008H5.25v-.008zm13.5-5.25h-.008v.008h.008v-.008zm0 5.25h-.008v.008h.008v-.008zm0-10.5h-.008v.008h.008V6z" />
    </svg>
);

export const LightBulbIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75-2.311V21m0 0h3.75m-3.75 0h-3.75m1.5-15.255a1.5 1.5 0 01.714-.011A12.004 12.004 0 0112 2.25c2.189 0 4.26.753 5.979 2.006a1.5 1.5 0 01.714.011M12 6v9.75m0-9.75a1.5 1.5 0 00-3 0m3 0a1.5 1.5 0 013 0" />
    </svg>
);

export const DocumentCheckIcon: React.FC<IconProps> = ({ size = DEFAULT_ICON_SIZE, className, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={size} height={size} className={className} {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6H8.25A2.25 2.25 0 006 8.25v7.5A2.25 2.25 0 008.25 18h7.5A2.25 2.25 0 0018 15.75V8.25A2.25 2.25 0 0015.75 6z" />
    </svg>
);