const asyncHandler = (cb) => {
    return (req, res, next)=>{
        Promise.resolve(cb(req, res, next)).catch((err)=> {
            console.log("Error occurred in asyncMiddleware:" + err);
            next(err)
        })
    }
}

export default asyncHandler;