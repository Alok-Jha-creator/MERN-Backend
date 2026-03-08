const express =require("express")
const app =express()


app.get('/',(req,res,next)=>{
    const data={        name:"express",
        slider:[
            {id:1,title:"banner One",http:"https://placehold.co/600x400",link:"https://pages.daraz.com.np/wow/gcp/route/daraz/np/upr/router?hybrid=1&data_prefetch=true&at_iframe=1&lzd_navbar_hidden=true&pha=true&wh_pid=%2Flazada%2Fmegascenario%2Fnp%2Ffashion-forward07%2Ffashion-forward&prefetch_replace=1&spm=a2a0e.tm80335409.bannerSliderDesktop.d_1https://pages.daraz.com.np/wow/gcp/route/daraz/np/upr/router?hybrid=1&data_prefetch=true&at_iframe=1&lzd_navbar_hidden=true&pha=true&wh_pid=%2Flazada%2Fmegascenario%2Fnp%2Ffashion-forward07%2Ffashion-forward&prefetch_replace=1&spm=a2a0e.tm80335409.bannerSliderDesktop.d_1"},
            {id:2,title:"slider 2"},
            {id:3,title:"slider 3"},
        ],
    };

res.json({sucess:true,data:data,message:"data fetched successfully",status:200})
});
// app.post('/',(req,res,next)=>{});;
// app.put('/',(req,res,next)=>{});
// app.patch('/',(req,res,next)=>{});
// app.delete('/',(req,res,next)=>{});

module.exports=app;