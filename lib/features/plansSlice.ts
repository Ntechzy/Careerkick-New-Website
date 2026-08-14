import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Plan = {
  _id: string;
  title: string;
  description: string;
  totalAmount: number;
  isActive: boolean;
  couponCodes: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type PlansPagination = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

type PlansResponse = {
  success: boolean;
  data: Plan[];
  pagination: PlansPagination;
  message?: string;
};

type PlansState = {
  items: Plan[];
  pagination: PlansPagination | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: PlansState = {
  items: [],
  pagination: null,
  status: "idle",
  error: null,
};

export const fetchPlans = createAsyncThunk<
  PlansResponse,
  { page?: number; limit?: number } | undefined,
  { rejectValue: string }
>("plans/fetchPlans", async (params, { rejectWithValue }) => {
  const searchParams = new URLSearchParams({
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 20),
  });

  try {
    const response = await fetch(`/api/plans?${searchParams.toString()}`, {
      cache: "no-store",
    });
    const payload = (await response.json()) as Partial<PlansResponse>;

    if (!response.ok || payload.success === false) {
      return rejectWithValue(payload.message ?? "Unable to load counselling plans.");
    }

    return {
      success: true,
      data: Array.isArray(payload.data) ? payload.data : [],
      pagination: payload.pagination ?? {
        total: 0,
        page: params?.page ?? 1,
        limit: params?.limit ?? 20,
        pages: 0,
      },
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unable to load counselling plans.",
    );
  }
});

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action: PayloadAction<PlansResponse>) => {
        state.status = "succeeded";
        state.items = action.payload.data.filter((plan) => plan.isActive);
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unable to load counselling plans.";
      });
  },
});

export const plansReducer = plansSlice.reducer;
