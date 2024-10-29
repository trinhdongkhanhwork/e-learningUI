<template>
  <div class="modal fade" id="withdraw-request">
    <div class="modal-dialog modal-dialog-centered withdraw-modal">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Withdrawal Request</h4>
              </div>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="feather-x"></i>
              </button>
            </div>
            <div class="modal-body custom-modal-body">
              <form action="instructor-withdraw">
                <div class="withdraw-request-info">
                  <div class="settings-inner-blk add-course-info p-0">
                    <p>
                      Please check your transaction notification on your
                      connected withdrawal method
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="info-request">
                          <span>Withdrawal Balance</span>
                          <h6>$486</h6>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="info-request">
                          <span>Selected </span>
                          <h6>Paypal</h6>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-block">
                          <label class="form-label">Amount</label>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="$"
                          />
                        </div>
                      </div>
                      <div class="co-md-12">
                        <p class="info-text-withdraw">
                          <i class="bx bx-info-circle me-2"></i>Minimum withdraw
                          amount is $80
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer-btn">
                  <button type="submit" class="btn btn-primary">
                    Submit Request
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
