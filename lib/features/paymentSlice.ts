import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type InitiatePaymentStudent = {
  name: string;
  email: string;
  number: string;
  whatsappNo: string;
  course: string;
  state: string;
  district: string;
  examType: string;
  examScoreOrRank: number;
  examAppOrRollNo: string;
  category: string;
};

export type InitiatePaymentPayload = {
  planId: string;
  amount: number;
  student: InitiatePaymentStudent;
};

type InitiatePaymentResponse = {
  success?: boolean;
  message?: string;
  redirectUrl?: string;
  redirectURL?: string;
  redirectURI?: string;
  redirect_url?: string;
  paymentUrl?: string;
  payment_url?: string;
  gatewayUrl?: string;
  gatewayURL?: string;
  gateway_url?: string;
  paymentGatewayUrl?: string;
  paymentGatewayURL?: string;
  payment_gateway_url?: string;
  url?: string;
  data?: {
    transactionId?: string;
    merchantTxnNo?: string;
    amount?: number;
    tranCtx?: string;
    redirectUrl?: string;
    redirectURL?: string;
    redirectURI?: string;
    redirect_url?: string;
    paymentUrl?: string;
    payment_url?: string;
    gatewayUrl?: string;
    gatewayURL?: string;
    gateway_url?: string;
    paymentGatewayUrl?: string;
    paymentGatewayURL?: string;
    payment_gateway_url?: string;
    url?: string;
  };
};

export type PaymentStatusData = {
  merchantTxnNo: string;
  amount: number;
  txnStatus: string;
  paymentMode?: string;
  gatewayStatusResponse?: Record<string, unknown>;
};

type PaymentStatusResponse = {
  success?: boolean;
  message?: string;
  data: PaymentStatusData;
};

type PaymentState = {
  initiateStatus: "idle" | "loading" | "succeeded" | "failed";
  initiateError: string | null;
  redirectUrl: string | null;
  merchantTxnNo: string | null;
  statusCheckStatus: "idle" | "loading" | "succeeded" | "failed";
  statusCheckError: string | null;
  statusData: PaymentStatusData | null;
};

const initialState: PaymentState = {
  initiateStatus: "idle",
  initiateError: null,
  redirectUrl: null,
  merchantTxnNo: null,
  statusCheckStatus: "idle",
  statusCheckError: null,
  statusData: null,
};

function getRedirectUrl(payload: InitiatePaymentResponse) {
  return (
    payload.redirectUrl ??
    payload.redirectURL ??
    payload.redirectURI ??
    payload.redirect_url ??
    payload.paymentUrl ??
    payload.payment_url ??
    payload.gatewayUrl ??
    payload.gatewayURL ??
    payload.gateway_url ??
    payload.paymentGatewayUrl ??
    payload.paymentGatewayURL ??
    payload.payment_gateway_url ??
    payload.url ??
    payload.data?.redirectUrl ??
    payload.data?.redirectURL ??
    payload.data?.redirectURI ??
    payload.data?.redirect_url ??
    payload.data?.paymentUrl ??
    payload.data?.payment_url ??
    payload.data?.gatewayUrl ??
    payload.data?.gatewayURL ??
    payload.data?.gateway_url ??
    payload.data?.paymentGatewayUrl ??
    payload.data?.paymentGatewayURL ??
    payload.data?.payment_gateway_url ??
    payload.data?.url ??
    null
  );
}

export const initiatePayment = createAsyncThunk<
  { redirectUrl: string; merchantTxnNo: string | null; response: InitiatePaymentResponse },
  InitiatePaymentPayload,
  { rejectValue: string }
>("payment/initiatePayment", async (paymentPayload, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/payment/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
      cache: "no-store",
    });
    const payload = (await response.json()) as InitiatePaymentResponse;
    const redirectUrl = getRedirectUrl(payload);

    if (!response.ok || payload.success === false) {
      return rejectWithValue(payload.message ?? "Unable to initiate payment.");
    }

    if (!redirectUrl) {
      return rejectWithValue("Payment redirect URL was not returned.");
    }

    return {
      redirectUrl,
      merchantTxnNo: payload.data?.merchantTxnNo ?? null,
      response: payload,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unable to initiate payment.",
    );
  }
});

export const fetchPaymentStatus = createAsyncThunk<
  PaymentStatusResponse,
  string,
  { rejectValue: string }
>("payment/fetchPaymentStatus", async (merchantTxnNo, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `/api/payment/status/${encodeURIComponent(merchantTxnNo)}`,
      {
        cache: "no-store",
      },
    );
    const payload = (await response.json()) as Partial<PaymentStatusResponse>;

    if (!response.ok || payload.success === false || !payload.data) {
      return rejectWithValue(payload.message ?? "Unable to check payment status.");
    }

    return {
      success: true,
      message: payload.message,
      data: payload.data,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unable to check payment status.",
    );
  }
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.initiateStatus = "loading";
        state.initiateError = null;
        state.redirectUrl = null;
        state.merchantTxnNo = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.initiateStatus = "succeeded";
        state.redirectUrl = action.payload.redirectUrl;
        state.merchantTxnNo = action.payload.merchantTxnNo;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.initiateStatus = "failed";
        state.initiateError =
          action.payload ?? action.error.message ?? "Unable to initiate payment.";
      })
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.statusCheckStatus = "loading";
        state.statusCheckError = null;
        state.statusData = null;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.statusCheckStatus = "succeeded";
        state.statusData = action.payload.data;
      })
      .addCase(fetchPaymentStatus.rejected, (state, action) => {
        state.statusCheckStatus = "failed";
        state.statusCheckError =
          action.payload ?? action.error.message ?? "Unable to check payment status.";
      });
  },
});

export const paymentReducer = paymentSlice.reducer;
