export interface DashboardViewProps {
  onNavigate: (key: string) => void;
  onEditStudent: (studentId: string) => void;
  onEditCampaign: (campaignId: string) => void;
  onEditContact: (contactId: string) => void;
  page: number;
  onPageChange: (page: number) => void;
}