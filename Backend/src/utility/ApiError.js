class ApiError extends Error {
  constructor(
    status,
    message = "something went wrong",
    data = null,
    success = false
  ) {
    super(message);
    this.status = status;
    this.data = data;
    this.success = success;

    if (Error.capturedStackrace) {
      Error.capturedStackrace(this, ApiError);
    }
  }
}

export default ApiError;
