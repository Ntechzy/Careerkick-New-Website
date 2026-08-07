export type PaymentStatus = "pending" | "processing" | "success" | "failure";

export type CounsellingEnrollmentPayload = {
  enrollmentId?: string;
  studentName: string;
  email: string;
  mobile: string;
  whatsapp: string;
  course: string;
  stateOrDomicile?: string;
  district?: string;
  scoreOrRank?: string;
  applicationNumber?: string;
  category?: string;
  packageId: string;
  packageName: string;
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  discountAmount?: number;
  netAmount?: number;
  amountPaid?: number;
  dueAmount?: number;
  couponCode?: string;
  paymentStatus: PaymentStatus;
  paymentGatewayReference?: string;
  transactionId?: string;
  createdAt?: string;
};
