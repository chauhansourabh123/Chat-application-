class ApiResponse {
    constructor(status, data=null, message="Operation successful", success=true){
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = success
    }
}

export default ApiResponse;