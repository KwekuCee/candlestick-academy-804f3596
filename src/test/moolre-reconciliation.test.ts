import { beforeEach, describe, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({
  attempt: {
    id: "test-attempt",
    external_ref: "CSA-test-reference",
    amount: 310,
    account_number: "test-wallet",
    currency: "GHS",
    status: "PENDING",
  },
  rpc: vi.fn(),
  updates: vi.fn(),
}));
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    from: () => ({
      select: () => ({
        eq: () => ({ single: async () => ({ data: { ...state.attempt }, error: null }) }),
      }),
      update: state.updates,
    }),
    rpc: state.rpc,
  },
}));
import { reconcilePayment } from "@/server/moolre";
describe("Provider reconciliation", () => {
  beforeEach(() => {
    state.attempt.status = "PENDING";
    state.rpc.mockReset();
    state.updates.mockReset();
    vi.stubEnv("MOOLRE_API_USER", "test-user");
    vi.stubEnv("MOOLRE_PUBLIC_KEY", "test-key");
    vi.stubEnv("MOOLRE_ACCOUNT_NUMBER", "test-wallet");
    vi.stubEnv("MOOLRE_CURRENCY", "GHS");
    state.rpc.mockImplementation(async () => {
      state.attempt.status = "PAID";
      return { error: null };
    });
  });
  function provider(txstatus: number, amount = "310.00") {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          status: 1,
          data: {
            txstatus,
            amount,
            externalref: "CSA-test-reference",
            accountnumber: "test-wallet",
            transactionid: "test-provider-id",
          },
        }),
      ),
    );
  }
  it("pending provider status never calls fulfillment", async () => {
    provider(0);
    expect((await reconcilePayment("CSA-test-reference")).status).toBe("PENDING");
    expect(state.rpc).not.toHaveBeenCalled();
  });
  it("mismatched amount never calls fulfillment", async () => {
    provider(1, "1.00");
    await expect(reconcilePayment("CSA-test-reference")).rejects.toThrow();
    expect(state.rpc).not.toHaveBeenCalled();
  });
  it("a matching confirmation uses the protected atomic operation with provider values", async () => {
    provider(1);
    expect((await reconcilePayment("CSA-test-reference")).status).toBe("PAID");
    expect(state.rpc).toHaveBeenCalledWith("confirm_moolre_payment", {
      p_ref: "CSA-test-reference",
      p_transaction_id: "test-provider-id",
      p_amount: 310,
      p_account: "test-wallet",
    });
  });
  it("account update failure is retryable, not reported as paid", async () => {
    provider(1);
    state.rpc.mockResolvedValue({ error: { message: "database unavailable" } });
    await expect(reconcilePayment("CSA-test-reference")).rejects.toThrow(
      "account update is pending",
    );
    expect(state.attempt.status).toBe("PENDING");
  });
});
