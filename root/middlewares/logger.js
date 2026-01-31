const fs=require("fs");
module.exports=(req,res,next)=>{
    const log= `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;
    fs.appendFile("logs.txt",log,(err)=>{
        if (err) {console.log(err);}
    });
    next();
};
module.exports = logger;
//logger